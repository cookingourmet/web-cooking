import "./heroAssistantPanel.css";

import {
  BUBBLE_MESSAGES,
  LEAD_ENDPOINT,
  PROGRAM_KEYS,
  PROGRAMS,
  SALES_EMAIL,
  SALES_PHONE_DISPLAY,
  SALES_PHONE_LINK,
  SALES_WHATSAPP,
  WEB3FORMS_ACCESS_KEY,
} from "./heroAssistantData";
import { CookitoAudio } from "./heroAssistantAudio";
import {
  analyzeMessage,
  detectProgramFromPath,
  normalizeText,
  textHasTerm,
} from "./heroAssistantNlp";
import {
  brochureSequence,
  comparisonSequence,
  costSequence,
  faqSequence,
  firstName,
  programInfoSequence,
  scheduleSequence,
} from "./heroAssistantResponses";
import {
  loadAssistantState,
  saveAssistantState,
} from "./heroAssistantStorage";
import type {
  AssistantState,
  BotSequenceItem,
  ChatMessage,
  CostDetail,
  InfoTableMessage,
  Intent,
  MessageAnalysis,
  ProgramKey,
  ReplyMode,
  SchedulePreference,
} from "./heroAssistantTypes";

const FIRST_RESPONSE_PAUSE = 440;
const BETWEEN_MESSAGE_PAUSE = 420;
const MIN_TYPING_DELAY = 900;
const MAX_TYPING_DELAY = 2200;

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
  if (item.delay !== undefined) return item.delay;
  if (item.kind === "program_card") return 1200;
  if (item.kind === "info_table") return 1100;

  const words = item.text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(
    MIN_TYPING_DELAY,
    Math.min(MAX_TYPING_DELAY, 720 + words * 95)
  );
}

function getBetweenPause(item: BotSequenceItem) {
  if (item.kind !== "text") return 520;
  return Math.min(720, BETWEEN_MESSAGE_PAUSE + item.text.length * 1.6);
}

function isValidPhone(value: string) {
  const clean = value.replace(/\D/g, "");
  return clean.length >= 9 && clean.length <= 12;
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function friendlyName(state: AssistantState) {
  return firstName(state.visitorName);
}

function leadDate() {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date());
}

function buildLeadSummary(state: AssistantState) {
  const program = state.selectedProgram
    ? PROGRAMS[state.selectedProgram]
    : null;

  return [
    "Nuevo lead Cookito",
    "",
    `Nombre: ${state.visitorName || "-"}`,
    `Celular: ${state.phone || "-"}`,
    `Programa: ${program?.label ?? "-"}`,
    `Página: ${window.location.href}`,
    `Fecha: ${leadDate()}`,
  ].join("\n");
}

function buildWhatsAppUrl(state: AssistantState) {
  const program = state.selectedProgram
    ? PROGRAMS[state.selectedProgram]
    : null;

  const costDetailLabels: Record<CostDetail, string> = {
    inscription: "la inscripción",
    enrollment: "la matrícula",
    monthly: "la mensualidad",
    uniform: "el uniforme",
    start: "el monto para comenzar",
    all: "los costos completos",
  };

  const scheduleLabels: Partial<Record<SchedulePreference, string>> = {
    morning: "mañana",
    afternoon: "tarde",
    night: "noche",
    weekend: "fin de semana",
  };

  const intentLabels: Partial<Record<Intent, string>> = {
    info: "información general",
    costs: costDetailLabels[state.currentCostDetail],
    schedules: state.schedulePreference
      ? `horarios del turno ${
          scheduleLabels[state.schedulePreference] ?? state.schedulePreference
        }`
      : "horarios",
    enrollment: "inscripción y vacantes",
    brochure: "el brochure PDF",
    duration: "duración",
    requirements: "requisitos",
    start_date: "fecha de inicio",
    frequency: "frecuencia de clases",
    modality: "modalidad",
    certification: "certificación",
    advisor: "atención de un asesor",
    compare: "comparación de programas",
  };

  const lines = [
    "Hola, vengo desde la web de Cooking Gourmet.",
    state.visitorName ? `Mi nombre es ${state.visitorName}.` : "",
    state.phone ? `Mi celular es ${state.phone}.` : "",
    program
      ? `Quiero saber sobre ${program.label}.`
      : "Quiero conocer sus programas.",
    `Estaba consultando: ${
      intentLabels[state.currentIntent] ?? "información académica"
    }.`,
    state.schedulePreference
      ? `Turno de interés: ${
          scheduleLabels[state.schedulePreference] ??
          state.schedulePreference
        }.`
      : "",
    "¿Podrían ayudarme, por favor?",
  ].filter(Boolean);

  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

async function sendLeadToSales(state: AssistantState) {
  const program = state.selectedProgram
    ? PROGRAMS[state.selectedProgram]
    : null;

  if (!state.visitorName || !state.phone || !program) {
    throw new Error("Faltan datos obligatorios del lead.");
  }

  const date = leadDate();
  const summary = buildLeadSummary(state);
  const formData = new FormData();

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append(
    "subject",
    `Nuevo lead Cookito - ${program.label}`
  );
  formData.append("from_name", "Cookito - Cooking Gourmet");
  formData.append("name", state.visitorName);
  formData.append("email", SALES_EMAIL);
  formData.append("phone", state.phone);
  formData.append("Programa", program.label);
  formData.append("Página", window.location.href);
  formData.append("Fecha", date);
  formData.append("message", summary);

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  const data = (await response
    .json()
    .catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message || "No se pudo enviar el lead al correo."
    );
  }
}

function renderProgramCard(programKey: ProgramKey) {
  const program = PROGRAMS[programKey];

  return `
    <article class="hero-assistant-window__program-card">
      <div class="hero-assistant-window__program-media">
        <img
          src="${escapeHtml(program.imageUrl)}"
          alt="${escapeHtml(program.imageAlt)}"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="hero-assistant-window__program-body">
        <strong class="hero-assistant-window__program-title">
          ${program.emoji} ${escapeHtml(program.label)}
        </strong>

        <p class="hero-assistant-window__program-description">
          ${escapeHtml(program.shortDescription)}
        </p>

        <div class="hero-assistant-window__program-links">
          <a href="${escapeHtml(
            program.brochureUrl
          )}" target="_blank" rel="noreferrer">
            📄 PDF
          </a>
          <a href="${escapeHtml(program.pageUrl)}">
            Ver programa
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderInfoTable(message: InfoTableMessage) {
  const icons: Record<InfoTableMessage["variant"], string> = {
    costs: "💰",
    schedules: "🕐",
    comparison: "⚖️",
    summary: "✅",
  };

  return `
    <section class="hero-assistant-window__info-table hero-assistant-window__info-table--${
      message.variant
    }">
      <header class="hero-assistant-window__info-table-header">
        <span>${icons[message.variant]}</span>
        <div>
          <strong>${escapeHtml(message.title)}</strong>
          ${
            message.subtitle
              ? `<small>${escapeHtml(message.subtitle)}</small>`
              : ""
          }
        </div>
      </header>

      <div class="hero-assistant-window__info-table-body">
        ${message.rows
          .map(
            (row) => `
              <div class="hero-assistant-window__info-table-row${
                row.highlight ? " is-highlighted" : ""
              }">
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(row.value)}</strong>
              </div>
            `
          )
          .join("")}
      </div>

      ${
        message.footer
          ? `<footer>${escapeHtml(message.footer)}</footer>`
          : ""
      }
    </section>
  `;
}

function renderMessage(message: ChatMessage) {
  if (message.kind === "program_card") {
    return `<div class="hero-assistant-window__message-shell" data-message-id="${
      message.id
    }">${renderProgramCard(message.programKey)}</div>`;
  }

  if (message.kind === "info_table") {
    return `<div class="hero-assistant-window__message-shell" data-message-id="${
      message.id
    }">${renderInfoTable(message)}</div>`;
  }

  const roleClass =
    message.role === "bot"
      ? "hero-assistant-window__message--bot"
      : "hero-assistant-window__message--user";

  return `
    <div class="hero-assistant-window__message ${roleClass}" data-message-id="${
      message.id
    }">
      <p class="hero-assistant-window__text">${formatMessage(
        message.text
      )}</p>
    </div>
  `;
}

function renderAssistantWindow() {
  return `
    <aside class="hero-assistant-window" data-assistant-window aria-label="Asistente virtual Cookito">
      <div class="hero-assistant-window__dock">
        <div class="hero-assistant-window__character">
          <img src="/papa.gif" alt="Cookito" />
        </div>

        <div class="hero-assistant-window__launcher-group">
          <div class="hero-assistant-window__bubble" data-assistant-bubble>
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

      <section class="hero-assistant-window__panel" data-assistant-panel aria-hidden="true">
        <header class="hero-assistant-window__panel-header">
          <div class="hero-assistant-window__profile">
            <span class="hero-assistant-window__profile-avatar">
              <img src="/papa.gif" alt="" aria-hidden="true" />
              <span class="hero-assistant-window__online-dot"></span>
            </span>

            <div class="hero-assistant-window__profile-copy">
              <h3 data-assistant-header-title>Cookito</h3>
              <p data-assistant-header-status>En línea</p>
            </div>
          </div>

          <div class="hero-assistant-window__header-actions">
            <button type="button" data-assistant-mute aria-label="Silenciar sonidos" title="Sonidos">🔊</button>
            <button type="button" data-assistant-close aria-label="Cerrar Cookito">×</button>
          </div>
        </header>

        <div class="hero-assistant-window__panel-body">
          <div class="hero-assistant-window__chat" data-assistant-chat>
            <div data-assistant-messages></div>
            <div data-assistant-live></div>
            <div data-assistant-replies></div>
          </div>

          <button
            type="button"
            class="hero-assistant-window__scroll-bottom"
            data-assistant-scroll-bottom
            aria-label="Ir al último mensaje"
          >↓</button>

          <div class="hero-assistant-window__composer">
            <input
              type="text"
              data-assistant-input
              placeholder="Escribe tu consulta..."
              autocomplete="off"
              aria-label="Escribe tu consulta"
            />
            <button type="button" data-assistant-send>Enviar</button>
          </div>
        </div>
      </section>
    </aside>
  `;
}

export function mountAssistantWindow() {
  if (!document.querySelector("[data-assistant-window]")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      renderAssistantWindow()
    );
  }

  initAssistantWindow();
}

export function initAssistantWindow() {
  const windows = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-assistant-window]"
    )
  );

  windows.forEach((windowEl) => {
    if (windowEl.dataset.assistantInitialized === "true") return;
    windowEl.dataset.assistantInitialized = "true";

    const toggleButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-toggle]"
    );
    const closeButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-close]"
    );
    const muteButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-mute]"
    );
    const sendButton = windowEl.querySelector<HTMLButtonElement>(
      "[data-assistant-send]"
    );
    const input = windowEl.querySelector<HTMLInputElement>(
      "[data-assistant-input]"
    );
    const panel = windowEl.querySelector<HTMLElement>(
      "[data-assistant-panel]"
    );
    const chat = windowEl.querySelector<HTMLElement>(
      "[data-assistant-chat]"
    );
    const messagesHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-messages]"
    );
    const liveHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-live]"
    );
    const repliesHost = windowEl.querySelector<HTMLElement>(
      "[data-assistant-replies]"
    );
    const bubble = windowEl.querySelector<HTMLElement>(
      "[data-assistant-bubble]"
    );
    const headerTitle = windowEl.querySelector<HTMLElement>(
      "[data-assistant-header-title]"
    );
    const headerStatus = windowEl.querySelector<HTMLElement>(
      "[data-assistant-header-status]"
    );
    const scrollBottomButton =
      windowEl.querySelector<HTMLButtonElement>(
        "[data-assistant-scroll-bottom]"
      );

    if (
      !toggleButton ||
      !closeButton ||
      !muteButton ||
      !sendButton ||
      !input ||
      !panel ||
      !chat ||
      !messagesHost ||
      !liveHost ||
      !repliesHost ||
      !bubble ||
      !headerTitle ||
      !headerStatus ||
      !scrollBottomButton
    ) {
      return;
    }

    const safeToggleButton = toggleButton;
    const safeCloseButton = closeButton;
    const safeMuteButton = muteButton;
    const safeSendButton = sendButton;
    const safeInput = input;
    const safePanel = panel;
    const safeChat = chat;
    const safeMessagesHost = messagesHost;
    const safeLiveHost = liveHost;
    const safeRepliesHost = repliesHost;
    const safeBubble = bubble;
    const safeHeaderTitle = headerTitle;
    const safeHeaderStatus = headerStatus;
    const safeScrollBottomButton = scrollBottomButton;

    const state = loadAssistantState();
    const audio = new CookitoAudio(state.muted);
    const pageProgram = detectProgramFromPath();

    let isTyping = false;
    let locked = false;
    let queueToken = 0;
    let bubbleTimer: number | null = null;
    let autoFollow = true;
    let scrollFrame: number | null = null;

    const persist = () => saveAssistantState(state);

    function updateHeader() {
      safeHeaderTitle.textContent = state.visitorName
        ? `Cookito · ${firstName(state.visitorName)}`
        : "Cookito";

      safeHeaderStatus.textContent = isTyping
        ? "Escribiendo..."
        : state.leadStatus === "sending"
          ? "Registrando tus datos..."
          : "En línea";

      safeMuteButton.textContent = state.muted ? "🔇" : "🔊";
      safeMuteButton.setAttribute(
        "aria-label",
        state.muted ? "Activar sonidos" : "Silenciar sonidos"
      );
    }

    function updatePlaceholder() {
      switch (state.leadStep) {
        case "ask_visitor_name":
          safeInput.placeholder = "Escribe tu nombre...";
          break;
        case "ask_phone":
          safeInput.placeholder = "Escribe tu celular...";
          break;
        case "ask_program":
          safeInput.placeholder = "Escribe o elige un programa...";
          break;
        default:
          safeInput.placeholder = "Ej.: mensualidad de Pastelería";
      }
    }

    function isNearBottom() {
      return (
        safeChat.scrollHeight -
          safeChat.scrollTop -
          safeChat.clientHeight <=
        48
      );
    }

    function stopScroll() {
      if (scrollFrame !== null) {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = null;
      }
    }

    function updateScrollButton() {
      safeScrollBottomButton.classList.toggle(
        "is-visible",
        !autoFollow && !isNearBottom()
      );
    }

    function scrollToBottom(immediate = false) {
      autoFollow = true;
      stopScroll();

      if (immediate) {
        safeChat.scrollTop = safeChat.scrollHeight;
        updateScrollButton();
        return;
      }

      const animate = () => {
        if (!autoFollow) {
          scrollFrame = null;
          updateScrollButton();
          return;
        }

        const distance =
          safeChat.scrollHeight - safeChat.scrollTop;

        if (Math.abs(distance) <= 1) {
          safeChat.scrollTop = safeChat.scrollHeight;
          scrollFrame = null;
          updateScrollButton();
          return;
        }

        safeChat.scrollTop += distance * 0.17;
        scrollFrame = window.requestAnimationFrame(animate);
      };

      scrollFrame = window.requestAnimationFrame(animate);
    }

    function appendMessage(
      message: ChatMessage,
      forceScroll = false
    ) {
      safeMessagesHost.insertAdjacentHTML(
        "beforeend",
        renderMessage(message)
      );

      const lastImage =
        safeMessagesHost.querySelector<HTMLImageElement>(
          `[data-message-id="${message.id}"] img`
        );

      if (lastImage && !lastImage.complete) {
        lastImage.addEventListener(
          "load",
          () => {
            if (autoFollow) scrollToBottom();
          },
          { once: true }
        );
      }

      if (forceScroll || autoFollow) scrollToBottom();
      else updateScrollButton();
    }

    function renderStoredMessages() {
      safeMessagesHost.innerHTML = state.messages
        .map(renderMessage)
        .join("");

      window.setTimeout(() => scrollToBottom(true), 0);
    }

    function renderTyping() {
      safeLiveHost.innerHTML = isTyping
        ? `
          <div class="hero-assistant-window__typing">
            <span>C</span>
            <div>
              <small>Cookito está escribiendo</small>
              <i></i><i></i><i></i>
            </div>
          </div>
        `
        : "";

      updateHeader();
      if (autoFollow) scrollToBottom();
    }

    function lockInteraction(value: boolean) {
      locked = value;
      safeInput.disabled = value;
      safeSendButton.disabled = value;
    }

    function setReplyMode(mode: ReplyMode) {
      state.replyMode = mode;
      persist();
      renderReplies();
    }

    function replyButton(
      label: string,
      type: string,
      value: string,
      primary = false
    ) {
      return `
        <button
          type="button"
          class="hero-assistant-window__chip${
            primary
              ? " hero-assistant-window__chip--primary"
              : ""
          }"
          data-reply-type="${escapeHtml(type)}"
          data-reply-value="${escapeHtml(value)}"
        >${escapeHtml(label)}</button>
      `;
    }

    function renderReplies() {
      let html = "";

      if (state.replyMode === "main") {
        html = [
          replyButton("🎓 Programas", "intent", "programs"),
          replyButton("💰 Costos", "intent", "costs"),
          replyButton("🕐 Horarios", "intent", "schedules"),
          replyButton(
            "✅ Inscribirme",
            "intent",
            "enrollment",
            true
          ),
        ].join("");
      }

      if (state.replyMode === "programs") {
        html = PROGRAM_KEYS.map((key) =>
          replyButton(
            `${PROGRAMS[key].emoji} ${PROGRAMS[key].label}`,
            "program",
            key
          )
        ).join("");
      }

      if (state.replyMode === "recommendation") {
        html = [
          replyButton(
            "👨‍🍳 Cocina",
            "recommend",
            "gastronomia"
          ),
          replyButton(
            "🎂 Postres",
            "recommend",
            "pasteleria"
          ),
          replyButton(
            "🥃 Coctelería",
            "recommend",
            "bar_profesional"
          ),
          replyButton("☕ Café", "recommend", "barismo"),
          replyButton("🍇 Vinos", "recommend", "sommelier"),
          replyButton(
            "🔥 Intensivo",
            "recommend",
            "cocina_corta"
          ),
        ].join("");
      }

      if (
        state.replyMode === "program_actions" &&
        state.selectedProgram
      ) {
        html = [
          replyButton("💰 Costos", "intent", "costs"),
          replyButton("🕐 Horarios", "intent", "schedules"),
          replyButton("📄 PDF", "intent", "brochure"),
          replyButton(
            "✅ Inscribirme",
            "intent",
            "enrollment",
            true
          ),
        ].join("");
      }

      if (state.replyMode === "schedule_options") {
        html = [
          replyButton("🌤️ Mañana", "schedule", "morning"),
          replyButton("☀️ Tarde", "schedule", "afternoon"),
          replyButton("🌙 Noche", "schedule", "night"),
          replyButton(
            "📅 Fin de semana",
            "schedule",
            "weekend"
          ),
        ].join("");
      }

      if (state.replyMode === "contact") {
        html = `
          <a class="hero-assistant-window__chip hero-assistant-window__chip--call" href="tel:${SALES_PHONE_LINK}">
            📞 Llamar ${SALES_PHONE_DISPLAY}
          </a>
          <a class="hero-assistant-window__chip hero-assistant-window__chip--primary" href="${buildWhatsAppUrl(
            state
          )}" target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
        `;
      }

      safeRepliesHost.innerHTML = html
        ? `<div class="hero-assistant-window__quick-actions">${html}</div>`
        : "";

      bindReplyEvents();
      if (autoFollow) scrollToBottom();
    }

    function addUserMessage(text: string) {
      const message: ChatMessage = {
        id: createMessageId(),
        role: "user",
        kind: "text",
        text,
      };

      audio.playSend();
      state.messages.push(message);
      persist();
      appendMessage(message, true);
    }

    function addBotItem(item: BotSequenceItem) {
      let message: ChatMessage;

      if (item.kind === "text") {
        message = {
          id: createMessageId(),
          role: "bot",
          kind: "text",
          text: item.text,
        };
      } else if (item.kind === "program_card") {
        message = {
          id: createMessageId(),
          role: "bot",
          kind: "program_card",
          programKey: item.programKey,
        };
      } else {
        message = {
          id: createMessageId(),
          role: "bot",
          kind: "info_table",
          variant: item.variant,
          title: item.title,
          subtitle: item.subtitle,
          rows: item.rows,
          footer: item.footer,
        };
      }

      state.messages.push(message);
      persist();
      audio.playReceive();
      appendMessage(message);
    }

    async function sendBotSequence(
      items: BotSequenceItem[],
      replyMode: ReplyMode = "none"
    ) {
      const token = ++queueToken;
      setReplyMode("none");
      lockInteraction(true);

      await wait(FIRST_RESPONSE_PAUSE);

      for (
        let index = 0;
        index < items.length;
        index += 1
      ) {
        if (token !== queueToken) {
          lockInteraction(false);
          return;
        }

        isTyping = true;
        audio.startTyping();
        renderTyping();

        await wait(getTypingDelay(items[index]));

        if (token !== queueToken) {
          audio.stopTyping();
          isTyping = false;
          renderTyping();
          lockInteraction(false);
          return;
        }

        audio.stopTyping();
        isTyping = false;
        renderTyping();
        addBotItem(items[index]);

        if (index < items.length - 1) {
          await wait(getBetweenPause(items[index]));
        }
      }

      lockInteraction(false);
      setReplyMode(replyMode);
      safeInput.focus();
    }

    function selectProgram(programKey: ProgramKey) {
      if (
        state.selectedProgram &&
        state.selectedProgram !== programKey
      ) {
        state.previousProgram = state.selectedProgram;
      }

      state.selectedProgram = programKey;
      persist();
    }

    function programNeeded(intent: Intent) {
      state.currentIntent = intent;
      state.pendingQuestion = "choose_program";
      persist();

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `${friendlyName(
              state
            )}, ¿de qué programa deseas esa información?`,
          },
        ],
        "programs"
      );
    }

    function answerCosts(
      programKey: ProgramKey,
      detail: CostDetail
    ) {
      selectProgram(programKey);
      state.currentIntent = "costs";
      state.currentCostDetail = detail;
      state.pendingQuestion = "";
      persist();

      void sendBotSequence(
        costSequence(
          PROGRAMS[programKey],
          detail,
          state.visitorName
        ),
        "program_actions"
      );
    }

    function answerSchedules(
      programKey: ProgramKey,
      preference: SchedulePreference
    ) {
      selectProgram(programKey);
      state.currentIntent = "schedules";
      state.schedulePreference = preference;
      state.pendingQuestion = preference
        ? ""
        : "choose_schedule";
      persist();

      void sendBotSequence(
        scheduleSequence(
          PROGRAMS[programKey],
          preference,
          state.visitorName
        ),
        preference
          ? "program_actions"
          : "schedule_options"
      );
    }

    function answerInfo(programKey: ProgramKey) {
      selectProgram(programKey);
      state.currentIntent = "info";
      state.pendingQuestion = "";
      persist();

      void sendBotSequence(
        programInfoSequence(
          PROGRAMS[programKey],
          state.visitorName
        ),
        "program_actions"
      );
    }

    function answerBrochure(programKey: ProgramKey) {
      selectProgram(programKey);
      state.currentIntent = "brochure";
      state.pendingQuestion = "";
      persist();

      void sendBotSequence(
        brochureSequence(
          PROGRAMS[programKey],
          state.visitorName
        ),
        "program_actions"
      );
    }

    function startEnrollment(programKey: ProgramKey) {
      selectProgram(programKey);
      state.currentIntent = "enrollment";
      state.pendingQuestion = "";
      persist();

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `¡Excelente, ${friendlyName(
              state
            )}! 🙌 Ya tenemos tu nombre, celular y programa de interés.`,
          },
          {
            kind: "text",
            text: `Un asesor podrá ayudarte a separar una vacante en ${PROGRAMS[programKey].label}. También puedes comunicarte ahora por WhatsApp o llamada.`,
          },
        ],
        "contact"
      );
    }

    function handleComparison(
      analysis: MessageAnalysis
    ) {
      let keys = analysis.programs;

      if (
        keys.length < 2 &&
        state.selectedProgram &&
        state.previousProgram
      ) {
        keys = [
          state.previousProgram,
          state.selectedProgram,
        ];
      }

      if (keys.length < 2) {
        keys = PROGRAM_KEYS.filter(
          (key) =>
            PROGRAMS[key].pricing.monthly !== null
        );
      }

      state.currentIntent = "compare";
      persist();

      void sendBotSequence(
        comparisonSequence(
          keys,
          analysis.costDetail,
          state.visitorName
        ),
        "main"
      );
    }

    function handleFaq(
      intent: Intent,
      programKey: ProgramKey | null
    ) {
      const faqIntent = intent as
        | "duration"
        | "requirements"
        | "location"
        | "modality"
        | "certification"
        | "start_date"
        | "frequency";

      state.currentIntent = intent;
      persist();

      void sendBotSequence(
        faqSequence(
          faqIntent,
          state.visitorName,
          programKey
            ? PROGRAMS[programKey]
            : undefined
        ),
        intent === "location"
          ? "contact"
          : programKey
            ? "program_actions"
            : "main"
      );
    }

    function resolveProgramForAnalysis(
      analysis: MessageAnalysis
    ) {
      return (
        analysis.programs[0] ??
        (state.selectedProgram || null)
      );
    }

    function handleAnalysis(
      analysis: MessageAnalysis
    ) {
      const detectedProgram =
        analysis.programs[0] ?? null;
      const programKey =
        resolveProgramForAnalysis(analysis);

      if (detectedProgram) {
        selectProgram(detectedProgram);
      }

      if (analysis.intent === "clarification") {
        void sendBotSequence(
          [
            {
              kind: "text",
              text: `Disculpa por no entenderte bien, ${friendlyName(
                state
              )} 🙏`,
            },
            {
              kind: "text",
              text: "Cuéntame nuevamente qué deseas saber. Puedes preguntarme por costos, horarios, inicio, duración, requisitos, PDF o inscripción.",
            },
          ],
          "main"
        );
        return;
      }

      if (analysis.intent === "compare") {
        handleComparison(analysis);
        return;
      }

      if (analysis.intent === "recommendation") {
        state.currentIntent = "info";
        persist();

        void sendBotSequence(
          [
            {
              kind: "text",
              text: `${friendlyName(
                state
              )}, te ayudo a elegir 😊 ¿Qué te atrae más?`,
            },
          ],
          "recommendation"
        );
        return;
      }

      if (analysis.intent === "greeting") {
        void sendBotSequence(
          [
            {
              kind: "text",
              text: `¡Hola de nuevo, ${friendlyName(
                state
              )}! 😊 ¿Qué deseas consultar?`,
            },
          ],
          "main"
        );
        return;
      }

      if (analysis.intent === "programs") {
        state.currentIntent = "info";
        state.pendingQuestion = "choose_program";
        persist();

        void sendBotSequence(
          [
            {
              kind: "text",
              text: `Claro, ${friendlyName(
                state
              )} 😊 Estas son nuestras carreras y programas de estudio:`,
            },
          ],
          "programs"
        );
        return;
      }

      if (analysis.intent === "costs") {
        if (!programKey) {
          state.currentCostDetail =
            analysis.costDetail;
          programNeeded("costs");
          return;
        }

        answerCosts(
          programKey,
          analysis.costDetail
        );
        return;
      }

      if (analysis.intent === "schedules") {
        if (!programKey) {
          state.schedulePreference =
            analysis.schedulePreference;
          programNeeded("schedules");
          return;
        }

        answerSchedules(
          programKey,
          analysis.schedulePreference
        );
        return;
      }

      if (analysis.intent === "brochure") {
        if (!programKey) {
          programNeeded("brochure");
          return;
        }

        answerBrochure(programKey);
        return;
      }

      if (analysis.intent === "enrollment") {
        if (!programKey) {
          programNeeded("enrollment");
          return;
        }

        startEnrollment(programKey);
        return;
      }

      if (analysis.intent === "info") {
        if (!programKey) {
          programNeeded("info");
          return;
        }

        answerInfo(programKey);
        return;
      }

      if (
        analysis.intent === "duration" ||
        analysis.intent === "requirements" ||
        analysis.intent === "location" ||
        analysis.intent === "modality" ||
        analysis.intent === "certification" ||
        analysis.intent === "start_date" ||
        analysis.intent === "frequency"
      ) {
        handleFaq(analysis.intent, programKey);
        return;
      }

      if (analysis.intent === "advisor") {
        state.currentIntent = "advisor";
        persist();

        void sendBotSequence(
          [
            {
              kind: "text",
              text: `${friendlyName(
                state
              )}, nuestro número es ${SALES_PHONE_DISPLAY} 📲`,
            },
            {
              kind: "text",
              text: "Puedes llamar o continuar por WhatsApp con el resumen de lo que estabas consultando.",
            },
          ],
          "contact"
        );
        return;
      }

      if (analysis.intent === "thanks") {
        void sendBotSequence(
          [
            {
              kind: "text",
              text: `¡Con gusto, ${friendlyName(
                state
              )}! 😊 ¿Qué más deseas revisar?`,
            },
          ],
          "main"
        );
        return;
      }

      if (analysis.intent === "farewell") {
        void sendBotSequence([
          {
            kind: "text",
            text: `¡Hasta pronto, ${friendlyName(
              state
            )}! 👋`,
          },
        ]);
        return;
      }

      if (detectedProgram) {
        switch (state.currentIntent) {
          case "costs":
            answerCosts(
              detectedProgram,
              state.currentCostDetail
            );
            return;

          case "schedules":
            answerSchedules(
              detectedProgram,
              state.schedulePreference
            );
            return;

          case "brochure":
            answerBrochure(detectedProgram);
            return;

          case "enrollment":
            startEnrollment(detectedProgram);
            return;

          default:
            answerInfo(detectedProgram);
            return;
        }
      }

      if (
        analysis.intent === "unknown" &&
        analysis.suggestedIntent !== "unknown" &&
        analysis.confidence >= 0.45
      ) {
        const labels: Partial<
          Record<Intent, string>
        > = {
          costs: "los costos",
          schedules: "los horarios",
          enrollment: "la inscripción",
          brochure: "el brochure PDF",
          info: "información del programa",
        };

        const label =
          labels[analysis.suggestedIntent];

        if (label) {
          void sendBotSequence(
            [
              {
                kind: "text",
                text: `¿Te refieres a ${label}? Puedes tocar una opción o escribirlo nuevamente 😊`,
              },
            ],
            "main"
          );
          return;
        }
      }

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `Disculpa, ${friendlyName(
              state
            )}, no entendí bien esa pregunta 🙏`,
          },
          {
            kind: "text",
            text: "¿Qué deseas saber? Escríbelo de otra forma y lo analizaré nuevamente.",
          },
        ],
        "main"
      );
    }

    function greetingForNameStep(value: string) {
      const normalized = normalizeText(value);

      if (textHasTerm(normalized, "buenos dias")) {
        return "¡Buenos días! 😊";
      }

      if (
        textHasTerm(normalized, "buenas tardes")
      ) {
        return "¡Buenas tardes! 😊";
      }

      if (
        textHasTerm(normalized, "buenas noches")
      ) {
        return "¡Buenas noches! 😊";
      }

      return "¡Hola! 😊";
    }

    function formatVisitorName(value: string) {
      return value
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((word) => {
          if (!word) return word;

          return (
            word
              .charAt(0)
              .toLocaleUpperCase("es-PE") +
            word
              .slice(1)
              .toLocaleLowerCase("es-PE")
          );
        })
        .join(" ");
    }

    function isValidVisitorName(value: string) {
      const name = value.trim();
      const normalized = normalizeText(name);
      const words = name
        .split(/\s+/)
        .filter(Boolean);

      if (
        /\d/.test(name) ||
        name.length < 2 ||
        name.length > 60 ||
        words.length < 1 ||
        words.length > 4
      ) {
        return false;
      }

      const validWordPattern =
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'-]+$/u;

      if (
        !words.every((word) =>
          validWordPattern.test(word)
        )
      ) {
        return false;
      }

      const blockedFirstWords = new Set([
        "hola",
        "ola",
        "holaa",
        "holi",
        "buenas",
        "buenos",
        "buen",
        "quiero",
        "deseo",
        "necesito",
        "busco",
        "soy",
        "me",
        "mi",
        "un",
        "una",
        "el",
        "la",
        "de",
        "del",
        "interesado",
        "interesada",
        "estudiante",
        "cliente",
      ]);

      const firstWord = normalizeText(
        words[0] ?? ""
      );

      if (blockedFirstWords.has(firstWord)) {
        return false;
      }

      const nonNameTerms = [
        "informacion",
        "costos",
        "precio",
        "horarios",
        "matricula",
        "inscripcion",
        "carrera",
        "programa",
        "estudiar",
        "gastronomia",
        "pasteleria",
        "barismo",
        "sommelier",
        "cocina",
        "bar profesional",
      ];

      if (
        nonNameTerms.some((term) =>
          textHasTerm(normalized, term)
        )
      ) {
        return false;
      }

      const candidateAnalysis =
        analyzeMessage(name);

      return (
        candidateAnalysis.programs.length === 0 &&
        (candidateAnalysis.intent === "unknown" ||
          candidateAnalysis.intent === "greeting")
      );
    }

    function removeLeadingGreeting(
      tokens: string[]
    ) {
      const normalizedTokens = tokens.map(
        (token) => normalizeText(token)
      );

      const greetingSequences = [
        ["buenos", "dias"],
        ["buenas", "tardes"],
        ["buenas", "noches"],
        ["buen", "dia"],
        ["hola"],
        ["ola"],
        ["holaa"],
        ["holi"],
        ["buenas"],
      ];

      for (const sequence of greetingSequences) {
        const matches = sequence.every(
          (word, index) =>
            normalizedTokens[index] === word
        );

        if (matches) {
          return tokens.slice(sequence.length);
        }
      }

      return tokens;
    }

    function extractVisitorIdentity(value: string) {
      const cleaned = value
        .trim()
        .replace(/[¡!¿?,.;:]+/g, " ")
        .replace(/\s+/g, " ");

      const tokens = cleaned
        .split(" ")
        .filter(Boolean);

      const normalizedTokens = tokens.map(
        (token) => normalizeText(token)
      );

      const markers = [
        ["mi", "nombre", "es"],
        ["me", "llamo"],
        ["puedes", "llamarme"],
        ["llamame"],
        ["mi", "nombre"],
        ["soy"],
      ];

      const stopWords = new Set([
        "y",
        "e",
        "pero",
        "aunque",
        "porque",
        "quiero",
        "deseo",
        "necesito",
        "busco",
        "quisiera",
        "sobre",
        "para",
        "consultar",
        "saber",
        "informacion",
        "costos",
        "precio",
        "horarios",
        "matricula",
        "inscripcion",
        "carrera",
        "programa",
      ]);

      for (
        let tokenIndex = 0;
        tokenIndex < tokens.length;
        tokenIndex += 1
      ) {
        for (const marker of markers) {
          const matches = marker.every(
            (word, markerIndex) =>
              normalizedTokens[
                tokenIndex + markerIndex
              ] === word
          );

          if (!matches) continue;

          const candidateTokens: string[] = [];
          let cursor =
            tokenIndex + marker.length;

          while (
            cursor < tokens.length &&
            candidateTokens.length < 4
          ) {
            const normalizedToken =
              normalizedTokens[cursor] ?? "";

            if (
              stopWords.has(normalizedToken) ||
              !/^[a-zñáéíóúü'-]+$/i.test(
                tokens[cursor] ?? ""
              )
            ) {
              break;
            }

            candidateTokens.push(
              tokens[cursor] ?? ""
            );
            cursor += 1;
          }

          const candidate = formatVisitorName(
            candidateTokens.join(" ")
          );

          if (!isValidVisitorName(candidate)) {
            continue;
          }

          const remainderTokens =
            tokens.slice(cursor);

          while (
            remainderTokens.length > 0 &&
            ["y", "e", "pero", "ademas"].includes(
              normalizeText(
                remainderTokens[0] ?? ""
              )
            )
          ) {
            remainderTokens.shift();
          }

          return {
            name: candidate,
            remainingMessage: remainderTokens
              .join(" ")
              .trim(),
          };
        }
      }

      const withoutGreeting =
        removeLeadingGreeting(tokens);

      const standaloneCandidate =
        formatVisitorName(
          withoutGreeting.join(" ")
        );

      if (
        isValidVisitorName(
          standaloneCandidate
        )
      ) {
        return {
          name: standaloneCandidate,
          remainingMessage: "",
        };
      }

      return null;
    }

    function handleVisitorName(value: string) {
      const analysis = analyzeMessage(value);
      const extractedIdentity =
        extractVisitorIdentity(value);

      if (!extractedIdentity) {
        const normalized = normalizeText(value);
        const greetingRemainder = normalized
          .replace(
            /\b(buenos dias|buenas tardes|buenas noches|buen dia|holaa|holi|hola|ola|buenas)\b/g,
            ""
          )
          .trim();

        const isPureGreeting =
          analysis.intent === "greeting" &&
          greetingRemainder.length === 0;

        if (isPureGreeting) {
          void sendBotSequence([
            {
              kind: "text",
              text: greetingForNameStep(value),
            },
            {
              kind: "text",
              text: "Antes de conversar, ¿cómo te llamas? 😊",
            },
          ]);
          return;
        }

        if (
          analysis.intent !== "unknown" ||
          analysis.programs.length > 0
        ) {
          state.deferredUserMessage = value;
          persist();

          void sendBotSequence([
            {
              kind: "text",
              text: "Con gusto te ayudo con eso 😊",
            },
            {
              kind: "text",
              text: "Antes de continuar, ¿cómo te llamas?",
            },
          ]);
          return;
        }

        void sendBotSequence([
          {
            kind: "text",
            text: "Disculpa, no alcancé a identificar tu nombre 😅 Puedes responder, por ejemplo: “Soy Javier” o “Mi nombre es María”.",
          },
        ]);
        return;
      }

      state.visitorName =
        extractedIdentity.name;
      state.leadStep = "ask_phone";

      const pendingQuestion =
        extractedIdentity.remainingMessage ||
        state.deferredUserMessage;

      state.deferredUserMessage =
        pendingQuestion;
      persist();
      updateHeader();
      updatePlaceholder();

      void sendBotSequence([
        {
          kind: "text",
          text: `¡Mucho gusto, ${friendlyName(
            state
          )}! 😊`,
        },
        {
          kind: "text",
          text: "Ahora escribe tu número de celular para poder contactarte.",
        },
      ]);
    }

    function handleInitialPhone(value: string) {
      if (!isValidPhone(value)) {
        const analysis = analyzeMessage(value);

        if (
          analysis.intent !== "unknown" ||
          analysis.programs.length > 0
        ) {
          state.deferredUserMessage =
            state.deferredUserMessage || value;
          persist();

          void sendBotSequence([
            {
              kind: "text",
              text: "Guardé tu consulta 😊 Primero necesito tu número de celular.",
            },
            {
              kind: "text",
              text: "Debe tener entre 9 y 12 números.",
            },
          ]);
          return;
        }

        void sendBotSequence([
          {
            kind: "text",
            text: "El celular debe tener entre 9 y 12 números. Inténtalo nuevamente 😊",
          },
        ]);
        return;
      }

      state.phone = normalizePhone(value);
      state.leadStep = "ask_program";
      state.pendingQuestion = "choose_program";
      persist();
      updatePlaceholder();

      void sendBotSequence(
        [
          {
            kind: "text",
            text: `Gracias, ${friendlyName(
              state
            )} 🙌 ¿Qué programa deseas estudiar?`,
          },
        ],
        "programs"
      );
    }

    async function completeInitialLead(
      programKey: ProgramKey
    ) {
      if (state.leadStatus === "sent") {
        selectProgram(programKey);
        state.leadStep = "completed";
        state.pendingQuestion = "";
        persist();

        void sendBotSequence(
          [
            {
              kind: "text",
              text: `Perfecto 😊 Continuemos con ${PROGRAMS[programKey].label}.`,
            },
          ],
          "program_actions"
        );
        return;
      }

      selectProgram(programKey);
      state.leadStep = "completed";
      state.pendingQuestion = "";
      state.leadStatus = "sending";
      state.leadError = "";
      persist();
      updatePlaceholder();
      updateHeader();
      setReplyMode("none");
      lockInteraction(true);

      try {
        await sendLeadToSales(state);
        state.leadStatus = "sent";
        state.leadError = "";
      } catch (error) {
        state.leadStatus = "error";
        state.leadError =
          error instanceof Error
            ? error.message
            : "Error desconocido";
      }

      persist();
      updateHeader();
      lockInteraction(false);

      const deferred =
        state.deferredUserMessage.trim();
      state.deferredUserMessage = "";
      persist();

      if (state.leadStatus === "sent") {
        await sendBotSequence(
          [
            {
              kind: "text",
              text: `¡Gracias, ${friendlyName(
                state
              )}! ✅ Registré tu interés en ${PROGRAMS[programKey].label}.`,
            },
            {
              kind: "text",
              text: deferred
                ? "Ahora sí, responderé la consulta que me dejaste."
                : "Ahora puedes preguntarme por costos, horarios, duración, requisitos, inscripción o el PDF.",
            },
          ],
          deferred
            ? "none"
            : "program_actions"
        );
      } else {
        await sendBotSequence(
          [
            {
              kind: "text",
              text: "No pude enviar tus datos al correo automáticamente en este momento.",
            },
            {
              kind: "text",
              text: "Puedes seguir usando el chat normalmente o comunicarte por WhatsApp.",
            },
          ],
          deferred ? "none" : "contact"
        );
      }

      if (deferred) {
        handleAnalysis(
          analyzeMessage(deferred)
        );
      }
    }

    function handleUserMessage(rawValue: string) {
      const value = rawValue.trim();
      if (!value || locked) return;

      queueToken += 1;
      audio.stopTyping();
      isTyping = false;
      renderTyping();

      addUserMessage(value);
      safeInput.value = "";

      if (
        state.leadStep ===
        "ask_visitor_name"
      ) {
        handleVisitorName(value);
        return;
      }

      if (state.leadStep === "ask_phone") {
        handleInitialPhone(value);
        return;
      }

      if (state.leadStep === "ask_program") {
        const analysis = analyzeMessage(value);
        const programKey =
          analysis.programs[0];

        if (programKey) {
          void completeInitialLead(programKey);
          return;
        }

        state.deferredUserMessage =
          state.deferredUserMessage || value;
        persist();

        void sendBotSequence(
          [
            {
              kind: "text",
              text: "Primero elige el programa que te interesa 😊",
            },
          ],
          "programs"
        );
        return;
      }

      handleAnalysis(analyzeMessage(value));
    }

    function bindReplyEvents() {
      const buttons = Array.from(
        safeRepliesHost.querySelectorAll<HTMLButtonElement>(
          "[data-reply-type]"
        )
      );

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          if (locked) return;

          const type =
            button.dataset.replyType ?? "";
          const value =
            button.dataset.replyValue ?? "";

          if (type === "program") {
            const programKey =
              value as ProgramKey;

            addUserMessage(
              PROGRAMS[programKey].label
            );

            if (
              state.leadStep === "ask_program"
            ) {
              void completeInitialLead(
                programKey
              );
              return;
            }

            switch (state.currentIntent) {
              case "costs":
                answerCosts(
                  programKey,
                  state.currentCostDetail
                );
                break;

              case "schedules":
                answerSchedules(
                  programKey,
                  state.schedulePreference
                );
                break;

              case "brochure":
                answerBrochure(programKey);
                break;

              case "enrollment":
                startEnrollment(programKey);
                break;

              default:
                answerInfo(programKey);
            }

            return;
          }

          if (type === "intent") {
            addUserMessage(
              button.textContent?.trim() ??
                value
            );

            const intentQueries: Record<
              string,
              string
            > = {
              programs: "ver programas",
              costs: "consultar costos",
              schedules: "consultar horarios",
              brochure: "ver brochure pdf",
              enrollment:
                "quiero inscribirme",
            };

            handleAnalysis(
              analyzeMessage(
                intentQueries[value] ?? value
              )
            );
            return;
          }

          if (
            type === "schedule" &&
            state.selectedProgram
          ) {
            const preference =
              value as SchedulePreference;

            addUserMessage(
              button.textContent?.trim() ??
                value
            );

            answerSchedules(
              state.selectedProgram,
              preference
            );
            return;
          }

          if (type === "recommend") {
            const programKey =
              value as ProgramKey;

            addUserMessage(
              button.textContent?.trim() ??
                PROGRAMS[programKey].label
            );

            answerInfo(programKey);
          }
        });
      });
    }

    function openAssistant() {
      windowEl.classList.add("is-open");
      safeToggleButton.setAttribute(
        "aria-expanded",
        "true"
      );
      safePanel.setAttribute(
        "aria-hidden",
        "false"
      );
      stopBubbleRotation();

      if (
        !state.hasWelcomed &&
        !state.messages.length
      ) {
        state.hasWelcomed = true;
        state.leadStep =
          "ask_visitor_name";
        persist();
        updatePlaceholder();

        void sendBotSequence([
          {
            kind: "text",
            text: "¡Hola! 👋 Soy Cookito, tu asistente de Cooking Gourmet.",
          },
          {
            kind: "text",
            text: "Antes de comenzar, ¿cómo te llamas? 😊",
          },
        ]);
        return;
      }

      if (
        pageProgram &&
        !state.selectedProgram &&
        state.leadStep === "completed"
      ) {
        selectProgram(pageProgram);
      }

      window.setTimeout(
        () => safeInput.focus(),
        100
      );
    }

    function closeAssistant() {
      windowEl.classList.remove("is-open");
      safeToggleButton.setAttribute(
        "aria-expanded",
        "false"
      );
      safePanel.setAttribute(
        "aria-hidden",
        "true"
      );

      queueToken += 1;
      audio.stopTyping();
      isTyping = false;
      renderTyping();
      lockInteraction(false);
      startBubbleRotation();
    }

    function toggleAssistant() {
      if (
        windowEl.classList.contains(
          "is-open"
        )
      ) {
        closeAssistant();
      } else {
        openAssistant();
      }
    }

    function updateBubble() {
      const index =
        Math.floor(Date.now() / 3400) %
        BUBBLE_MESSAGES.length;

      safeBubble.textContent =
        BUBBLE_MESSAGES[index];
    }

    function startBubbleRotation() {
      if (bubbleTimer !== null) return;

      updateBubble();
      bubbleTimer =
        window.setInterval(
          updateBubble,
          3400
        );
    }

    function stopBubbleRotation() {
      if (bubbleTimer !== null) {
        window.clearInterval(bubbleTimer);
        bubbleTimer = null;
      }
    }

    safeToggleButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        audio.unlock();
        toggleAssistant();
      }
    );

    safeCloseButton.addEventListener(
      "click",
      closeAssistant
    );

    safeMuteButton.addEventListener(
      "click",
      () => {
        state.muted = !state.muted;
        audio.setMuted(state.muted);
        persist();
        updateHeader();
      }
    );

    safeSendButton.addEventListener(
      "click",
      () => {
        audio.unlock();
        handleUserMessage(
          safeInput.value
        );
      }
    );

    safeInput.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          audio.unlock();
          handleUserMessage(
            safeInput.value
          );
        }

        if (event.key === "Escape") {
          closeAssistant();
        }
      }
    );

    safeChat.addEventListener(
      "wheel",
      () => {
        autoFollow = false;
        stopScroll();
        updateScrollButton();
      },
      { passive: true }
    );

    safeChat.addEventListener(
      "touchstart",
      () => {
        autoFollow = false;
        stopScroll();
        updateScrollButton();
      },
      { passive: true }
    );

    safeChat.addEventListener(
      "scroll",
      () => {
        if (isNearBottom()) {
          autoFollow = true;
        }

        updateScrollButton();
      },
      { passive: true }
    );

    safeScrollBottomButton.addEventListener(
      "click",
      () => scrollToBottom()
    );

    document.addEventListener(
      "pointerdown",
      (event) => {
        const target =
          event.target as Node | null;

        if (
          target &&
          !windowEl.contains(target)
        ) {
          closeAssistant();
        }
      }
    );

    renderStoredMessages();
    renderTyping();
    renderReplies();
    updateHeader();
    updatePlaceholder();
    startBubbleRotation();
  });
}
