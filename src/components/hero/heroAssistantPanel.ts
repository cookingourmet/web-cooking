import "./heroAssistantPanel.css";

type ProgramKey =
  | "gastronomia"
  | "pasteleria"
  | "bar_profesional"
  | "barismo"
  | "sommelier"
  | "cocina_corta";

type QuickActionKey =
  | "programas"
  | "costos"
  | "horarios"
  | "matricula";

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

const LAUNCHER_BUBBLES = [
  "¿Buscas un programa?",
  "Te ayudamos al instante",
  "Consulta costos y horarios",
  "Habla con Cookito",
];

const PROGRAMS: Record<ProgramKey, ProgramInfo> = {
  gastronomia: {
    key: "gastronomia",
    label: "Gastronomía Profesional",
    shortDescription:
      "ideal si buscas una formación completa, práctica y con proyección laboral en cocina profesional.",
    brochureUrl: "/brochures/gastronomia.pdf",
    brochureLabel: "Ver brochure de Gastronomía",
    recommended: ["pasteleria", "cocina_corta"],
  },
  pasteleria: {
    key: "pasteleria",
    label: "Pastelería Profesional",
    shortDescription:
      "perfecta si te interesa desarrollar técnica, creatividad y especialización en postres y repostería.",
    brochureUrl: "/brochures/pasteleria.pdf",
    brochureLabel: "Ver brochure de Pastelería",
    recommended: ["gastronomia", "cocina_corta"],
  },
  bar_profesional: {
    key: "bar_profesional",
    label: "Bar Profesional",
    shortDescription:
      "muy buena opción si buscas una formación práctica en coctelería, servicio y técnica de barra.",
    brochureUrl: "/brochures/bar-profesional.pdf",
    brochureLabel: "Ver brochure de Bar Profesional",
    recommended: ["sommelier", "barismo"],
  },
  barismo: {
    key: "barismo",
    label: "Barismo",
    shortDescription:
      "ideal si te apasiona el café y quieres dominar preparación, extracción y experiencia de servicio.",
    brochureUrl: "/brochures/barismo.pdf",
    brochureLabel: "Ver brochure de Barismo",
    recommended: ["bar_profesional", "sommelier"],
  },
  sommelier: {
    key: "sommelier",
    label: "Sommelier",
    shortDescription:
      "recomendado si te interesa el mundo del vino, cata, maridaje y servicio especializado.",
    brochureUrl: "/brochures/sommelier.pdf",
    brochureLabel: "Ver brochure de Sommelier",
    recommended: ["bar_profesional", "barismo"],
  },
  cocina_corta: {
    key: "cocina_corta",
    label: "Cursos y Talleres Cortos",
    shortDescription:
      "ideal si buscas una opción rápida, práctica y enfocada en habilidades concretas.",
    brochureUrl: "/brochures/cursos-cortos.pdf",
    brochureLabel: "Ver brochure de Cursos Cortos",
    recommended: ["gastronomia", "pasteleria"],
  },
};

const QUICK_ACTIONS: Record<QuickActionKey, string> = {
  programas: "Ver programas",
  costos: "Costos y matrículas",
  horarios: "Horarios",
  matricula: "Inscripción",
};

function createInitialState(): AssistantState {
  return {
    step: "welcome",
    started: false,
    messages: [],
    isTyping: false,
    bubbleIndex: 0,
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

  if (value.includes("barismo") || value.includes("café") || value.includes("cafe")) {
    return "barismo";
  }

  if (value.includes("sommelier") || value.includes("vino") || value.includes("vinos")) {
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
      return "Perfecto. Te ayudaré a encontrar el programa que mejor encaje contigo.";
    case "costos":
      return "Claro. Primero te orientaré con el programa y luego podrás continuar por WhatsApp para costos y matrícula.";
    case "horarios":
      return "Excelente. Revisemos primero qué programa te interesa y luego continúas con horarios.";
    case "matricula":
      return "Muy bien. Te ayudaré a identificar el programa ideal y dejar tu solicitud lista.";
    default:
      return "Perfecto. Continuemos.";
  }
}

function buildLeadSummary(state: AssistantState) {
  const program = getProgramInfo(state.lead.selectedProgram);

  return [
    "Nueva solicitud desde Cookito",
    `Programa: ${program?.label ?? "-"}`,
    `Nombre: ${state.lead.fullName || "-"}`,
    `Celular: ${state.lead.phone || "-"}`,
    `Correo: ${state.lead.email || "-"}`,
    `DNI: ${state.lead.dni || "No compartido"}`,
    `Interés: ${
      state.lead.selectedIntent ? QUICK_ACTIONS[state.lead.selectedIntent] : "-"
    }`,
    `Origen: ${state.lead.source}`,
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

function renderQuickReplies(step: ChatStep, state: AssistantState) {
  if (step === "intent") {
    return `
      <div class="hero-assistant-window__quick-actions">
        ${(["programas", "costos", "horarios", "matricula"] as QuickActionKey[])
          .map(
            (key) => `
              <button
                type="button"
                class="hero-assistant-window__chip"
                data-assistant-chip
                data-chip-type="intent"
                data-chip-value="${key}"
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
                class="hero-assistant-window__chip"
                data-assistant-chip
                data-chip-type="program"
                data-chip-value="${item.key}"
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
          class="hero-assistant-window__chip"
          data-assistant-chip
          data-chip-type="dni_optional"
          data-chip-value="skip"
        >
          Omitir por ahora
        </button>
      </div>
    `;
  }

  if (step === "completed") {
    const selectedProgram = getProgramInfo(state.lead.selectedProgram);
    const recommended = state.lead.recommendedPrograms
      .map((key) => PROGRAMS[key])
      .slice(0, 2);

    const whatsappUrl = buildWhatsAppUrl(state);
    const mailtoUrl = buildMailtoUrl(state);

    return `
      <div class="hero-assistant-window__quick-actions hero-assistant-window__quick-actions--stacked">
        <a
          href="${whatsappUrl}"
          class="hero-assistant-window__chip hero-assistant-window__chip--link hero-assistant-window__chip--primary"
          target="_blank"
          rel="noreferrer"
        >
          Continuar por WhatsApp
        </a>

        <a
          href="${mailtoUrl}"
          class="hero-assistant-window__chip hero-assistant-window__chip--link"
        >
          Enviar solicitud por correo
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

        ${recommended
          .map(
            (item) => `
              <button
                type="button"
                class="hero-assistant-window__chip"
                data-assistant-chip
                data-chip-type="program"
                data-chip-value="${item.key}"
              >
                Ver también ${item.label}
              </button>
            `
          )
          .join("")}
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
            ¿Buscas un programa?
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
              Te ayudo con programas, costos, horarios e inscripciones.
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
              placeholder="Escribe tu respuesta..."
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
            Tus datos se usarán solo para brindarte información del programa.
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

    const toggleBtn = windowEl.querySelector<HTMLButtonElement>("[data-assistant-toggle]");
    const closeBtn = windowEl.querySelector<HTMLButtonElement>("[data-assistant-close]");
    const sendBtn = windowEl.querySelector<HTMLButtonElement>("[data-assistant-send]");
    const input = windowEl.querySelector<HTMLInputElement>(".hero-assistant-window__input");
    const chat = windowEl.querySelector<HTMLElement>("[data-assistant-chat]");
    const panel = windowEl.querySelector<HTMLElement>("[data-assistant-panel]");
    const bubble = windowEl.querySelector<HTMLElement>("[data-assistant-bubble]");

    if (!toggleBtn || !closeBtn || !sendBtn || !input || !chat || !panel || !bubble) return;

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
      safeBubble.textContent = LAUNCHER_BUBBLES[state.bubbleIndex] ?? LAUNCHER_BUBBLES[0];
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
      safeChat.innerHTML = `
        ${state.messages
          .map((message) => {
            const roleClass =
              message.role === "bot"
                ? "hero-assistant-window__message--bot"
                : "hero-assistant-window__message--user";

            return `
              <div class="hero-assistant-window__message ${roleClass}">
                <p class="hero-assistant-window__text">${escapeHtml(message.text)}</p>
              </div>
            `;
          })
          .join("")}

        ${renderTypingIndicator()}
        ${renderQuickReplies(state.step, state)}
      `;

      attachChipEvents();
      safeChat.scrollTop = safeChat.scrollHeight;
    }

    function addBotMessage(text: string) {
      state.messages.push({
        id: createMessageId(),
        role: "bot",
        text,
      });
      renderMessages();
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

    function queueBotMessage(text: string, delay = 520) {
      setTyping(true);
      clearTypingTimer();

      typingTimer = window.setTimeout(() => {
        typingTimer = null;
        setTyping(false);
        addBotMessage(text);
      }, delay);
    }

    function queueBotMessages(messages: Array<{ text: string; delay?: number }>) {
      let accumulatedDelay = 0;

      messages.forEach((item, index) => {
        const messageDelay = item.delay ?? (index === 0 ? 520 : 720);
        accumulatedDelay += messageDelay;

        window.setTimeout(() => {
          queueBotMessage(item.text, 520);
        }, accumulatedDelay);
      });
    }

    function attachChipEvents() {
      const chips = Array.from(
        safeChat.querySelectorAll<HTMLButtonElement>("[data-assistant-chip]")
      );

      chips.forEach((chip) => {
        chip.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

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
            addUserMessage("Omitir por ahora");
            finishLeadFlow(true);
          }
        });
      });
    }

    function startConversation() {
      if (state.started) return;
      state.started = true;
      state.messages = [];

      addBotMessage("Hola 👋, soy Cookito, tu asistente virtual de Cooking Gourmet.");
      queueBotMessages([
        {
          text: "Puedo ayudarte con programas de estudio, costos, horarios e inscripciones.",
          delay: 280,
        },
        {
          text: "¿Qué te gustaría conocer hoy?",
          delay: 560,
        },
      ]);

      state.step = "intent";
      renderMessages();
    }

    function handleIntentSelection(intent: QuickActionKey) {
      state.lead.selectedIntent = intent;
      state.step = "program";
      renderMessages();

      queueBotMessages([
        { text: getIntentReply(intent), delay: 160 },
        {
          text: "Cuéntame, ¿sobre qué programa te gustaría recibir información?",
          delay: 620,
        },
      ]);
    }

    function handleProgramSelection(programKey: ProgramKey) {
      const program = PROGRAMS[programKey];
      state.lead.selectedProgram = programKey;
      state.lead.recommendedPrograms = getRecommendedPrograms(programKey);
      state.step = "ask_name";
      renderMessages();

      queueBotMessages([
        {
          text: `Excelente elección. ${program.label} es ${program.shortDescription}`,
          delay: 180,
        },
        {
          text: "Para enviarte la información completa del programa y brindarte una mejor atención, te pediré unos datos rápidos.",
          delay: 760,
        },
        {
          text: "Primero, ¿cuál es tu nombre completo?",
          delay: 760,
        },
      ]);
    }

    function finishLeadFlow(skippedDni = false) {
      state.step = "completed";
      state.lead.brochureSent = true;
      renderMessages();

      const program = getProgramInfo(state.lead.selectedProgram);
      if (!program) return;

      const recommendedLabels = state.lead.recommendedPrograms
        .map((key) => PROGRAMS[key].label)
        .slice(0, 2);

      queueBotMessages([
        {
          text: `Listo, ${state.lead.fullName.split(" ")[0] || "gracias"} ✅ Ya registré tu interés en ${program.label}.`,
          delay: 180,
        },
        {
          text: skippedDni
            ? "Continuaremos sin DNI por ahora, no te preocupes."
            : "Tu registro quedó más completo para una atención más rápida.",
          delay: 700,
        },
        {
          text: "Ahora puedes continuar por WhatsApp, enviar tu solicitud por correo o revisar el brochure del programa.",
          delay: 700,
        },
        {
          text: `Además, te recomiendo revisar ${
            recommendedLabels[0] ?? "otro programa relacionado"
          }${
            recommendedLabels[1] ? ` y ${recommendedLabels[1]}` : ""
          } si quieres complementar tu perfil.`,
          delay: 700,
        },
      ]);
    }

    function handleUserMessage(rawValue: string) {
      const value = rawValue.trim();
      if (!value) return;

      addUserMessage(value);
      safeInput.value = "";

      if (state.step === "welcome") {
        state.step = "intent";
        renderMessages();
        queueBotMessage("¿Qué te gustaría conocer hoy?", 440);
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
          queueBotMessage(
            "Puedo ayudarte con Gastronomía Profesional, Pastelería Profesional, Bar Profesional, Barismo, Sommelier o Cursos Cortos. ¿Cuál te interesa?",
            560
          );
          return;
        }

        handleProgramSelection(detectedProgram);
        return;
      }

      if (state.step === "ask_name") {
        if (value.length < 3) {
          queueBotMessage(
            "Tu nombre parece muy corto. ¿Podrías escribirlo completo, por favor?",
            520
          );
          return;
        }

        state.lead.fullName = value;
        state.step = "ask_phone";
        renderMessages();

        queueBotMessage(
          `Mucho gusto, ${value.split(" ")[0]}. Ahora compárteme tu número de celular, por favor.`,
          520
        );
        return;
      }

      if (state.step === "ask_phone") {
        if (!isValidPhone(value)) {
          queueBotMessage(
            "Ese número parece inválido. Envíamelo nuevamente con 9 dígitos o formato correcto, por favor.",
            520
          );
          return;
        }

        state.lead.phone = normalizePhone(value);
        state.step = "ask_email";
        renderMessages();

        queueBotMessage(
          "Perfecto. Ahora dime tu correo electrónico para enviarte el brochure en PDF.",
          520
        );
        return;
      }

      if (state.step === "ask_email") {
        if (!isValidEmail(value)) {
          queueBotMessage(
            "Creo que ese correo no está completo. ¿Podrías revisarlo y enviarlo nuevamente?",
            520
          );
          return;
        }

        state.lead.email = value.trim();
        state.step = "ask_dni_optional";
        renderMessages();

        queueBotMessage(
          "Gracias. Si deseas dejar tu registro más completo, también puedes compartirme tu DNI. Este paso es opcional por ahora.",
          520
        );
        return;
      }

      if (state.step === "ask_dni_optional") {
        if (!isValidDni(value)) {
          renderMessages();
          queueBotMessage(
            "El DNI debe tener 8 números. Si deseas, puedes volver a escribirlo o tocar “Omitir por ahora”.",
            520
          );
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

        queueBotMessage(
          "Puedo ayudarte a revisar otro programa o continuar con un asesor. ¿Qué prefieres?",
          500
        );
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
      setTyping(false);
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
      handleUserMessage(safeInput.value);
    });

    safeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
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