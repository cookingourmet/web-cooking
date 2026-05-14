import "./heroAssistantPanel.css";

type ProgramKey =
  | "gastronomia"
  | "pasteleria"
  | "bar_profesional"
  | "barismo"
  | "sommelier"
  | "cocina_corta";

type QuickActionKey = "programas" | "costos" | "horarios" | "matricula";

type ChatStep =
  | "welcome"
  | "intent"
  | "program"
  | "ask_name"
  | "ask_phone"
  | "ask_email"
  | "ask_dni_optional"
  | "completed";

type ChatRole = "bot" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

type LeadSubmitStatus = "idle" | "sending" | "sent" | "error";

type LeadData = {
  fullName: string;
  phone: string;
  email: string;
  dni: string;
  selectedProgram: ProgramKey | "";
  selectedIntent: QuickActionKey | "";
  source: "cookito_web_chat";
  brochureSent: boolean;
  recommendedPrograms: ProgramKey[];
};

type AssistantState = {
  step: ChatStep;
  started: boolean;
  messages: ChatMessage[];
  lead: LeadData;
  isTyping: boolean;
  bubbleIndex: number;
  lockedChips: boolean;
  pendingQueueToken: number;
  leadSubmitStatus: LeadSubmitStatus;
  leadSubmitError: string;
  quickRepliesVisible: boolean;
};

type ProgramInfo = {
  key: ProgramKey;
  label: string;
  shortDescription: string;
  brochureUrl: string;
  brochureLabel: string;
  recommended: ProgramKey[];
};

const SALES_EMAIL = "ventas@cookingourmet.edu.pe";
const SALES_WHATSAPP = "51981377382";

const LEAD_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "c70db5c3-9654-4b15-b598-091a9ffa909a";

const LAUNCHER_BUBBLES = [
  "¿Te ayudo a elegir?",
  "Estoy aquí para ayudarte",
  "Costos y horarios",
  "Habla con Cookito",
];

const PROGRAMS: Record<ProgramKey, ProgramInfo> = {
  gastronomia: {
    key: "gastronomia",
    label: "Gastronomía Profesional",
    shortDescription: "aprender cocina profesional desde cero y con práctica real.",
    brochureUrl: "/brochures/gastronomia.pdf",
    brochureLabel: "Ver brochure de Gastronomía",
    recommended: ["pasteleria", "cocina_corta"],
  },
  pasteleria: {
    key: "pasteleria",
    label: "Pastelería Profesional",
    shortDescription: "crear postres, tortas y productos de repostería profesional.",
    brochureUrl: "/brochures/pasteleria.pdf",
    brochureLabel: "Ver brochure de Pastelería",
    recommended: ["gastronomia", "cocina_corta"],
  },
  bar_profesional: {
    key: "bar_profesional",
    label: "Bar Profesional",
    shortDescription: "dominar coctelería, barra y atención de servicio.",
    brochureUrl: "/brochures/bar-profesional.pdf",
    brochureLabel: "Ver brochure de Bar Profesional",
    recommended: ["sommelier", "barismo"],
  },
  barismo: {
    key: "barismo",
    label: "Barismo",
    shortDescription: "preparar café de especialidad y mejorar tu técnica de servicio.",
    brochureUrl: "/brochures/barismo.pdf",
    brochureLabel: "Ver brochure de Barismo",
    recommended: ["bar_profesional", "sommelier"],
  },
  sommelier: {
    key: "sommelier",
    label: "Sommelier",
    shortDescription: "aprender sobre vinos, cata, maridaje y servicio especializado.",
    brochureUrl: "/brochures/sommelier.pdf",
    brochureLabel: "Ver brochure de Sommelier",
    recommended: ["bar_profesional", "barismo"],
  },
  cocina_corta: {
    key: "cocina_corta",
    label: "Cursos y Talleres Cortos",
    shortDescription: "capacitarte rápido en habilidades prácticas de cocina.",
    brochureUrl: "/brochures/cursos-cortos.pdf",
    brochureLabel: "Ver brochure de Cursos Cortos",
    recommended: ["gastronomia", "pasteleria"],
  },
};

const QUICK_ACTIONS: Record<QuickActionKey, string> = {
  programas: "Quiero información",
  costos: "Consultar costos",
  horarios: "Ver horarios",
  matricula: "Inscribirme",
};

function createInitialState(): AssistantState {
  return {
    step: "welcome",
    started: false,
    messages: [],
    isTyping: false,
    bubbleIndex: 0,
    lockedChips: false,
    pendingQueueToken: 0,
    leadSubmitStatus: "idle",
    leadSubmitError: "",
    quickRepliesVisible: false,
    lead: {
      fullName: "",
      phone: "",
      email: "",
      dni: "",
      selectedProgram: "",
      selectedIntent: "",
      source: "cookito_web_chat",
      brochureSent: false,
      recommendedPrograms: [],
    },
  };
}

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getMessageDelay(text: string, min = 650, max = 1500) {
  const cleanLength = text.trim().length;
  const calculated = 600 + cleanLength * 7;
  return Math.max(min, Math.min(max, calculated));
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function getFirstName(value: string) {
  return value.trim().split(/\s+/)[0] || "gracias";
}

function isValidPhone(value: string) {
  const clean = value.replace(/\D/g, "");
  return clean.length >= 9 && clean.length <= 12;
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidDni(value: string) {
  return /^\d{8}$/.test(value.trim());
}

function getProgramInfo(programKey: ProgramKey | "") {
  return programKey ? PROGRAMS[programKey] : null;
}

function detectProgramFromText(rawValue: string): ProgramKey | null {
  const value = normalizeText(rawValue);

  if (
    value.includes("gastronomia") ||
    value.includes("gastronomía") ||
    value.includes("cocina profesional")
  ) {
    return "gastronomia";
  }

  if (
    value.includes("pasteleria") ||
    value.includes("pastelería") ||
    value.includes("reposteria") ||
    value.includes("repostería")
  ) {
    return "pasteleria";
  }

  if (
    value.includes("bar profesional") ||
    value.includes("bartender") ||
    value.includes("cocteleria") ||
    value.includes("coctelería") ||
    value === "bar"
  ) {
    return "bar_profesional";
  }

  if (
    value.includes("barismo") ||
    value.includes("café") ||
    value.includes("cafe")
  ) {
    return "barismo";
  }

  if (
    value.includes("sommelier") ||
    value.includes("vino") ||
    value.includes("vinos")
  ) {
    return "sommelier";
  }

  if (
    value.includes("curso corto") ||
    value.includes("cursos cortos") ||
    value.includes("taller") ||
    value.includes("talleres") ||
    value.includes("curso rápido") ||
    value.includes("curso rapido")
  ) {
    return "cocina_corta";
  }

  return null;
}

function getRecommendedPrograms(programKey: ProgramKey): ProgramKey[] {
  return PROGRAMS[programKey].recommended;
}

function getIntentReply(intent: QuickActionKey) {
  switch (intent) {
    case "programas":
      return "Genial 😊 Te ayudo a elegir el programa ideal.";
    case "costos":
      return "Claro 😊 Primero dime qué programa te interesa.";
    case "horarios":
      return "Perfecto 😊 Elige el programa y un asesor te pasará los horarios.";
    case "matricula":
      return "Excelente 🙌 Dejemos tu solicitud lista.";
    default:
      return "Perfecto 😊 Continuemos.";
  }
}

function buildLeadSummary(state: AssistantState) {
  const program = getProgramInfo(state.lead.selectedProgram);

  return [
    "Nuevo lead Cookito",
    `Programa: ${program?.label ?? "-"}`,
    `Nombre: ${state.lead.fullName || "-"}`,
    `Celular: ${state.lead.phone || "-"}`,
    `Correo: ${state.lead.email || "-"}`,
    `DNI: ${state.lead.dni || "No compartido"}`,
    `Interés: ${
      state.lead.selectedIntent ? QUICK_ACTIONS[state.lead.selectedIntent] : "-"
    }`,
    `Origen: ${state.lead.source}`,
    `Página: ${window.location.href}`,
  ].join("\n");
}

function buildWhatsAppUrl(state: AssistantState) {
  const message = buildLeadSummary(state);
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function buildMailtoUrl(state: AssistantState) {
  const subject = `Nuevo lead Cookito - ${
    getProgramInfo(state.lead.selectedProgram)?.label ?? "Programa"
  }`;

  const body = buildLeadSummary(state);

  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

async function sendLeadToSales(state: AssistantState) {
  const program = getProgramInfo(state.lead.selectedProgram);

  const formData = new FormData();

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", `Nuevo lead Cookito - ${program?.label ?? "Programa"}`);

  formData.append("from_name", "Cookito - Cooking Gourmet");
  formData.append("email", state.lead.email);
  formData.append("replyto", state.lead.email);

  formData.append("destino", SALES_EMAIL);
  formData.append("programa", program?.label ?? "-");
  formData.append("nombre", state.lead.fullName || "-");
  formData.append("celular", state.lead.phone || "-");
  formData.append("correo", state.lead.email || "-");
  formData.append("dni", state.lead.dni || "No compartido");

  formData.append(
    "interes",
    state.lead.selectedIntent ? QUICK_ACTIONS[state.lead.selectedIntent] : "-"
  );

  formData.append("origen", state.lead.source);
  formData.append("pagina", window.location.href);
  formData.append("fecha", new Date().toLocaleString("es-PE"));
  formData.append("resumen", buildLeadSummary(state));

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  let data: { success?: boolean; message?: string } | null = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "No se pudo enviar la solicitud.");
  }

  return data;
}

function renderLeadSubmitStatus(state: AssistantState) {
  if (state.leadSubmitStatus === "idle") return "";

  if (state.leadSubmitStatus === "sending") {
    return `
      <div class="hero-assistant-window__send-status is-sending">
        Enviando solicitud...
      </div>
    `;
  }

  if (state.leadSubmitStatus === "sent") {
    return `
      <div class="hero-assistant-window__send-status is-sent">
        Solicitud enviada correctamente.
      </div>
    `;
  }

  return `
    <div class="hero-assistant-window__send-status is-error">
      No se pudo enviar. Puedes reenviar o escribir por WhatsApp.
    </div>
  `;
}

function renderQuickReplies(step: ChatStep, state: AssistantState) {
  if (step === "intent") {
    return `
      <div class="hero-assistant-window__quick-actions">
        ${(["programas", "costos", "horarios", "matricula"] as QuickActionKey[])
          .map(
            (key) => `
              <button
                type="button"
                class="hero-assistant-window__chip${
                  state.lockedChips ? " is-disabled" : ""
                }"
                data-assistant-chip
                data-chip-type="intent"
                data-chip-value="${key}"
                ${state.lockedChips ? "disabled" : ""}
              >
                ${QUICK_ACTIONS[key]}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (step === "program") {
    return `
      <div class="hero-assistant-window__quick-actions">
        ${(Object.keys(PROGRAMS) as ProgramKey[])
          .map((key) => {
            const item = PROGRAMS[key];

            return `
              <button
                type="button"
                class="hero-assistant-window__chip${
                  state.lockedChips ? " is-disabled" : ""
                }"
                data-assistant-chip
                data-chip-type="program"
                data-chip-value="${item.key}"
                ${state.lockedChips ? "disabled" : ""}
              >
                ${item.label}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  if (step === "ask_dni_optional") {
    return `
      <div class="hero-assistant-window__quick-actions">
        <button
          type="button"
          class="hero-assistant-window__chip${
            state.lockedChips ? " is-disabled" : ""
          }"
          data-assistant-chip
          data-chip-type="dni_optional"
          data-chip-value="skip"
          ${state.lockedChips ? "disabled" : ""}
        >
          Omitir DNI
        </button>
      </div>
    `;
  }

  if (step === "completed") {
    const selectedProgram = getProgramInfo(state.lead.selectedProgram);
    const whatsappUrl = buildWhatsAppUrl(state);
    const mailtoUrl = buildMailtoUrl(state);

    return `
      <div class="hero-assistant-window__quick-actions hero-assistant-window__quick-actions--stacked">
        ${renderLeadSubmitStatus(state)}

        ${
          state.leadSubmitStatus === "error"
            ? `
              <button
                type="button"
                class="hero-assistant-window__chip hero-assistant-window__chip--primary"
                data-assistant-chip
                data-chip-type="resend_lead"
                data-chip-value="resend"
              >
                Reenviar solicitud
              </button>

              <a
                href="${mailtoUrl}"
                class="hero-assistant-window__chip hero-assistant-window__chip--link"
              >
                Enviar por correo
              </a>
            `
            : ""
        }

        <a
          href="${whatsappUrl}"
          class="hero-assistant-window__chip hero-assistant-window__chip--link hero-assistant-window__chip--primary"
          target="_blank"
          rel="noreferrer"
        >
          Continuar por WhatsApp
        </a>

        ${
          selectedProgram
            ? `
              <a
                href="${selectedProgram.brochureUrl}"
                class="hero-assistant-window__chip hero-assistant-window__chip--link"
                target="_blank"
                rel="noreferrer"
              >
                ${selectedProgram.brochureLabel}
              </a>
            `
            : ""
        }
      </div>
    `;
  }

  return "";
}

export function renderAssistantWindow() {
  return `
    <aside class="hero-assistant-window hero-assistant-window--light" aria-label="Asistente virtual" data-assistant-window>
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
          <div class="hero-assistant-window__bubble" data-assistant-bubble>
            ¿Te ayudo a elegir?
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
            <span class="hero-assistant-window__eyebrow">Asistente virtual</span>
            <h3 class="hero-assistant-window__title">Cookito</h3>
            <p class="hero-assistant-window__subtitle">
              Te ayudo con programas, costos, horarios e inscripción.
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
          <div class="hero-assistant-window__chat" data-assistant-chat></div>

          <div class="hero-assistant-window__composer">
            <input
              type="text"
              class="hero-assistant-window__input"
              placeholder="Escribe aquí..."
              aria-label="Escribe tu respuesta"
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
            Tus datos serán enviados al área de ventas.
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
    if (windowEl.dataset.assistantInitialized === "true") return;

    windowEl.dataset.assistantInitialized = "true";

    const toggleBtn = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-toggle]"
    );
    const closeBtn = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-close]"
    );
    const sendBtn = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-send]"
    );
    const input = windowEl.querySelector<HTMLInputElement>(
      ".hero-assistant-window__input"
    );
    const chat = windowEl.querySelector<HTMLElement>("[data-assistant-chat]");
    const panel = windowEl.querySelector<HTMLElement>("[data-assistant-panel]");
    const bubble = windowEl.querySelector<HTMLElement>(
      "[data-assistant-bubble]"
    );

    if (!toggleBtn || !closeBtn || !sendBtn || !input || !chat || !panel || !bubble) {
      return;
    }

    const safeToggleBtn = toggleBtn;
    const safeCloseBtn = closeBtn;
    const safeSendBtn = sendBtn;
    const safeInput = input;
    const safeChat = chat;
    const safePanel = panel;
    const safeBubble = bubble;

    const state = createInitialState();

    let bubbleTimer: number | null = null;
    let typingTimer: number | null = null;

    function updateLauncherBubble() {
      safeBubble.textContent =
        LAUNCHER_BUBBLES[state.bubbleIndex] ?? LAUNCHER_BUBBLES[0];
    }

    function startBubbleRotation() {
      if (bubbleTimer !== null) return;

      bubbleTimer = window.setInterval(() => {
        if (windowEl.classList.contains("is-open")) return;

        state.bubbleIndex = (state.bubbleIndex + 1) % LAUNCHER_BUBBLES.length;
        updateLauncherBubble();
      }, 3200);
    }

    function stopBubbleRotation() {
      if (bubbleTimer !== null) {
        window.clearInterval(bubbleTimer);
        bubbleTimer = null;
      }
    }

    function clearTypingTimer() {
      if (typingTimer !== null) {
        window.clearTimeout(typingTimer);
        typingTimer = null;
      }
    }

    function setInteractionLocked(locked: boolean) {
      state.lockedChips = locked;
      safeInput.disabled = locked;
      safeSendBtn.disabled = locked;
    }

    function renderTypingIndicator() {
      if (!state.isTyping) return "";

      return `
        <div class="hero-assistant-window__typing" aria-live="polite">
          <span class="hero-assistant-window__typing-avatar">C</span>
          <div class="hero-assistant-window__typing-bubble">
            <span class="hero-assistant-window__typing-label">Cookito está escribiendo</span>
            <span class="hero-assistant-window__typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      `;
    }

    function renderMessages() {
      const shouldShowQuickReplies =
        state.quickRepliesVisible && !state.isTyping && !state.lockedChips;

      safeChat.innerHTML = `
        ${state.messages
          .map((message) => {
            const roleClass =
              message.role === "bot"
                ? "hero-assistant-window__message--bot"
                : "hero-assistant-window__message--user";

            return `
              <div class="hero-assistant-window__message ${roleClass}">
                <p class="hero-assistant-window__text">${escapeHtml(
                  message.text
                )}</p>
              </div>
            `;
          })
          .join("")}

        ${renderTypingIndicator()}
        ${shouldShowQuickReplies ? renderQuickReplies(state.step, state) : ""}
      `;

      attachChipEvents();
      safeChat.scrollTop = safeChat.scrollHeight;
    }

    function addUserMessage(text: string) {
      state.messages.push({
        id: createMessageId(),
        role: "user",
        text,
      });

      renderMessages();
    }

    function setTyping(isTyping: boolean) {
      state.isTyping = isTyping;
      renderMessages();
    }

    async function queueBotMessage(text: string, delay?: number, token?: number) {
      const activeToken = token ?? ++state.pendingQueueToken;
      const finalDelay = delay ?? getMessageDelay(text);

      state.quickRepliesVisible = false;
      setInteractionLocked(true);
      state.isTyping = true;
      renderMessages();

      await wait(finalDelay);

      if (activeToken !== state.pendingQueueToken) {
        state.isTyping = false;
        setInteractionLocked(false);
        renderMessages();
        return;
      }

      state.isTyping = false;

      state.messages.push({
        id: createMessageId(),
        role: "bot",
        text,
      });

      state.quickRepliesVisible = true;
      setInteractionLocked(false);
      renderMessages();
    }

    async function submitLeadToSales() {
      if (state.leadSubmitStatus === "sending") return;

      state.leadSubmitStatus = "sending";
      state.leadSubmitError = "";
      renderMessages();

      try {
        await sendLeadToSales(state);
        state.leadSubmitStatus = "sent";
      } catch (error) {
        state.leadSubmitStatus = "error";
        state.leadSubmitError =
          error instanceof Error ? error.message : "Error desconocido";
      } finally {
        renderMessages();
      }
    }

    function attachChipEvents() {
      const chips = Array.from(
        safeChat.querySelectorAll<HTMLButtonElement>("[data-assistant-chip]")
      );

      chips.forEach((chip) => {
        chip.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (state.lockedChips || state.isTyping) return;

          state.lockedChips = true;
          state.quickRepliesVisible = false;
          renderMessages();

          const chipType = chip.dataset.chipType;
          const chipValue = chip.dataset.chipValue ?? "";

          if (chipType === "intent") {
            const intent = chipValue as QuickActionKey;

            addUserMessage(QUICK_ACTIONS[intent]);
            handleIntentSelection(intent);
            return;
          }

          if (chipType === "program") {
            const program = chipValue as ProgramKey;
            const item = PROGRAMS[program];

            addUserMessage(item.label);
            handleProgramSelection(program);
            return;
          }

          if (chipType === "dni_optional" && chipValue === "skip") {
            addUserMessage("Omitir DNI");
            finishLeadFlow(true);
            return;
          }

          if (chipType === "resend_lead") {
            addUserMessage("Reenviar solicitud");
            void submitLeadToSales();
            return;
          }

          state.lockedChips = false;
          renderMessages();
        });
      });
    }

    function startConversation() {
      if (state.started) return;

      state.started = true;
      state.messages = [];
      state.lockedChips = false;
      state.quickRepliesVisible = false;
      state.step = "intent";

      void queueBotMessage(
        "¡Hola! Soy Cookito 👋 Estoy aquí para ayudarte. ¿Qué te gustaría consultar?",
        900
      );
    }

    function handleIntentSelection(intent: QuickActionKey) {
      state.lead.selectedIntent = intent;
      state.step = "program";
      state.quickRepliesVisible = false;
      state.lockedChips = false;
      renderMessages();

      void queueBotMessage(getIntentReply(intent), 900);
    }

    function handleProgramSelection(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];

      state.lead.selectedProgram = programKey;
      state.lead.recommendedPrograms = getRecommendedPrograms(programKey);
      state.lead.brochureSent = false;
      state.leadSubmitStatus = "idle";
      state.leadSubmitError = "";
      state.step = "ask_name";
      state.quickRepliesVisible = false;
      state.lockedChips = false;

      renderMessages();

      void queueBotMessage(
        `¡Buena elección! ${program.label} es una excelente opción para ${program.shortDescription} ¿Me dices tu nombre completo?`,
        1100
      );
    }

    function finishLeadFlow(skippedDni = false) {
      state.step = "completed";
      state.lead.brochureSent = true;
      state.lockedChips = false;
      state.quickRepliesVisible = false;

      renderMessages();

      const program = getProgramInfo(state.lead.selectedProgram);
      if (!program) return;

      void submitLeadToSales();

      const firstName = getFirstName(state.lead.fullName);
      const dniText = skippedDni ? " sin DNI" : "";

      void queueBotMessage(
        `¡Gracias, ${firstName}! ✅ Ya envié tu solicitud${dniText}. Un asesor de Cooking Gourmet te escribirá pronto.`,
        1200
      );
    }

    function handleUserMessage(rawValue: string) {
      const value = rawValue.trim();
      if (!value) return;

      state.pendingQueueToken++;
      clearTypingTimer();
      setTyping(false);
      state.lockedChips = true;
      state.quickRepliesVisible = false;

      addUserMessage(value);
      safeInput.value = "";

      if (state.step === "welcome") {
        state.step = "intent";
        state.lockedChips = false;
        state.quickRepliesVisible = false;
        renderMessages();

        void queueBotMessage("¿Qué te gustaría consultar?", 800);
        return;
      }

      if (state.step === "intent") {
        const normalized = normalizeText(value);

        if (normalized.includes("costo") || normalized.includes("matr")) {
          handleIntentSelection("costos");
          return;
        }

        if (normalized.includes("horario")) {
          handleIntentSelection("horarios");
          return;
        }

        if (normalized.includes("inscrip") || normalized.includes("matric")) {
          handleIntentSelection("matricula");
          return;
        }

        handleIntentSelection("programas");
        return;
      }

      if (state.step === "program") {
        const detectedProgram = detectProgramFromText(value);

        if (!detectedProgram) {
          state.lockedChips = false;
          state.quickRepliesVisible = false;
          renderMessages();

          void queueBotMessage(
            "Puedes elegir Gastronomía, Pastelería, Bar, Barismo, Sommelier o Cursos Cortos 😊",
            1000
          );

          return;
        }

        handleProgramSelection(detectedProgram);
        return;
      }

      if (state.step === "ask_name") {
        if (value.length < 3) {
          state.lockedChips = false;
          state.quickRepliesVisible = false;
          renderMessages();

          void queueBotMessage("¿Me escribes tu nombre completo, por favor?", 900);
          return;
        }

        state.lead.fullName = value;
        state.step = "ask_phone";
        state.lockedChips = false;
        state.quickRepliesVisible = false;
        renderMessages();

        void queueBotMessage(
          `Mucho gusto, ${getFirstName(value)} 😊 ¿A qué número podemos escribirte?`,
          900
        );
        return;
      }

      if (state.step === "ask_phone") {
        if (!isValidPhone(value)) {
          state.lockedChips = false;
          state.quickRepliesVisible = false;
          renderMessages();

          void queueBotMessage("Creo que falta algún número. Escríbelo nuevamente, por favor.", 900);
          return;
        }

        state.lead.phone = normalizePhone(value);
        state.step = "ask_email";
        state.lockedChips = false;
        state.quickRepliesVisible = false;
        renderMessages();

        void queueBotMessage(
          "Gracias 🙌 Ahora déjame tu correo para enviarte la información.",
          900
        );
        return;
      }

      if (state.step === "ask_email") {
        if (!isValidEmail(value)) {
          state.lockedChips = false;
          state.quickRepliesVisible = false;
          renderMessages();

          void queueBotMessage("Parece que el correo no está completo. Revísalo, por favor.", 900);
          return;
        }

        state.lead.email = value.trim();
        state.step = "ask_dni_optional";
        state.lockedChips = false;
        state.quickRepliesVisible = false;
        renderMessages();

        void queueBotMessage(
          "Listo 😊 El DNI es opcional. Puedes escribirlo o tocar “Omitir DNI”.",
          900
        );
        return;
      }

      if (state.step === "ask_dni_optional") {
        if (!isValidDni(value)) {
          state.lockedChips = false;
          state.quickRepliesVisible = false;
          renderMessages();

          void queueBotMessage("El DNI debe tener 8 números. También puedes omitirlo.", 900);
          return;
        }

        state.lead.dni = value.trim();
        finishLeadFlow(false);
        return;
      }

      if (state.step === "completed") {
        const detectedProgram = detectProgramFromText(value);

        if (detectedProgram) {
          handleProgramSelection(detectedProgram);
          return;
        }

        state.lockedChips = false;
        state.quickRepliesVisible = false;
        renderMessages();

        void queueBotMessage("Puedes continuar por WhatsApp o elegir otro programa 😊", 900);
      }
    }

    function openAssistant() {
      windowEl.classList.add("is-open");
      safeToggleBtn.setAttribute("aria-expanded", "true");
      safePanel.setAttribute("aria-hidden", "false");

      stopBubbleRotation();
      startConversation();

      window.setTimeout(() => {
        safeInput.focus();
      }, 120);
    }

    function closeAssistant() {
      windowEl.classList.remove("is-open");
      safeToggleBtn.setAttribute("aria-expanded", "false");
      safePanel.setAttribute("aria-hidden", "true");

      clearTypingTimer();

      state.pendingQueueToken++;
      state.quickRepliesVisible = false;
      setTyping(false);
      setInteractionLocked(false);

      renderMessages();
      startBubbleRotation();
    }

    function toggleAssistant() {
      if (windowEl.classList.contains("is-open")) {
        closeAssistant();
      } else {
        openAssistant();
      }
    }

    safeToggleBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleAssistant();
    });

    safeCloseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeAssistant();
    });

    safeSendBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (state.isTyping) return;

      handleUserMessage(safeInput.value);
    });

    safeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();

        if (state.isTyping) return;

        handleUserMessage(safeInput.value);
      }

      if (event.key === "Escape") {
        closeAssistant();
      }
    });

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (!windowEl.contains(target)) {
        closeAssistant();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    updateLauncherBubble();
    startBubbleRotation();
  });
}