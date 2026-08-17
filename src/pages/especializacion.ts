import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderFooter } from "../components/layout/footer/footer";
import { initSpecializationSwirlBackground } from "../components/effects/swirlBackground";

const WHATSAPP_NUMBER = "51981377382";
const SALES_EMAIL = "j.ventas@cookingourmet.edu.pe";

const LEAD_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "c70db5c3-9654-4b15-b598-091a9ffa909a";

const SPECIALIZATION = {
  name: "Programa de Capacitación en Inocuidad Alimentaria",
  instructor: "Lic. Rene Valle",
  location: "Modalidad virtual",
  city: "Huancayo, Junín",
  chefImage: "/images/especializacion/chef.png",
  chefMobileImage: "/images/especializacion/chef-1.png",
  startDate: "26 de agosto",
  duration: "3 sesiones",
  schedule: "26, 27 y 28 de agosto · 8:00 p.m. a 10:00 p.m.",
  investment: "Gratuito",
  certificate: "Certificado al culminar · costo aproximado S/ 50.00",
  topics: [
    "Marco sanitario, cultura de inocuidad y PGH",
    "Peligros, higiene personal y prevención de contaminación cruzada",
    "Compras, recepción, almacenamiento y cadena de frío",
    "Preparación segura, cocción, conservación, servicio y alérgenos",
    "Programa de Higiene y Saneamiento: limpieza y desinfección",
    "Plagas, residuos, agua, químicos y mantenimiento higiénico",
  ],
};

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
    "Hola, vengo de la web de Cooking Gourmet.",
    "Quiero información sobre el Programa de Capacitación en Inocuidad Alimentaria.",
    "Deseo inscribirme al curso virtual gratuito que inicia el 26 de agosto.",
    "Quiero confirmar las 3 sesiones, horario, vacantes y el certificado.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function leadDate() {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date());
}

function buildLeadSummary(
  payload: SpecializationLeadPayload,
  formattedDate: string
) {
  return [
    "Nueva solicitud desde la landing de Especialización",
    "",
    `Programa: ${payload.program}`,
    `Instructor: ${payload.instructor}`,
    `Temas: ${payload.topics.join(", ")}`,
    "",
    `Nombre: ${payload.fullName || "-"}`,
    `Celular: ${payload.phone || "-"}`,
    `Correo: ${payload.email || "No compartido"}`,
    `DNI: ${payload.dni || "No compartido"}`,
    "",
    `Mensaje: ${payload.message || "Sin mensaje"}`,
    `Origen: ${payload.source || "-"}`,
    `Página: ${payload.pageUrl || "-"}`,
    `Fecha: ${formattedDate}`,
    `Fecha ISO: ${payload.createdAt}`,
  ].join("\n");
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

  const formattedDate = leadDate();
  const summary = buildLeadSummary(payload, formattedDate);

  const formData = new FormData();

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append(
    "subject",
    `Nuevo lead Inocuidad Alimentaria - ${payload.fullName}`
  );
  formData.append("from_name", "Inocuidad Alimentaria - Cooking Gourmet");

  formData.append("name", payload.fullName);
  formData.append("email", payload.email || SALES_EMAIL);
  formData.append("phone", payload.phone);

  formData.append("Programa", payload.program);
  formData.append("Instructor", payload.instructor);
  formData.append("Temas", payload.topics.join(", "));
  formData.append("DNI", payload.dni || "No compartido");
  formData.append("Correo del interesado", payload.email || "No compartido");
  formData.append("Celular", payload.phone);
  formData.append("Origen", payload.source);
  formData.append("Página", payload.pageUrl);
  formData.append("Fecha", formattedDate);

  formData.append("message", summary);

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message || "No se pudo enviar la solicitud al correo."
    );
  }

  return data;
}

function setMetaContent(selector: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (!meta) {
    meta = document.createElement("meta");

    if (selector.includes('property="')) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) meta.setAttribute("property", property);
    } else {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) meta.setAttribute("name", name);
    }

    document.head.appendChild(meta);
  }

  meta.content = content;
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

function applySpecializationSeo() {
  const baseUrl = "https://www.cookingourmet.edu.pe";
  const canonicalUrl = `${baseUrl}/especializacion`;
  const title =
    "Curso Gratuito de Inocuidad Alimentaria | Cooking Gourmet";
  const description =
    "Programa virtual gratuito de Cooking Gourmet sobre inocuidad alimentaria, higiene, buenas prácticas de manipulación y saneamiento para chefs y personal de servicios gastronómicos.";

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent(
    'meta[property="og:image"]',
    `${baseUrl}${SPECIALIZATION.chefImage}`
  );
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent(
    'meta[name="twitter:image"]',
    `${baseUrl}${SPECIALIZATION.chefImage}`
  );

  setCanonical(canonicalUrl);

  document.getElementById("specialization-schema")?.remove();

  const schema = document.createElement("script");
  schema.id = "specialization-schema";
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${canonicalUrl}#course`,
        name: SPECIALIZATION.name,
        description,
        url: canonicalUrl,
        image: `${baseUrl}${SPECIALIZATION.chefImage}`,
        inLanguage: "es-PE",
        provider: {
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}/#organization`,
          name: "Cooking Gourmet",
          url: `${baseUrl}/`,
          telephone: "+51 981 377 382",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Ferrocarril 587",
            addressLocality: "Huancayo",
            addressRegion: "Junín",
            addressCountry: "PE",
          },
        },
        teaches: SPECIALIZATION.topics,
        instructor: {
          "@type": "Person",
          name: SPECIALIZATION.instructor,
          jobTitle: "Docente instructor",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Virtual",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Especialización",
            item: canonicalUrl,
          },
        ],
      },
    ],
  });

  document.head.appendChild(schema);
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
          <p>Contenido esencial para fortalecer la manipulación segura, la higiene y la prevención de riesgos.</p>
        </article>
      `
    )
    .join("");
}

function renderSpecializationHero() {
  return `
    <section class="specialization-hero">
      <div class="specialization-hero__pattern" aria-hidden="true"></div>

      <canvas
        class="specialization-swirl-canvas"
        id="specializationSwirlCanvas"
        aria-hidden="true"
      ></canvas>

      <div class="container specialization-hero__container">
        <div class="specialization-hero__chef">
          <picture>
            <source
              media="(max-width: 820px)"
              srcset="${SPECIALIZATION.chefMobileImage}"
            />

            <img
              src="${SPECIALIZATION.chefImage}"
              alt="${SPECIALIZATION.instructor}, docente del Programa de Inocuidad Alimentaria"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div class="specialization-hero__content">

          <h1 class="specialization-hero__title">
            Inocuidad Alimentaria
            <span>Higiene y Saneamiento.</span>
          </h1>

          <span class="specialization-eyebrow specialization-eyebrow--below">
            Curso gratuito · 100% virtual
          </span>

          <div class="specialization-hero__topics" aria-label="Temas de la especialización">
            ${SPECIALIZATION.topics
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
            <span>Docente instructor</span>
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
            <input type="hidden" name="source" value="Landing Inocuidad Alimentaria" />

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
                placeholder="Deseo inscribirme al curso virtual gratuito."
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
            Seis módulos esenciales sobre higiene, manipulación segura,
            saneamiento y prevención de riesgos alimentarios.
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

          <h2>Capacitación virtual, clara y aplicada</h2>

          <p>
            Aprende principios de higiene, manipulación segura y prevención
            de riesgos con contenidos orientados al trabajo gastronómico.
          </p>
        </div>

        <div class="specialization-method__list">
          <article class="reveal-up">
            <strong>01</strong>
            <span>3 sesiones virtuales de 2 horas cada una.</span>
          </article>

          <article class="reveal-up">
            <strong>02</strong>
            <span>26, 27 y 28 de agosto · 8:00 p.m. a 10:00 p.m.</span>
          </article>

          <article class="reveal-up">
            <strong>03</strong>
            <span>Curso gratuito y certificado al culminar.</span>
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
            <p>No necesitas experiencia previa para participar.</p>
          </article>

          <article class="specialization-audience-card reveal-up">
            <h3>Amantes de la cocina</h3>
            <p>Fortalece tus conocimientos de higiene y manipulación segura.</p>
          </article>

          <article class="specialization-audience-card reveal-up">
            <h3>Personal gastronómico</h3>
            <p>Actualiza buenas prácticas de manipulación y saneamiento.</p>
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
              Inscríbete al programa virtual gratuito. Inicia el
              ${SPECIALIZATION.startDate}, tiene ${SPECIALIZATION.duration}
              y se desarrollará ${SPECIALIZATION.schedule}.
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
      pageUrl: window.location.href,
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

      await sendSpecializationLeadToSales(payload);

      form.reset();
      setFormStatus(
        "Solicitud enviada correctamente. Te contactaremos pronto.",
        "success"
      );
    } catch (error) {
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
  applySpecializationSeo();
  initSpecializationForm();
  initSpecializationPrimaryAction();
  initRevealEffects();
  initSpecializationSwirlBackground();
}