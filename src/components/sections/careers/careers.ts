import "./careers.css";

type CareerProgram = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  modality: string;
  image: string;
  imageAlt: string;
  href: string;
  whatsappText: string;
};

const WHATSAPP_NUMBER = "51981377382";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function programWhatsAppMessage(programName: string) {
  return [
    "Hola, vengo de la web de Cooking Gourmet.",
    `Quiero información sobre el programa de ${programName}.`,
    "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
  ].join("\n");
}

const careerPrograms: CareerProgram[] = [
  {
    id: "gastronomia",
    title: "Gastronomía Profesional",
    category: "Carrera principal",
    description:
      "Cocina peruana, cocina internacional, técnicas culinarias y gestión gastronómica.",
    duration: "18 meses",
    modality: "Presencial",
    image: "/images/portada/gastronomia.jpg",
    imageAlt:
      "Estudiante de Gastronomía Profesional en Cooking Gourmet",
    href: "/programas/gastronomia",
    whatsappText: programWhatsAppMessage("Gastronomía Profesional"),
  },
  {
    id: "pasteleria",
    title: "Pastelería Profesional",
    category: "Programa profesional",
    description:
      "Pastelería, panadería, decoración, chocolatería y producción comercial.",
    duration: "1 año",
    modality: "Presencial",
    image: "/images/portada/pasteleria.jpg",
    imageAlt:
      "Estudiante de Pastelería Profesional en Cooking Gourmet",
    href: "/programas/pasteleria",
    whatsappText: programWhatsAppMessage("Pastelería Profesional"),
  },
  {
    id: "bar-profesional",
    title: "Bar Profesional",
    category: "Especialización práctica",
    description:
      "Coctelería, mixología, destilados, servicio y operación profesional de barra.",
    duration: "6 meses",
    modality: "Presencial",
    image: "/images/portada/bar-profesional.jpg",
    imageAlt:
      "Programa de Bar Profesional en Cooking Gourmet",
    href: "/programas/bar-profesional",
    whatsappText: programWhatsAppMessage("Bar Profesional"),
  },
  {
    id: "barismo",
    title: "Barismo Profesional",
    category: "Especialización en café",
    description:
      "Café, espresso, métodos de extracción, cata, latte art y operación de cafetería.",
    duration: "3 meses",
    modality: "Presencial",
    image: "/images/portada/barismo.jpg",
    imageAlt:
      "Barista preparando café en Cooking Gourmet",
    href: "/programas/barismo",
    whatsappText: programWhatsAppMessage("Barismo Profesional"),
  },
  {
    id: "sommelier",
    title: "Sommelier Profesional",
    category: "Especialización sensorial",
    description:
      "Vinos, cata, maridaje, servicio especializado y cultura vitivinícola.",
    duration: "6 meses",
    modality: "Presencial",
    image: "/images/portada/sommelier.jpg",
    imageAlt:
      "Programa de Sommelier Profesional en Cooking Gourmet",
    href: "/programas/sommelier",
    whatsappText: programWhatsAppMessage("Sommelier Profesional"),
  },
  {
    id: "cocina-acelerada",
    title: "Cocina Acelerada",
    category: "Formación intensiva",
    description:
      "Bases culinarias, técnicas de cocina y práctica aplicada para cocinas reales.",
    duration: "6 meses",
    modality: "Presencial",
    image: "/images/portada/cocina.jpg",
    imageAlt:
      "Programa de Cocina Acelerada en Cooking Gourmet",
    href: "/programas/cocina-acelerada",
    whatsappText: programWhatsAppMessage("Cocina Acelerada"),
  },
];

function renderCareerCard(program: CareerProgram, index: number) {
  return `
    <article class="cg-career-card" data-career="${escapeHtml(program.id)}">
      <a class="cg-career-card__media" href="${escapeHtml(program.href)}">
        <img
          src="${escapeHtml(program.image)}"
          alt="${escapeHtml(program.imageAlt)}"
          loading="${index <= 1 ? "eager" : "lazy"}"
          decoding="async"
        />

        <span class="cg-career-card__shade"></span>

        <span class="cg-career-card__badge">
          ${escapeHtml(program.category)}
        </span>
      </a>

      <div class="cg-career-card__body">
        <div class="cg-career-card__meta">
          <span>${escapeHtml(program.duration)}</span>
          <span>${escapeHtml(program.modality)}</span>
        </div>

        <h3>
          <a href="${escapeHtml(program.href)}">
            ${escapeHtml(program.title)}
          </a>
        </h3>

        <p>${escapeHtml(program.description)}</p>

        <div class="cg-career-card__actions">
          <a
            class="cg-career-btn cg-career-btn--primary"
            href="${escapeHtml(program.href)}"
          >
            Ver programa
          </a>

          <a
            class="cg-career-btn cg-career-btn--ghost"
            href="${whatsappUrl(program.whatsappText)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Informes
          </a>
        </div>
      </div>
    </article>
  `;
}

export function renderCareersSection() {
  return `
    <section class="cg-careers" id="programas" aria-labelledby="cg-careers-title">
      <span id="carreras" class="cg-careers__anchor" aria-hidden="true"></span>

      <div class="cg-careers__bg"></div>

      <div class="cg-careers__container">
        <div class="cg-careers__heading">
          <div>
            <span class="cg-careers__eyebrow">Programas de estudio</span>

            <h2 id="cg-careers-title">
              Formación gastronómica profesional
            </h2>

            <p>
              Elige un programa presencial, aprende con práctica real y fórmate
              con docentes especializados para trabajar, emprender o especializarte
              en el mundo gastronómico.
            </p>
          </div>

          <div class="cg-careers__controls" aria-label="Controles del carrusel">
            <button
              type="button"
              class="cg-careers__control"
              data-careers-prev
              aria-label="Programa anterior"
            >
              ‹
            </button>

            <button
              type="button"
              class="cg-careers__control"
              data-careers-next
              aria-label="Programa siguiente"
            >
              ›
            </button>
          </div>
        </div>

        <div class="cg-careers__carousel-wrap">
          <div class="cg-careers__carousel" data-careers-carousel>
            ${careerPrograms.map(renderCareerCard).join("")}
          </div>
        </div>

        <div class="cg-careers__cta">
          <div>
            <span>Admisión Cooking Gourmet</span>
            <strong>Consulta horarios, matrícula e inicio de clases.</strong>
          </div>

          <a
            href="${whatsappUrl(
              [
                "Hola, vengo de la web de Cooking Gourmet.",
                "Quiero información sobre los programas presenciales.",
                "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
              ].join("\n")
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initCareersSection() {
  const carousel = document.querySelector<HTMLElement>("[data-careers-carousel]");
  const prevButton = document.querySelector<HTMLButtonElement>("[data-careers-prev]");
  const nextButton = document.querySelector<HTMLButtonElement>("[data-careers-next]");

  if (!carousel || !prevButton || !nextButton) return;

  const getScrollAmount = () => {
    const firstCard = carousel.querySelector<HTMLElement>(".cg-career-card");

    if (!firstCard) {
      return carousel.clientWidth * 0.8;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");

    return firstCard.offsetWidth + gap;
  };

  const updateControls = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth - 4;

    prevButton.disabled = carousel.scrollLeft <= 4;
    nextButton.disabled = carousel.scrollLeft >= maxScroll;
  };

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  carousel.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);

  updateControls();
}