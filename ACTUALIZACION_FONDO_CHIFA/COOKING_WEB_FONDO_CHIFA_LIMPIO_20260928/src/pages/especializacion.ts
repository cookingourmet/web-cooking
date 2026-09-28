import { deliverLead, LeadDeliveryError } from "../utils/lead-delivery";
import { pageLocation, readAttribution, trackEvent } from "../utils/analytics";
import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderFooter } from "../components/layout/footer/footer";

const WHATSAPP_NUMBER = "51981377382";
const LEAD_ENDPOINT = "/api/specialization-lead";

const SPECIALIZATION = {
  "name": "Especialización en Cocina Chifa",
  "instructor": "Docentes altamente capacitados",
  "location": "Modalidad presencial",
  "city": "Huancayo, Junín",
  "chefImage": "/images/especializacion/cocina-chifa.png",
  "chefMobileImage": "/images/especializacion/cocina-chifa-mobile.png",
  "startDate": "5 de octubre",
  "duration": "10 sesiones de 3 horas",
  "schedule": "del 5 al 16 de octubre · 2:00 p.m. a 5:00 p.m.",
  "investment": "S/ 1,600.00",
  "certificate": "Certificado al culminar · costo adicional aproximado S/ 50.00",
  "topics": [
    "Arroces orientales",
    "Pollo oriental I",
    "Pollo oriental II",
    "Wantanes y especialidades",
    "Sopas orientales",
    "Técnicas de relleno y glaseado",
    "Cerdo oriental",
    "Dim Sum",
    "Especialidades y tallarines",
    "Cocina Taypa"
  ],
  "topicDescriptions": [
    "Arroz chaufa y aeropuerto oriental de fusión.",
    "Pollo crocante Chi Jau Kay con glaseado oriental y pollo Tipakay con glaseado agridulce.",
    "Pollo Limón Kay, cítricos y perfume de jengibre; chaufa nipón.",
    "Kam Lu Wantán y cerdo Cruyok con piña caramelizada y especias orientales.",
    "Consomé oriental de wantanes y consomé de tradición cantonesa Fuchifu.",
    "Alitas rellenas en salsa limón y enrollado de pollo.",
    "Cerdo glaseado con durazno caramelizado y salsa oriental; cerdo al wok con verduras y sésamo.",
    "Siu Mai y Min Pao.",
    "Piernitas Funkin Chonlon y tallarín saltado.",
    "Tallarín Taypa y Taypa plancha."
  ]
};


const CHIFA_THEME_STYLES = `
  <style data-chifa-theme>
    .specialization-page {
      --chifa-red: #ff0046;
      --chifa-red-dark: #c90038;
      --chifa-black: #050505;
      --chifa-panel: #101010;
      --chifa-panel-soft: #171717;
      --chifa-border: rgba(255, 255, 255, 0.14);
      --chifa-text-soft: #cfcfcf;
      background: var(--chifa-black);
      color: #ffffff;
    }

    .specialization-page main {
      background: var(--chifa-black);
    }

    .specialization-page .specialization-hero {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #050505 0%, #0b0b0b 100%);
      border-bottom: 1px solid rgba(255, 0, 70, 0.28);
    }

    .specialization-page .specialization-hero::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 5px;
      background: linear-gradient(90deg, transparent, var(--chifa-red), transparent);
      opacity: 0.9;
      pointer-events: none;
    }

    .specialization-page .specialization-hero__title,
    .specialization-page .specialization-heading h2,
    .specialization-page .specialization-method h2,
    .specialization-page .specialization-final-cta h2,
    .specialization-page .specialization-topic-card h3,
    .specialization-page .specialization-audience-card h3 {
      color: #ffffff;
    }

    .specialization-page .specialization-hero__title span {
      color: var(--chifa-red);
    }

    .specialization-page .specialization-eyebrow,
    .specialization-page .specialization-tag {
      color: #ffffff;
      background: var(--chifa-red);
      border-color: var(--chifa-red);
      box-shadow: 0 10px 30px rgba(255, 0, 70, 0.18);
    }

    .specialization-page .specialization-hero__topics span {
      color: #f1f1f1;
      background: rgba(255, 255, 255, 0.055);
      border-color: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(8px);
    }

    .specialization-page .specialization-hero__topics strong {
      color: var(--chifa-red);
    }

    .specialization-page .specialization-hero__info span {
      color: #a9a9a9;
    }

    .specialization-page .specialization-hero__info strong {
      color: #ffffff;
    }

    .specialization-page .specialization-form-card {
      background: rgba(12, 12, 12, 0.96);
      border: 1px solid rgba(255, 0, 70, 0.45);
      box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55);
    }

    .specialization-page .specialization-form-card__header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    }

    .specialization-page .specialization-form-card__header span,
    .specialization-page .specialization-field > span {
      color: #bdbdbd;
    }

    .specialization-page .specialization-form-card__header h2 {
      color: #ffffff;
    }

    .specialization-page .specialization-field input,
    .specialization-page .specialization-field textarea {
      color: #ffffff;
      background: #181818;
      border-color: rgba(255, 255, 255, 0.16);
    }

    .specialization-page .specialization-field input::placeholder,
    .specialization-page .specialization-field textarea::placeholder {
      color: #7f7f7f;
    }

    .specialization-page .specialization-field input:focus,
    .specialization-page .specialization-field textarea:focus {
      border-color: var(--chifa-red);
      box-shadow: 0 0 0 3px rgba(255, 0, 70, 0.13);
      outline: none;
    }

    .specialization-page .specialization-btn--primary,
    .specialization-page .specialization-btn--primary-red,
    .specialization-page .specialization-btn--form {
      color: #ffffff;
      background: linear-gradient(135deg, var(--chifa-red), var(--chifa-red-dark));
      border-color: var(--chifa-red);
      box-shadow: 0 14px 34px rgba(255, 0, 70, 0.24);
    }

    .specialization-page .specialization-btn--primary:hover,
    .specialization-page .specialization-btn--primary-red:hover,
    .specialization-page .specialization-btn--form:hover {
      transform: translateY(-2px);
      filter: brightness(1.06);
    }

    .specialization-page .specialization-btn--outline {
      color: #ffffff;
      background: transparent;
      border-color: rgba(255, 255, 255, 0.55);
    }

    .specialization-page .specialization-btn--outline:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      border-color: #ffffff;
    }

    .specialization-page .specialization-section--white,
    .specialization-page .specialization-section--soft {
      background: #090909;
    }

    .specialization-page .specialization-section--dark {
      background:
        linear-gradient(135deg, rgba(255, 0, 70, 0.11), transparent 36%),
        #030303;
      border-top: 1px solid rgba(255, 0, 70, 0.22);
      border-bottom: 1px solid rgba(255, 0, 70, 0.22);
    }

    .specialization-page .specialization-section--cta {
      background: #050505;
    }

    .specialization-page .specialization-heading p,
    .specialization-page .specialization-method p,
    .specialization-page .specialization-topic-card p,
    .specialization-page .specialization-audience-card p,
    .specialization-page .specialization-final-cta p {
      color: var(--chifa-text-soft);
    }

    .specialization-page .specialization-topic-card,
    .specialization-page .specialization-audience-card {
      background: linear-gradient(180deg, #151515 0%, #0d0d0d 100%);
      border: 1px solid var(--chifa-border);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.26);
    }

    .specialization-page .specialization-topic-card:hover,
    .specialization-page .specialization-audience-card:hover {
      border-color: rgba(255, 0, 70, 0.58);
      box-shadow: 0 22px 56px rgba(0, 0, 0, 0.38);
    }

    .specialization-page .specialization-topic-card__number {
      color: var(--chifa-red);
      border-color: rgba(255, 0, 70, 0.36);
      background: rgba(255, 0, 70, 0.08);
    }

    .specialization-page .specialization-method__list article {
      background: rgba(255, 255, 255, 0.045);
      border-color: rgba(255, 255, 255, 0.11);
    }

    .specialization-page .specialization-method__list strong {
      color: var(--chifa-red);
    }

    .specialization-page .specialization-method__list span {
      color: #efefef;
    }

    .specialization-page .specialization-final-cta {
      background:
        radial-gradient(circle at 92% 12%, rgba(255, 0, 70, 0.20), transparent 32%),
        linear-gradient(135deg, #111111, #070707);
      border: 1px solid rgba(255, 0, 70, 0.34);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.35);
    }

    .specialization-page .specialization-form__status.is-success {
      color: #78e2a4;
    }

    .specialization-page .specialization-form__status.is-error {
      color: #ff7b91;
    }

    .specialization-page .specialization-form__status.is-info {
      color: #d9d9d9;
    }

    .specialization-page .specialization-form-card.is-alerting {
      animation: chifaFormAlert 0.72s ease-in-out 2;
    }

    @keyframes chifaFormAlert {
      0%, 100% { box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55); }
      50% { box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55), 0 0 0 4px rgba(255, 0, 70, 0.32); }
    }

    @media (max-width: 820px) {
      .specialization-page .specialization-hero {
        background: linear-gradient(180deg, #050505 0%, #0b0b0b 100%);
      }

      .specialization-page .specialization-form-card {
        background: #0d0d0d;
      }
    }
  </style>
`;

type SpecializationLeadPayload = {
  program: string;
  source: string;
  fullName: string;
  phone: string;
  email: string;
  dni: string;
  message: string;
  topics: string[];
  instructor: string;
  pageUrl: string;
  createdAt: string;
};

function buildWhatsAppUrl() {
  const message = [
    "Hola, vengo de la página web de Cooking Gourmet.",
    "Quiero información sobre la Especialización en Cocina Chifa.",
    "Deseo inscribirme al curso presencial que inicia el 5 de octubre.",
    "Quiero confirmar las 10 sesiones, el horario de 2:00 p.m. a 5:00 p.m., la inversión de S/ 1,600.00 y el certificado.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function isValidEmail(value: string) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendSpecializationLeadToSales(
  payload: SpecializationLeadPayload
) {
  if (!payload.fullName || !payload.phone) {
    throw new Error("Completa tu nombre y celular.");
  }

  if (!isValidEmail(payload.email)) {
    throw new Error("Ingresa un correo válido.");
  }

  await deliverLead(LEAD_ENDPOINT, {
    submissionId: crypto.randomUUID(),
    ...payload,
    ...readAttribution(),
  });
}
function renderTopicCards() {
  return SPECIALIZATION.topics
    .map(
      (topic, index) => `
        <article class="specialization-topic-card reveal-up">
          <span class="specialization-topic-card__number">
            ${String(index + 1).padStart(2, "0")}
          </span>
          <h3>${topic}</h3>
          <p>${SPECIALIZATION.topicDescriptions[index]}</p>
        </article>
      `
    )
    .join("");
}

function renderSpecializationHero() {
  return `
    <section class="specialization-hero">

      <div class="container specialization-hero__container">
        <div class="specialization-hero__chef">
          <picture>
            <source
              media="(max-width: 820px)"
              srcset="${SPECIALIZATION.chefMobileImage}"
            />

            <img
              src="${SPECIALIZATION.chefImage}"
              alt="Especialización presencial en Cocina Chifa de Cooking Gourmet"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div class="specialization-hero__content">

          <h1 class="specialization-hero__title">
            Cocina Chifa
            <span>Sabor y técnica oriental.</span>
          </h1>

          <span class="specialization-eyebrow specialization-eyebrow--below">
            Especialización · 100% presencial
          </span>

          <div class="specialization-hero__topics" aria-label="Temas de la especialización">
            ${["Wok, salteados y arroces", "Pollo, cerdo y glaseados", "Wantanes, sopas y Dim Sum", "Tallarines y cocina Taypa", "10 sesiones · Insumos incluidos", "Inicio 5 de octubre · S/ 1,600"]
              .map(
                (topic) => `
                  <span>
                    <strong>●</strong>
                    ${topic}
                  </span>
                `
              )
              .join("")}
          </div>

          <div class="specialization-hero__actions">
            <button
                class="specialization-btn specialization-btn--primary"
                type="button"
                data-specialization-primary-action
            >
                Inscribirme ahora
            </button>
            </div>

          <div class="specialization-hero__info">
            <span>Formación práctica</span>
            <strong>${SPECIALIZATION.instructor}</strong>
          </div>
        </div>

        <aside class="specialization-form-card" id="specialization-form">
          <div class="specialization-form-card__header">
            <span>Solicita información</span>
            <h2>Déjanos tus datos</h2>
          </div>

          <form class="specialization-form" id="specializationLeadForm" novalidate>
            <input type="hidden" name="program" value="${SPECIALIZATION.name}" />
            <input type="hidden" name="source" value="Landing Cocina Chifa" />

            <label class="specialization-field">
              <span>Nombre completo</span>
              <input
                type="text"
                name="fullName"
                placeholder="Escribe tu nombre"
                autocomplete="name"
                required
              />
            </label>

            <label class="specialization-field">
              <span>Celular / WhatsApp</span>
              <input
                type="tel"
                name="phone"
                placeholder="Ej: 987654321"
                autocomplete="tel"
                inputmode="tel"
                required
              />
            </label>

            <label class="specialization-field">
              <span>Correo electrónico</span>
              <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                autocomplete="email"
              />
            </label>

            <label class="specialization-field">
              <span>DNI</span>
              <input
                type="text"
                name="dni"
                placeholder="Ej: 12345678"
                autocomplete="off"
                inputmode="numeric"
                maxlength="12"
              />
            </label>

            <label class="specialization-field">
              <span>Mensaje</span>
              <textarea
                name="message"
                rows="3"
                placeholder="Deseo información sobre la especialización en Cocina Chifa."
              ></textarea>
            </label>

            <button class="specialization-btn specialization-btn--form" type="submit">
              Enviar solicitud
            </button>

            <p class="specialization-form__status" id="specializationFormStatus" role="status"></p>
          </form>
        </aside>
      </div>
    </section>
  `;
}

function renderLearningSection() {
  return `
    <section class="specialization-section specialization-section--white">
      <div class="container">
        <div class="specialization-heading reveal-up">
          <span class="specialization-tag">Contenido práctico</span>
          <h2>Lo que aprenderás</h2>
          <p>
            Diez temas de cocina chifa y oriental: wok, frituras, glaseados,
            salsas, masas y preparaciones tradicionales.
          </p>
        </div>

        <div class="specialization-topics-grid">
          ${renderTopicCards()}
        </div>
      </div>
    </section>
  `;
}

function renderMethodSection() {
  return `
    <section class="specialization-section specialization-section--dark">
      <div class="container specialization-method">
        <div class="specialization-method__content reveal-up">
          <span class="specialization-tag specialization-tag--light">
            Metodología
          </span>

          <h2>Aprende cocinando, paso a paso</h2>

          <p>
            Desarrolla sabores auténticos y presentaciones profesionales con
            clases prácticas, insumos incluidos y docentes capacitados.
          </p>
        </div>

        <div class="specialization-method__list">
          <article class="reveal-up">
            <strong>01</strong>
            <span>10 sesiones presenciales de 3 horas. Insumos 100% incluidos.</span>
          </article>

          <article class="reveal-up">
            <strong>02</strong>
            <span>5 al 16 de octubre · 2:00 p.m. a 5:00 p.m.</span>
          </article>

          <article class="reveal-up">
            <strong>03</strong>
            <span>Inversión: S/ 1,600.00. Certificado adicional: aprox. S/ 50.00.</span>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderAudienceSection() {
  return `
    <section class="specialization-section specialization-section--soft">
      <div class="container">
        <div class="specialization-heading reveal-up">
          <span class="specialization-tag">Perfil recomendado</span>
          <h2>¿Para quién es?</h2>
          <p>
            Dirigido al público en general, amantes de la cocina,
            chefs y personal de servicios gastronómicos.
          </p>
        </div>

        <div class="specialization-audience-grid">
          <article class="specialization-audience-card reveal-up">
            <h3>Público en general</h3>
            <p>Aprende preparaciones chifa mediante clases prácticas.</p>
          </article>

          <article class="specialization-audience-card reveal-up">
            <h3>Amantes de la cocina</h3>
            <p>Amplía tu repertorio con sabores y técnicas de cocina oriental.</p>
          </article>

          <article class="specialization-audience-card reveal-up">
            <h3>Personal gastronómico</h3>
            <p>Perfecciona el manejo del wok, glaseados y presentación de platos.</p>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderLocationCta() {
  const whatsappUrl = buildWhatsAppUrl();

  return `
    <section class="specialization-section specialization-section--cta">
      <div class="container">
        <div class="specialization-final-cta reveal-up">
          <div>
            <span class="specialization-tag">Admisión</span>
            <h2>Solicita informes</h2>
            <p>
              Inscríbete a Cocina Chifa, en modalidad presencial. Inicia el
              ${SPECIALIZATION.startDate}, tiene ${SPECIALIZATION.duration}
              y se desarrollará ${SPECIALIZATION.schedule}.
              Inversión: ${SPECIALIZATION.investment}, con insumos incluidos.
              ${SPECIALIZATION.certificate}.
            </p>
          </div>

          <div class="specialization-final-cta__actions">
            <a
              class="specialization-btn specialization-btn--primary-red"
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>

            <a
              class="specialization-btn specialization-btn--outline"
              href="#specialization-form"
            >
              Completar formulario
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function setFormStatus(message: string, type: "success" | "error" | "info") {
  const status = document.getElementById("specializationFormStatus");
  if (!status) return;

  status.textContent = message;
  status.className = `specialization-form__status is-${type}`;
}

function isSpecializationMobile() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function getSpecializationFormCard() {
  return document.getElementById("specialization-form") as HTMLElement | null;
}

function scrollToSpecializationForm() {
  const formCard = getSpecializationFormCard();
  if (!formCard) return;

  const headerOffset = isSpecializationMobile() ? 82 : 110;
  const targetPosition =
    formCard.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior: "smooth",
  });
}

function focusSpecializationFirstInput() {
  const formCard = getSpecializationFormCard();
  if (!formCard) return;

  const firstInput = formCard.querySelector<HTMLInputElement>(
    'input[name="fullName"]'
  );

  window.setTimeout(() => {
    firstInput?.focus({ preventScroll: true });
  }, 420);
}

function triggerSpecializationFormAlert() {
  const formCard = getSpecializationFormCard();
  if (!formCard) return;

  formCard.classList.remove("is-alerting");

  // Reinicia la animación aunque el usuario presione varias veces.
  void formCard.offsetWidth;

  formCard.classList.add("is-alerting");
  setFormStatus("Completa el formulario para solicitar tu inscripción.", "info");
  focusSpecializationFirstInput();

  window.setTimeout(() => {
    formCard.classList.remove("is-alerting");
  }, 1500);
}

function initSpecializationPrimaryAction() {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    "[data-specialization-primary-action]"
  );

  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isSpecializationMobile()) {
        scrollToSpecializationForm();

        window.setTimeout(() => {
          triggerSpecializationFormAlert();
        }, 560);

        return;
      }

      triggerSpecializationFormAlert();
    });
  });
}

function initSpecializationForm() {
  const form = document.getElementById(
    "specializationLeadForm"
  ) as HTMLFormElement | null;

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    const formData = new FormData(form);

    const payload: SpecializationLeadPayload = {
      program: getFormValue(formData, "program"),
      source: getFormValue(formData, "source"),
      fullName: getFormValue(formData, "fullName"),
      phone: getFormValue(formData, "phone").replace(/\D/g, ""),
      email: getFormValue(formData, "email"),
      dni: getFormValue(formData, "dni"),
      message: getFormValue(formData, "message"),
      topics: SPECIALIZATION.topics,
      instructor: SPECIALIZATION.instructor,
      pageUrl: pageLocation(),
      createdAt: new Date().toISOString(),
    };

    if (!payload.fullName || !payload.phone) {
      setFormStatus("Completa tu nombre y celular.", "error");
      return;
    }

    if (payload.phone.length < 9 || payload.phone.length > 12) {
      setFormStatus("El celular debe tener entre 9 y 12 números.", "error");
      return;
    }

    if (!isValidEmail(payload.email)) {
      setFormStatus("Ingresa un correo válido.", "error");
      return;
    }

    try {
      submitButton?.setAttribute("disabled", "true");
      if (submitButton) submitButton.textContent = "Enviando...";
      setFormStatus("Enviando solicitud...", "info");
      trackEvent("lead_submit", { form_id: "specialization", lead_method: "form", cta_location: "specialization_form" });
      await sendSpecializationLeadToSales(payload);
      trackEvent("generate_lead", { form_id: "specialization", lead_method: "form", cta_location: "specialization_form" });

      form.reset();
      setFormStatus(
        "Solicitud enviada correctamente. Te contactaremos pronto.",
        "success"
      );
    } catch (error) {
      trackEvent("lead_error", { form_id: "specialization", lead_method: "form", cta_location: "specialization_form", error_code: error instanceof LeadDeliveryError ? error.code : "unknown_error" });
      setFormStatus(
        error instanceof Error
          ? error.message
          : "Ocurrió un error. Escríbenos por WhatsApp.",
        "error"
      );
    } finally {
      submitButton?.removeAttribute("disabled");
      if (submitButton) submitButton.textContent = "Enviar solicitud";
    }
  });
}

function initRevealEffects() {
  const elements = document.querySelectorAll<HTMLElement>(".reveal-up");

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

export function renderSpecializationPage() {
  return `
    <div class="site-shell specialization-page">
      ${CHIFA_THEME_STYLES}
      ${renderHeader()}

      <main>
        ${renderSpecializationHero()}
        ${renderLearningSection()}
        ${renderMethodSection()}
        ${renderAudienceSection()}
        ${renderLocationCta()}
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initSpecializationPage() {
  initHeader();
  initSpecializationForm();
  initSpecializationPrimaryAction();
  initRevealEffects();
}
