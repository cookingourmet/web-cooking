import "./heroAssistantPanel.css";

import {
  LEAD_ENDPOINT,
  PROGRAM_KEYS,
  PROGRAMS,
  SALES_EMAIL,
  SALES_WHATSAPP,
  WEB3FORMS_ACCESS_KEY,
  type ProgramInfo,
  type ProgramKey,
} from "./heroAssistantData";

type ChatStep =
  | "idle"
  | "program"
  | "confirm_enrollment"
  | "ask_name"
  | "ask_phone"
  | "ask_email_optional"
  | "ask_dni_optional"
  | "completed";

type Intent =
  | "greeting"
  | "programs"
  | "info"
  | "costs"
  | "schedules"
  | "enrollment"
  | "brochure"
  | "advisor"
  | "duration"
  | "requirements"
  | "location"
  | "thanks"
  | "farewell"
  | "unknown";

type PendingAction =
  | "info"
  | "costs"
  | "schedules"
  | "enrollment"
  | "brochure"
  | "advisor";

type ReplyMode =
  | "none"
  | "programs"
  | "program_actions"
  | "schedule_options"
  | "confirmation"
  | "skip_email"
  | "skip_dni"
  | "completed";

type LeadStatus = "idle" | "sending" | "sent" | "error";
type ConfirmationIntent = "yes" | "no" | "unknown";

type TextMessage = {
  id: string;
  role: "bot" | "user";
  kind: "text";
  text: string;
};

type ProgramCardMessage = {
  id: string;
  role: "bot";
  kind: "program_card";
  programKey: ProgramKey;
};

type ChatMessage = TextMessage | ProgramCardMessage;

type BotSequenceItem =
  | {
      kind: "text";
      text: string;
      delay?: number;
    }
  | {
      kind: "program_card";
      programKey: ProgramKey;
      delay?: number;
    };

type State = {
  step: ChatStep;
  messages: ChatMessage[];
  selectedProgram: ProgramKey | "";
  pendingAction: PendingAction;
  name: string;
  phone: string;
  email: string;
  dni: string;
  isTyping: boolean;
  locked: boolean;
  replyMode: ReplyMode;
  queueToken: number;
  leadStatus: LeadStatus;
  leadError: string;
  bubbleIndex: number;
};

const BUBBLES = [
  "¿Conversamos? 😊",
  "Pregúntame por una carrera",
  "Te ayudo con costos",
  "Pide tu brochure PDF",
];

function createInitialState(): State {
  return {
    step: "idle",
    messages: [],
    selectedProgram: "",
    pendingAction: "info",
    name: "",
    phone: "",
    email: "",
    dni: "",
    isTyping: false,
    locked: false,
    replyMode: "none",
    queueToken: 0,
    leadStatus: "idle",
    leadError: "",
    bubbleIndex: 0,
  };
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getTypingDelay(item: BotSequenceItem) {
  if (item.delay !== undefined) {
    return Math.max(3000, Math.min(5000, item.delay));
  }

  if (item.kind === "program_card") {
    return 3000;
  }

  const length = item.text.trim().length;

  if (length <= 60) return 3000;
  if (length <= 140) return 4000;
  return 5000;
}

function editDistance(left: string, right: string) {
  const rows = left.length + 1;
  const columns = right.length + 1;

  const matrix = Array.from({ length: rows }, () =>
    Array<number>(columns).fill(0)
  );

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column < columns; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[left.length][right.length];
}

function similarWord(word: string, target: string) {
  if (word === target) return true;

  const allowedDistance =
    target.length >= 10
      ? 3
      : target.length >= 7
        ? 2
        : target.length >= 5
          ? 1
          : 0;

  return allowedDistance > 0 && editDistance(word, target) <= allowedDistance;
}

function hasTerm(rawText: string, rawTerm: string) {
  const text = normalize(rawText);
  const term = normalize(rawTerm);

  if (!text || !term) return false;
  if (text.includes(term)) return true;

  const words = text.split(" ");
  const termWords = term.split(" ");

  return termWords.every((termWord) =>
    words.some((word) => similarWord(word, termWord))
  );
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => hasTerm(text, term));
}

function detectConfirmation(text: string): ConfirmationIntent {
  const value = normalize(text);

  const affirmative = [
    "si",
    "claro",
    "correcto",
    "confirmo",
    "confirmar",
    "de acuerdo",
    "esta bien",
    "ok",
    "okay",
    "acepto",
    "adelante",
    "registrar",
    "registralo",
    "registrame",
    "si por favor",
    "por supuesto",
    "dale",
    "hagamoslo",
    "quiero",
  ];

  const negative = [
    "no",
    "ahora no",
    "no gracias",
    "cancelar",
    "cancela",
    "despues",
    "luego",
    "todavia no",
    "por ahora no",
    "mejor no",
  ];

  if (
    affirmative.some(
      (answer) => value === answer || value.startsWith(`${answer} `)
    )
  ) {
    return "yes";
  }

  if (
    negative.some(
      (answer) => value === answer || value.startsWith(`${answer} `)
    )
  ) {
    return "no";
  }

  return "unknown";
}

function detectProgram(text: string): ProgramKey | null {
  const normalized = normalize(text);

  for (const key of PROGRAM_KEYS) {
    const found = PROGRAMS[key].aliases.some((alias) => {
      const normalizedAlias = normalize(alias);

      if (normalizedAlias === "bar") {
        return normalized.split(" ").includes("bar");
      }

      return hasTerm(normalized, normalizedAlias);
    });

    if (found) return key;
  }

  return null;
}

function detectIntent(text: string): Intent {
  const value = normalize(text);

  if (
    hasAny(value, [
      "cuanto cuesta",
      "cuanto vale",
      "precio",
      "precios",
      "costo",
      "costos",
      "mensualidad",
      "pension",
      "uniforme",
      "cuanto es la inscripcion",
      "cuanto es la matricula",
      "precio de inscripcion",
      "precio de matricula",
      "costo de inscripcion",
      "costo de matricula",
      "inversion",
      "cuanto pago",
    ])
  ) {
    return "costs";
  }

  if (
    hasAny(value, [
      "pdf",
      "brochure",
      "brochur",
      "folleto",
      "malla curricular",
      "plan de estudios",
      "temario",
      "mandame informacion",
      "enviame informacion",
      "quiero el documento",
    ])
  ) {
    return "brochure";
  }

  if (
    hasAny(value, [
      "quiero matricularme",
      "deseo matricularme",
      "quiero inscribirme",
      "deseo inscribirme",
      "como me matriculo",
      "como me inscribo",
      "quiero estudiar",
      "reservar vacante",
      "separar vacante",
      "iniciar inscripcion",
      "matricularme",
      "inscribirme",
    ])
  ) {
    return "enrollment";
  }

  if (
    hasAny(value, [
      "horario",
      "horarios",
      "turno",
      "turnos",
      "hora de clase",
      "manana",
      "mañana",
      "tarde",
      "noche",
      "sabado",
      "domingo",
      "fin de semana",
    ])
  ) {
    return "schedules";
  }

  if (
    hasAny(value, [
      "asesor",
      "asesora",
      "persona",
      "humano",
      "hablar con alguien",
      "whatsapp",
      "wsp",
      "llamada",
      "llamar",
    ])
  ) {
    return "advisor";
  }

  if (
    hasAny(value, [
      "duracion",
      "cuanto dura",
      "tiempo de estudio",
      "meses dura",
      "anos dura",
      "años dura",
    ])
  ) {
    return "duration";
  }

  if (
    hasAny(value, [
      "requisitos",
      "que necesito",
      "documentos",
      "edad minima",
      "certificado",
    ])
  ) {
    return "requirements";
  }

  if (
    hasAny(value, [
      "direccion",
      "ubicacion",
      "donde queda",
      "como llego",
      "sede",
      "local",
    ])
  ) {
    return "location";
  }

  if (
    hasAny(value, [
      "que carreras tienen",
      "que programas tienen",
      "carreras disponibles",
      "programas disponibles",
      "que puedo estudiar",
      "que enseñan",
      "que ensenan",
      "todos los programas",
      "opciones de estudio",
    ])
  ) {
    return "programs";
  }

  if (
    hasAny(value, [
      "informacion",
      "informaicon",
      "informacoens",
      "informes",
      "quiero saber",
      "deseo saber",
      "mas detalles",
      "cuentame",
      "de que trata",
      "quiero conocer",
    ])
  ) {
    return "info";
  }

  if (
    hasAny(value, [
      "gracias",
      "muchas gracias",
      "te agradezco",
      "perfecto gracias",
    ])
  ) {
    return "thanks";
  }

  if (
    hasAny(value, [
      "adios",
      "chau",
      "chao",
      "hasta luego",
      "nos vemos",
      "hasta pronto",
    ])
  ) {
    return "farewell";
  }

  if (
    hasAny(value, [
      "hola",
      "ola",
      "holaa",
      "holi",
      "buenas",
      "buenos dias",
      "buen dia",
      "buenas tardes",
      "buenas noches",
      "hey",
    ])
  ) {
    return "greeting";
  }

  return "unknown";
}

function detectSchedulePreference(text: string) {
  if (hasAny(text, ["manana", "mañana", "temprano"])) {
    return "mañana";
  }

  if (hasAny(text, ["tarde"])) {
    return "tarde";
  }

  if (hasAny(text, ["noche", "nocturno"])) {
    return "noche";
  }

  if (hasAny(text, ["sabado", "domingo", "fin de semana"])) {
    return "fin de semana";
  }

  return null;
}

function money(value: number) {
  return `S/ ${value.toFixed(0)}`;
}

function validPhone(value: string) {
  const clean = value.replace(/\D/g, "");
  return clean.length >= 9 && clean.length <= 12;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validDni(value: string) {
  return /^\d{8}$/.test(value.trim());
}

function isSkip(value: string) {
  return hasAny(value, [
    "omitir",
    "saltar",
    "no tengo",
    "no deseo",
    "prefiero no",
    "despues",
    "luego",
  ]);
}

function getFirstName(value: string) {
  return value.trim().split(/\s+/)[0] || "amigo";
}

function buildWhatsAppUrl(state: State) {
  const program = state.selectedProgram
    ? PROGRAMS[state.selectedProgram]
    : null;

  const text = [
    "Hola, deseo información de Cooking Gourmet.",
    `Programa: ${program?.label ?? "Por definir"}`,
    `Nombre: ${state.name || "-"}`,
    `Celular: ${state.phone || "-"}`,
  ].join("\n");

  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

async function sendLead(state: State) {
  const program = state.selectedProgram
    ? PROGRAMS[state.selectedProgram]
    : null;

  const message = [
    "NUEVA SOLICITUD DESDE COOKITO",
    "",
    `Programa: ${program?.label ?? "-"}`,
    `Nombre: ${state.name || "-"}`,
    `Celular: ${state.phone || "-"}`,
    `Correo: ${state.email || "No compartido"}`,
    `DNI: ${state.dni || "No compartido"}`,
    `Página: ${window.location.href}`,
    `Fecha: ${new Date().toLocaleString("es-PE")}`,
  ].join("\n");

  const formData = new FormData();

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append(
    "subject",
    `Nuevo lead Cookito - ${program?.label ?? "Programa"}`
  );
  formData.append("from_name", "Cookito - Cooking Gourmet");
  formData.append("name", state.name || "Cliente Cookito");
  formData.append("email", state.email || SALES_EMAIL);
  formData.append("phone", state.phone || "-");
  formData.append("message", message);

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "No se pudo enviar la solicitud.");
  }
}

function renderProgramCard(program: ProgramInfo) {
  return `
    <article class="hero-assistant-window__program-card">
      <div class="hero-assistant-window__program-media">
        <img
          src="${escapeHtml(program.imageUrl)}"
          alt="${escapeHtml(program.imageAlt)}"
          loading="lazy"
          decoding="async"
        />
        <span class="hero-assistant-window__program-badge">
          ${program.emoji} Programa
        </span>
      </div>

      <div class="hero-assistant-window__program-body">
        <strong class="hero-assistant-window__program-title">
          ${escapeHtml(program.label)}
        </strong>

        <p class="hero-assistant-window__program-description">
          ${escapeHtml(program.shortDescription)}
        </p>

        <div class="hero-assistant-window__program-links">
          <a
            href="${escapeHtml(program.brochureUrl)}"
            class="hero-assistant-window__program-link hero-assistant-window__program-link--primary"
            target="_blank"
            rel="noreferrer"
          >
            📄 Ver brochure PDF
          </a>

          <a
            href="${escapeHtml(program.pageUrl)}"
            class="hero-assistant-window__program-link"
          >
            🎓 Conocer programa
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderLeadStatus(state: State) {
  if (state.leadStatus === "idle") return "";

  if (state.leadStatus === "sending") {
    return `
      <div class="hero-assistant-window__send-status is-sending">
        Enviando solicitud...
      </div>
    `;
  }

  if (state.leadStatus === "sent") {
    return `
      <div class="hero-assistant-window__send-status is-sent">
        Solicitud enviada correctamente.
      </div>
    `;
  }

  return `
    <div class="hero-assistant-window__send-status is-error">
      No se pudo enviar. Puedes continuar por WhatsApp.
    </div>
  `;
}

function renderReplies(state: State) {
  const disabled = state.locked ? "disabled" : "";

  if (state.replyMode === "programs") {
    return `
      <div class="hero-assistant-window__quick-actions hero-assistant-window__quick-actions--programs">
        ${PROGRAM_KEYS.map(
          (key) => `
            <button
              type="button"
              class="hero-assistant-window__chip"
              data-assistant-chip
              data-chip-type="program"
              data-chip-value="${key}"
              ${disabled}
            >
              ${PROGRAMS[key].emoji} ${PROGRAMS[key].label}
            </button>
          `
        ).join("")}
      </div>
    `;
  }

  if (state.replyMode === "program_actions" && state.selectedProgram) {
    const program = PROGRAMS[state.selectedProgram];

    return `
      <div class="hero-assistant-window__quick-actions">
        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="action"
          data-chip-value="costs"
          ${disabled}
        >
          💰 Ver costos
        </button>

        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="action"
          data-chip-value="schedules"
          ${disabled}
        >
          🕐 Ver horarios
        </button>

        <button
          type="button"
          class="hero-assistant-window__chip hero-assistant-window__chip--primary"
          data-assistant-chip
          data-chip-type="action"
          data-chip-value="enrollment"
          ${disabled}
        >
          ✅ Inscribirme
        </button>

        <a
          href="${program.brochureUrl}"
          class="hero-assistant-window__chip hero-assistant-window__chip--link"
          target="_blank"
          rel="noreferrer"
        >
          📄 Brochure PDF
        </a>
      </div>
    `;
  }

  if (state.replyMode === "schedule_options" && state.selectedProgram) {
    return `
      <div class="hero-assistant-window__quick-actions">
        <button type="button" class="hero-assistant-window__chip" data-assistant-chip data-chip-type="schedule" data-chip-value="mañana" ${disabled}>🌤️ Mañana</button>
        <button type="button" class="hero-assistant-window__chip" data-assistant-chip data-chip-type="schedule" data-chip-value="tarde" ${disabled}>☀️ Tarde</button>
        <button type="button" class="hero-assistant-window__chip" data-assistant-chip data-chip-type="schedule" data-chip-value="noche" ${disabled}>🌙 Noche</button>
      </div>
    `;
  }

  if (state.replyMode === "confirmation") {
    return `
      <div class="hero-assistant-window__quick-actions">
        <button
          type="button"
          class="hero-assistant-window__chip hero-assistant-window__chip--primary"
          data-assistant-chip
          data-chip-type="confirmation"
          data-chip-value="yes"
          ${disabled}
        >
          ✅ Sí, registrar solicitud
        </button>

        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="confirmation"
          data-chip-value="no"
          ${disabled}
        >
          Ahora no
        </button>
      </div>
    `;
  }

  if (state.replyMode === "skip_email") {
    return `
      <div class="hero-assistant-window__quick-actions">
        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="skip_email"
          data-chip-value="skip"
          ${disabled}
        >
          Omitir correo
        </button>
      </div>
    `;
  }

  if (state.replyMode === "skip_dni") {
    return `
      <div class="hero-assistant-window__quick-actions">
        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="skip_dni"
          data-chip-value="skip"
          ${disabled}
        >
          Omitir DNI
        </button>
      </div>
    `;
  }

  if (state.replyMode === "completed") {
    const program = state.selectedProgram
      ? PROGRAMS[state.selectedProgram]
      : null;

    return `
      <div class="hero-assistant-window__quick-actions hero-assistant-window__quick-actions--stacked">
        ${renderLeadStatus(state)}

        <a
          href="${buildWhatsAppUrl(state)}"
          class="hero-assistant-window__chip hero-assistant-window__chip--link hero-assistant-window__chip--primary"
          target="_blank"
          rel="noreferrer"
        >
          💬 Continuar por WhatsApp
        </a>

        ${
          program
            ? `
              <a
                href="${program.brochureUrl}"
                class="hero-assistant-window__chip hero-assistant-window__chip--link"
                target="_blank"
                rel="noreferrer"
              >
                📄 Ver brochure PDF
              </a>
            `
            : ""
        }

        <button
          type="button"
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="change_program"
          data-chip-value="change"
          ${disabled}
        >
          Consultar otro programa
        </button>
      </div>
    `;
  }

  return "";
}

export function renderAssistantWindow() {
  return `
    <aside
      class="hero-assistant-window hero-assistant-window--light"
      aria-label="Asistente virtual"
      data-assistant-window
    >
      <div class="hero-assistant-window__dock">
        <div class="hero-assistant-window__character">
          <img
            class="hero-assistant-window__character-image"
            src="/papa.gif"
            alt="Asistente virtual Cookito"
            loading="eager"
            decoding="async"
          />
        </div>

        <div class="hero-assistant-window__launcher-group">
          <div
            class="hero-assistant-window__bubble"
            data-assistant-bubble
          >
            ¿Conversamos? 😊
          </div>

          <button
            type="button"
            class="hero-assistant-window__launcher"
            data-assistant-toggle
            aria-label="Abrir Cookito"
            aria-expanded="false"
          >
            Habla con Cookito
          </button>
        </div>
      </div>

      <div
        class="hero-assistant-window__panel"
        data-assistant-panel
        aria-hidden="true"
      >
        <div class="hero-assistant-window__panel-header">
          <div>
            <span class="hero-assistant-window__eyebrow">
              Asistente virtual
            </span>

            <h3 class="hero-assistant-window__title">Cookito</h3>

            <p class="hero-assistant-window__subtitle">
              Escríbeme con confianza, como si hablaras con una persona.
            </p>
          </div>

          <button
            type="button"
            class="hero-assistant-window__close"
            data-assistant-close
            aria-label="Cerrar Cookito"
          >
            ×
          </button>
        </div>

        <div class="hero-assistant-window__panel-body">
          <div
            class="hero-assistant-window__chat"
            data-assistant-chat
          >
            <div data-assistant-empty></div>
            <div
              class="hero-assistant-window__messages"
              data-assistant-messages
            ></div>
            <div
              class="hero-assistant-window__live"
              data-assistant-live
              aria-live="polite"
            ></div>
          </div>

          <div class="hero-assistant-window__composer">
            <input
              type="text"
              class="hero-assistant-window__input"
              placeholder="Ej.: Hola, quiero información de Gastronomía"
              aria-label="Escribe tu consulta"
              autocomplete="off"
            />

            <button
              type="button"
              class="hero-assistant-window__send"
              data-assistant-send
              aria-label="Enviar mensaje"
            >
              Enviar
            </button>
          </div>

          <p class="hero-assistant-window__note">
            Cookito responderá cuando tú inicies la conversación.
          </p>
        </div>
      </div>
    </aside>
  `;
}

export function mountAssistantWindow() {
  const existing = document.querySelector("[data-assistant-window]");

  if (!existing) {
    document.body.insertAdjacentHTML("beforeend", renderAssistantWindow());
  }

  initAssistantWindow();
}

export function initAssistantWindow() {
  const windows = Array.from(
    document.querySelectorAll<HTMLElement>("[data-assistant-window]")
  );

  windows.forEach((windowEl) => {
    if (windowEl.dataset.assistantInitialized === "true") {
      return;
    }

    windowEl.dataset.assistantInitialized = "true";

    const toggleButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-toggle]"
    );

    const closeButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-close]"
    );

    const sendButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-send]"
    );

    const input = windowEl.querySelector<HTMLInputElement>(
      ".hero-assistant-window__input"
    );

    const chat = windowEl.querySelector<HTMLElement>("[data-assistant-chat]");

    const emptyHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-empty]"
    );

    const messagesHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-messages]"
    );

    const liveHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-live]"
    );

    const panel = windowEl.querySelector<HTMLElement>(
      "[data-assistant-panel]"
    );

    const bubble = windowEl.querySelector<HTMLElement>(
      "[data-assistant-bubble]"
    );

    if (
      !toggleButton ||
      !closeButton ||
      !sendButton ||
      !input ||
      !chat ||
      !emptyHost ||
      !messagesHost ||
      !liveHost ||
      !panel ||
      !bubble
    ) {
      return;
    }

    const safeToggleButton = toggleButton;
    const safeCloseButton = closeButton;
    const safeSendButton = sendButton;
    const safeInput = input;
    const safeChat = chat;
    const safeEmptyHost = emptyHost;
    const safeMessagesHost = messagesHost;
    const safeLiveHost = liveHost;
    const safePanel = panel;
    const safeBubble = bubble;

    const state = createInitialState();
    const renderedMessageIds = new Set<string>();
    let bubbleTimer: number | null = null;
    let scrollFrameId: number | null = null;
    let lastLiveHtml = "";

    function lockInteraction(locked: boolean) {
      state.locked = locked;
      safeInput.disabled = locked;
      safeSendButton.disabled = locked;
    }

    function renderTypingIndicator() {
      if (!state.isTyping) return "";

      return `
        <div
          class="hero-assistant-window__typing"
          aria-live="polite"
        >
          <span class="hero-assistant-window__typing-avatar">C</span>

          <div class="hero-assistant-window__typing-bubble">
            <span class="hero-assistant-window__typing-label">
              Cookito está escribiendo
            </span>

            <span class="hero-assistant-window__typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      `;
    }

    function renderEmptyState() {
      if (state.messages.length > 0 || state.isTyping) return "";

      return `
        <div class="hero-assistant-window__empty">
          <span class="hero-assistant-window__empty-icon">💬</span>
          <strong>Escríbeme para comenzar</strong>
          <small>Carreras, costos, horarios o PDF.</small>
        </div>
      `;
    }

    function renderMessage(message: ChatMessage) {
      if (message.kind === "program_card") {
        return `
          <div
            class="hero-assistant-window__message-shell"
            data-assistant-message-id="${message.id}"
          >
            ${renderProgramCard(PROGRAMS[message.programKey])}
          </div>
        `;
      }

      const roleClass =
        message.role === "bot"
          ? "hero-assistant-window__message--bot"
          : "hero-assistant-window__message--user";

      return `
        <div
          class="hero-assistant-window__message ${roleClass}"
          data-assistant-message-id="${message.id}"
        >
          <p class="hero-assistant-window__text">
            ${formatMessage(message.text)}
          </p>
        </div>
      `;
    }

    function scrollChatToBottom(behavior: ScrollBehavior = "smooth") {
      if (scrollFrameId !== null) {
        window.cancelAnimationFrame(scrollFrameId);
      }

      scrollFrameId = window.requestAnimationFrame(() => {
        safeChat.scrollTo({
          top: safeChat.scrollHeight,
          behavior,
        });
        scrollFrameId = null;
      });
    }

    function bindImageScroll() {
      const images = Array.from(
        safeMessagesHost.querySelectorAll<HTMLImageElement>(
          "img:not([data-assistant-scroll-bound])"
        )
      );

      images.forEach((image) => {
        image.dataset.assistantScrollBound = "true";

        if (!image.complete) {
          image.addEventListener(
            "load",
            () => scrollChatToBottom("smooth"),
            { once: true }
          );
        }
      });
    }

    function render() {
      let addedMessage = false;

      state.messages.forEach((message) => {
        if (renderedMessageIds.has(message.id)) return;

        safeMessagesHost.insertAdjacentHTML("beforeend", renderMessage(message));
        renderedMessageIds.add(message.id);
        addedMessage = true;
      });

      safeEmptyHost.innerHTML = renderEmptyState();

      const liveHtml = `
        ${renderTypingIndicator()}
        ${!state.isTyping ? renderReplies(state) : ""}
      `;

      const liveChanged = liveHtml !== lastLiveHtml;

      if (liveChanged) {
        safeLiveHost.innerHTML = liveHtml;
        lastLiveHtml = liveHtml;
        bindReplyEvents();
      }

      bindImageScroll();

      if (addedMessage || liveChanged) {
        scrollChatToBottom("smooth");
      }
    }

    function addUserMessage(text: string) {
      state.messages.push({
        id: createMessageId(),
        role: "user",
        kind: "text",
        text,
      });

      render();
    }

    async function sendBotSequence(
      items: BotSequenceItem[],
      replyMode: ReplyMode = "none"
    ) {
      const token = ++state.queueToken;

      state.replyMode = "none";
      lockInteraction(true);

      for (const item of items) {
        state.isTyping = true;
        render();

        await wait(getTypingDelay(item));

        if (token !== state.queueToken) {
          state.isTyping = false;
          lockInteraction(false);
          render();
          return;
        }

        state.isTyping = false;

        if (item.kind === "text") {
          state.messages.push({
            id: createMessageId(),
            role: "bot",
            kind: "text",
            text: item.text,
          });
        } else {
          state.messages.push({
            id: createMessageId(),
            role: "bot",
            kind: "program_card",
            programKey: item.programKey,
          });
        }

        render();
        await wait(150);
      }

      if (token !== state.queueToken) return;

      state.replyMode = replyMode;
      lockInteraction(false);
      render();

      window.setTimeout(() => {
        safeInput.focus();
      }, 80);
    }

    function selectProgram(programKey: ProgramKey) {
      state.selectedProgram = programKey;
      state.leadStatus = "idle";
      state.leadError = "";
    }

    function askForProgram(
      action: PendingAction,
      messages: BotSequenceItem[]
    ) {
      state.pendingAction = action;
      state.step = "program";

      void sendBotSequence(messages, "programs");
    }

    function showProgramInformation(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];

      selectProgram(programKey);
      state.step = "idle";
      state.pendingAction = "info";

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `¡Buena elección! ${program.emoji} Te cuento lo esencial de ${program.label}.`,
          },
          {
            kind: "program_card",
            programKey,
          },
          {
            kind: "text",
            text: "¿Vemos costos, horarios o inscripción? 😊",
          },
        ],
        "program_actions"
      );
    }

    function showProgramCosts(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];
      const pricing = program.pricing;

      selectProgram(programKey);
      state.step = "idle";
      state.pendingAction = "costs";

      if (
        pricing.inscription === null ||
        pricing.enrollment === null ||
        pricing.monthly === null ||
        pricing.uniform === null
      ) {
        void sendBotSequence(
          [
            {
              kind: "text",
              text: `Claro 😊 El costo de ${program.label} cambia según el taller.`,
            },
            {
              kind: "text",
              text:
                pricing.note ??
                "Dime cuál te interesa y te ayudo a confirmarlo.",
            },
          ],
          "program_actions"
        );
        return;
      }

      const entryPayment =
        pricing.inscription + pricing.enrollment + pricing.uniform;

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `Estos son los costos de ${program.label} 😊`,
          },
          {
            kind: "text",
            text: `Inscripción: ${money(pricing.inscription)}\nMatrícula: ${money(pricing.enrollment)}\nMensualidad: ${money(pricing.monthly)}\nUniforme: ${money(pricing.uniform)}\n\nInicio referencial: ${money(entryPayment)}.`,
          },
          {
            kind: "text",
            text: "¿Revisamos horarios o dejamos tu solicitud lista? 🙌",
          },
        ],
        "program_actions"
      );
    }

    function showProgramSchedules(
      programKey: ProgramKey,
      preference?: string | null
    ) {
      const program = PROGRAMS[programKey];

      selectProgram(programKey);
      state.pendingAction = "schedules";

      if (!preference) {
        state.step = "idle";

        void sendBotSequence(
          [
            {
              kind: "text",
              text: `Claro 🕐 ¿Qué turno buscas para ${program.label}?`,
            },
            {
              kind: "text",
              text: "Mañana, tarde o noche.",
            },
          ],
          "schedule_options"
        );
        return;
      }

      state.step = "confirm_enrollment";
      state.pendingAction = "enrollment";

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `Perfecto 😊 Buscas turno de ${preference}.`,
          },
          {
            kind: "text",
            text: "Un asesor confirmará el horario y las vacantes. ¿Registramos tu solicitud?",
          },
        ],
        "confirmation"
      );
    }

    function showProgramBrochure(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];

      selectProgram(programKey);
      state.step = "idle";
      state.pendingAction = "brochure";

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `Aquí tienes la información de ${program.label} 📄`,
          },
          {
            kind: "program_card",
            programKey,
          },
        ],
        "program_actions"
      );
    }

    function startEnrollment(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];

      selectProgram(programKey);
      state.step = "ask_name";
      state.pendingAction = "enrollment";
      state.replyMode = "none";
      state.name = "";
      state.phone = "";
      state.email = "";
      state.dni = "";

      void sendBotSequence([
        {
          kind: "text",
          text: `¡Excelente! 🙌 Iniciemos tu solicitud para ${program.label}.`,
        },
        {
          kind: "text",
          text: "¿Cuál es tu nombre? 😊",
        },
      ]);
    }

    function cancelEnrollmentConfirmation() {
      state.step = "idle";
      state.pendingAction = "info";
      state.replyMode = "none";

      void sendBotSequence(
        [
          {
            kind: "text",
            text: "No hay problema 😊 No registraré la solicitud por ahora.",
          },
          {
            kind: "text",
            text: "Puedes seguir consultando costos, horarios o información del programa.",
          },
        ],
        state.selectedProgram ? "program_actions" : "none"
      );
    }

    function handleEnrollmentConfirmation(value: string) {
      const confirmation = detectConfirmation(value);

      if (confirmation === "yes") {
        if (state.selectedProgram) {
          startEnrollment(state.selectedProgram);
        } else {
          state.step = "program";
          state.pendingAction = "enrollment";

          void sendBotSequence(
            [
              {
                kind: "text",
                text: "¡Perfecto! 🙌 Elige el programa para registrar tu solicitud.",
              },
            ],
            "programs"
          );
        }
        return;
      }

      if (confirmation === "no") {
        cancelEnrollmentConfirmation();
        return;
      }

      state.step = "confirm_enrollment";

      void sendBotSequence(
        [
          {
            kind: "text",
            text: "Para continuar, respóndeme “Sí” para registrar tu solicitud o “No” para dejarla para después 😊",
          },
        ],
        "confirmation"
      );
    }

    function showAdvisor(programKey?: ProgramKey | null) {
      if (programKey) {
        selectProgram(programKey);
      }

      state.step = "idle";
      state.pendingAction = "advisor";

      const program = state.selectedProgram
        ? PROGRAMS[state.selectedProgram]
        : null;

      void sendBotSequence(
        [
          {
            kind: "text",
            text: program
              ? `Claro 😊 Un asesor puede ayudarte con ${program.label}.`
              : "Claro 😊 Puedes conversar con un asesor por WhatsApp.",
          },
          {
            kind: "text",
            text: "También puedo registrar tus datos aquí.",
          },
        ],
        state.selectedProgram ? "program_actions" : "none"
      );
    }

    function resolveSelectedProgram(programKey: ProgramKey) {
      switch (state.pendingAction) {
        case "costs":
          showProgramCosts(programKey);
          return;

        case "schedules":
          showProgramSchedules(programKey);
          return;

        case "enrollment":
          startEnrollment(programKey);
          return;

        case "brochure":
          showProgramBrochure(programKey);
          return;

        case "advisor":
          showAdvisor(programKey);
          return;

        case "info":
        default:
          showProgramInformation(programKey);
      }
    }

    function handleIntent(
      intent: Intent,
      detectedProgram: ProgramKey | null,
      originalText: string
    ) {
      const selectedProgram =
        detectedProgram ?? (state.selectedProgram || null);

      switch (intent) {
        case "greeting":
          state.step = "idle";
          void sendBotSequence([
            {
              kind: "text",
              text: "¡Hola! 😊 Soy Cookito.",
            },
            {
              kind: "text",
              text: "¿Qué programa o consulta tienes en mente?",
            },
          ]);
          return;

        case "programs":
          state.step = "program";
          state.pendingAction = "info";
          void sendBotSequence(
            [
              {
                kind: "text",
                text: "Tenemos Gastronomía, Pastelería, Bar, Barismo, Sommelier y Talleres 😊",
              },
              {
                kind: "text",
                text: "Elige una opción 👇",
              },
            ],
            "programs"
          );
          return;

        case "info":
          if (selectedProgram) {
            showProgramInformation(selectedProgram);
          } else {
            askForProgram("info", [
              {
                kind: "text",
                text: "Claro 😊 ¿Sobre qué programa deseas información?",
              },
            ]);
          }
          return;

        case "costs":
          if (selectedProgram) {
            showProgramCosts(selectedProgram);
          } else {
            askForProgram("costs", [
              {
                kind: "text",
                text: "Claro 😊 ¿De qué programa deseas conocer los costos?",
              },
            ]);
          }
          return;

        case "schedules":
          if (selectedProgram) {
            showProgramSchedules(
              selectedProgram,
              detectSchedulePreference(originalText)
            );
          } else {
            askForProgram("schedules", [
              {
                kind: "text",
                text: "¿De qué programa deseas consultar horarios? 🕐",
              },
            ]);
          }
          return;

        case "enrollment":
          if (selectedProgram) {
            startEnrollment(selectedProgram);
          } else {
            askForProgram("enrollment", [
              {
                kind: "text",
                text: "¡Perfecto! 🙌 ¿En qué programa deseas inscribirte?",
              },
            ]);
          }
          return;

        case "brochure":
          if (selectedProgram) {
            showProgramBrochure(selectedProgram);
          } else {
            askForProgram("brochure", [
              {
                kind: "text",
                text: "Claro 📄 ¿De qué programa deseas el PDF?",
              },
            ]);
          }
          return;

        case "advisor":
          showAdvisor(selectedProgram);
          return;

        case "duration":
          if (selectedProgram) {
            void sendBotSequence(
              [
                {
                  kind: "text",
                  text: `La duración de ${PROGRAMS[selectedProgram].label} depende de la convocatoria 😊`,
                },
                {
                  kind: "program_card",
                  programKey: selectedProgram,
                },
              ],
              "program_actions"
            );
          } else {
            askForProgram("brochure", [
              {
                kind: "text",
                text: "¿De qué programa deseas conocer la duración?",
              },
            ]);
          }
          return;

        case "requirements":
          if (selectedProgram) {
            void sendBotSequence(
              [
                {
                  kind: "text",
                  text: "Para contactarte pediremos nombre y celular. Correo y DNI son opcionales 😊",
                },
                {
                  kind: "text",
                  text: "El asesor confirmará cualquier requisito adicional.",
                },
              ],
              "program_actions"
            );
          } else {
            askForProgram("info", [
              {
                kind: "text",
                text: "¿De qué programa deseas conocer los requisitos?",
              },
            ]);
          }
          return;

        case "location":
          state.step = "idle";
          void sendBotSequence([
            {
              kind: "text",
              text: "📍 Un asesor puede enviarte la ubicación exacta por WhatsApp.",
            },
          ]);
          return;

        case "thanks":
          state.step = "idle";
          void sendBotSequence([
            {
              kind: "text",
              text: "¡Con gusto! 😊 ¿Te ayudo con algo más?",
            },
          ]);
          return;

        case "farewell":
          state.step = "idle";
          void sendBotSequence([
            {
              kind: "text",
              text: "¡Hasta pronto! 👋 Aquí estaré cuando me necesites.",
            },
          ]);
          return;

        case "unknown":
        default:
          if (detectedProgram) {
            showProgramInformation(detectedProgram);
            return;
          }

          state.step = "idle";
          void sendBotSequence([
            {
              kind: "text",
              text: "No entendí del todo 😅",
            },
            {
              kind: "text",
              text: "Prueba: “costos de Gastronomía” o “PDF de Pastelería”.",
            },
          ]);
      }
    }

    async function submitLead() {
      if (state.leadStatus === "sending") return;

      state.leadStatus = "sending";
      render();

      try {
        await sendLead(state);
        state.leadStatus = "sent";
      } catch (error) {
        state.leadStatus = "error";
        state.leadError =
          error instanceof Error ? error.message : "Error desconocido";
      } finally {
        render();
      }
    }

    function finishEnrollment() {
      const program = state.selectedProgram
        ? PROGRAMS[state.selectedProgram]
        : null;

      if (!program) return;

      state.step = "completed";
      state.replyMode = "none";

      void submitLead();

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `¡Listo, ${getFirstName(state.name)}! 🎉 Tu solicitud para ${program.label} fue registrada.`,
          },
          {
            kind: "text",
            text: "Un asesor te escribirá pronto 😊",
          },
        ],
        "completed"
      );
    }

    function handleLeadStep(
      value: string,
      intent: Intent,
      detectedProgram: ProgramKey | null
    ) {
      const interruptingIntents: Intent[] = [
        "programs",
        "info",
        "costs",
        "schedules",
        "brochure",
        "advisor",
        "duration",
        "requirements",
        "location",
      ];

      if (interruptingIntents.includes(intent)) {
        handleIntent(intent, detectedProgram, value);
        return;
      }

      if (
        hasAny(value, [
          "cancelar",
          "salir",
          "volver al menu",
          "otro programa",
        ])
      ) {
        state.step = "idle";
        void sendBotSequence([
          {
            kind: "text",
            text: "Solicitud pausada 😊 ¿Qué deseas consultar?",
          },
        ]);
        return;
      }

      if (state.step === "ask_name") {
        const name = value.trim();

        if (name.length < 2 || /\d/.test(name)) {
          void sendBotSequence([
            {
              kind: "text",
              text: "No pude identificar tu nombre 😅 Escríbelo otra vez.",
            },
          ]);
          return;
        }

        state.name = name;
        state.step = "ask_phone";
        void sendBotSequence([
          {
            kind: "text",
            text: `Mucho gusto, ${getFirstName(name)} 😊 ¿Cuál es tu celular?`,
          },
        ]);
        return;
      }

      if (state.step === "ask_phone") {
        if (!validPhone(value)) {
          void sendBotSequence([
            {
              kind: "text",
              text: "Escribe un celular de 9 a 12 dígitos 📱",
            },
          ]);
          return;
        }

        state.phone = value.replace(/\D/g, "");
        state.step = "ask_email_optional";
        void sendBotSequence(
          [
            {
              kind: "text",
              text: "Perfecto 🙌 Ahora puedes dejar tu correo o tocar “Omitir correo”.",
            },
          ],
          "skip_email"
        );
        return;
      }

      if (state.step === "ask_email_optional") {
        if (isSkip(value)) {
          state.email = "";
          state.step = "ask_dni_optional";
          void sendBotSequence(
            [
              {
                kind: "text",
                text: "Listo 😊 Puedes dejar tu DNI o tocar “Omitir DNI”.",
              },
            ],
            "skip_dni"
          );
          return;
        }

        if (!validEmail(value)) {
          void sendBotSequence(
            [
              {
                kind: "text",
                text: "Ese correo parece incompleto 😅 Revísalo o toca “Omitir correo”.",
              },
            ],
            "skip_email"
          );
          return;
        }

        state.email = value.trim();
        state.step = "ask_dni_optional";
        void sendBotSequence(
          [
            {
              kind: "text",
              text: "Correo guardado 📧 Ahora puedes dejar tu DNI o tocar “Omitir DNI”.",
            },
          ],
          "skip_dni"
        );
        return;
      }

      if (state.step === "ask_dni_optional") {
        if (isSkip(value)) {
          state.dni = "";
          finishEnrollment();
          return;
        }

        if (!validDni(value)) {
          void sendBotSequence(
            [
              {
                kind: "text",
                text: "El DNI debe tener 8 números 😊",
              },
            ],
            "skip_dni"
          );
          return;
        }

        state.dni = value.trim();
        finishEnrollment();
      }
    }

    function handleUserMessage(rawValue: string) {
      const value = rawValue.trim();
      if (!value || state.isTyping || state.locked) return;

      state.queueToken += 1;
      state.isTyping = false;
      state.replyMode = "none";
      lockInteraction(false);

      addUserMessage(value);
      safeInput.value = "";

      const detectedProgram = detectProgram(value);
      const intent = detectIntent(value);

      if (
        hasAny(value, [
          "reiniciar",
          "empezar de nuevo",
          "menu principal",
          "comenzar de nuevo",
        ])
      ) {
        state.selectedProgram = "";
        state.step = "idle";
        state.pendingAction = "info";

        void sendBotSequence([
          {
            kind: "text",
            text: "Empecemos de nuevo 😊 ¿Qué deseas consultar?",
          },
        ]);
        return;
      }

      if (state.step === "confirm_enrollment") {
        handleEnrollmentConfirmation(value);
        return;
      }

      if (
        state.step === "ask_name" ||
        state.step === "ask_phone" ||
        state.step === "ask_email_optional" ||
        state.step === "ask_dni_optional"
      ) {
        handleLeadStep(value, intent, detectedProgram);
        return;
      }

      if (state.step === "program") {
        if (detectedProgram) {
          resolveSelectedProgram(detectedProgram);
        } else {
          void sendBotSequence(
            [
              {
                kind: "text",
                text: "No identifiqué el programa 😅 Elige una opción:",
              },
            ],
            "programs"
          );
        }
        return;
      }

      if (intent === "unknown" && detectedProgram) {
        showProgramInformation(detectedProgram);
        return;
      }

      handleIntent(intent, detectedProgram, value);
    }

    function bindReplyEvents() {
      const buttons = Array.from(
        safeChat.querySelectorAll<HTMLButtonElement>("[data-assistant-chip]")
      );

      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (state.locked || state.isTyping) return;

          const type = button.dataset.chipType;
          const value = button.dataset.chipValue ?? "";
          const label = button.textContent?.trim() || "Continuar";

          if (type === "program") {
            const programKey = value as ProgramKey;
            addUserMessage(PROGRAMS[programKey].label);
            state.replyMode = "none";
            resolveSelectedProgram(programKey);
            return;
          }

          if (type === "action" && state.selectedProgram) {
            const action = value as PendingAction;
            addUserMessage(label);
            state.replyMode = "none";

            if (action === "costs") {
              showProgramCosts(state.selectedProgram);
              return;
            }

            if (action === "schedules") {
              showProgramSchedules(state.selectedProgram);
              return;
            }

            if (action === "enrollment") {
              startEnrollment(state.selectedProgram);
            }

            return;
          }

          if (type === "schedule" && state.selectedProgram) {
            addUserMessage(`Turno ${value}`);
            state.replyMode = "none";
            showProgramSchedules(state.selectedProgram, value);
            return;
          }

          if (type === "confirmation") {
            state.replyMode = "none";

            if (value === "yes") {
              addUserMessage("Sí, registrar solicitud");

              if (state.selectedProgram) {
                startEnrollment(state.selectedProgram);
              } else {
                state.step = "program";
                state.pendingAction = "enrollment";

                void sendBotSequence(
                  [
                    {
                      kind: "text",
                      text: "¡Perfecto! 🙌 Elige el programa para registrar tu solicitud.",
                    },
                  ],
                  "programs"
                );
              }
              return;
            }

            addUserMessage("Ahora no");
            cancelEnrollmentConfirmation();
            return;
          }

          if (type === "skip_email") {
            addUserMessage("Omitir correo");
            state.email = "";
            state.step = "ask_dni_optional";
            state.replyMode = "none";

            void sendBotSequence(
              [
                {
                  kind: "text",
                  text: "Listo 😊 Puedes dejar tu DNI o tocar “Omitir DNI”.",
                },
              ],
              "skip_dni"
            );
            return;
          }

          if (type === "skip_dni") {
            addUserMessage("Omitir DNI");
            state.dni = "";
            state.replyMode = "none";
            finishEnrollment();
            return;
          }

          if (type === "change_program") {
            addUserMessage("Consultar otro programa");
            state.selectedProgram = "";
            state.step = "program";
            state.pendingAction = "info";
            state.replyMode = "none";

            void sendBotSequence(
              [
                {
                  kind: "text",
                  text: "¡Claro! 😊 Elige el programa que deseas conocer.",
                },
              ],
              "programs"
            );
          }
        });
      });
    }

    function startBubbleRotation() {
      if (bubbleTimer !== null) return;

      bubbleTimer = window.setInterval(() => {
        if (windowEl.classList.contains("is-open")) return;

        state.bubbleIndex = (state.bubbleIndex + 1) % BUBBLES.length;

        safeBubble.textContent = BUBBLES[state.bubbleIndex];
      }, 3200);
    }

    function stopBubbleRotation() {
      if (bubbleTimer !== null) {
        window.clearInterval(bubbleTimer);
        bubbleTimer = null;
      }
    }

    function openAssistant() {
      windowEl.classList.add("is-open");
      safeToggleButton.setAttribute("aria-expanded", "true");
      safePanel.setAttribute("aria-hidden", "false");

      stopBubbleRotation();
      render();

      window.setTimeout(() => {
        safeInput.focus();
      }, 120);
    }

    function closeAssistant() {
      windowEl.classList.remove("is-open");
      safeToggleButton.setAttribute("aria-expanded", "false");
      safePanel.setAttribute("aria-hidden", "true");

      state.queueToken += 1;
      state.isTyping = false;
      lockInteraction(false);
      render();
      startBubbleRotation();
    }

    function toggleAssistant() {
      if (windowEl.classList.contains("is-open")) {
        closeAssistant();
      } else {
        openAssistant();
      }
    }

    safeToggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleAssistant();
    });

    safeCloseButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeAssistant();
    });

    safeSendButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!state.isTyping && !state.locked) {
        handleUserMessage(safeInput.value);
      }
    });

    safeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (!state.isTyping && !state.locked) {
          handleUserMessage(safeInput.value);
        }
      }

      if (event.key === "Escape") {
        closeAssistant();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      const target = event.target as Node | null;

      if (target && !windowEl.contains(target)) {
        closeAssistant();
      }
    });

    safeBubble.textContent = BUBBLES[0];
    render();
    startBubbleRotation();
  });
}
