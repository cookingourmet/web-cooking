import { ADMISSION, isAdmissionProgram } from "../../../data/admission.data";
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
    "Hola, vengo de la página web de Cooking Gourmet.",
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
    description: "Espresso, métodos de extracción, cata, latte art y operación de cafetería.",
    duration: "3 meses",
    modality: "Presencial",
    image: "/images/portada/barismo.jpg",
    imageAlt: "Barismo Profesional en Cooking Gourmet",
    href: "/programas/barismo",
    whatsappText: programWhatsAppMessage("Barismo Profesional"),
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
          ${isAdmissionProgram(program.id) ? `Inicio ${ADMISSION.shortLabel}` : escapeHtml(program.category)}
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

        <div class="cg-career-card__actions">
          <a
            class="cg-career-btn cg-career-btn--primary"
            href="${escapeHtml(program.href)}"
          >
            Ver programa
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

            <h2 id="cg-careers-title">Elige tu camino profesional</h2>

            <p>Programas presenciales y aprendizaje práctico para avanzar con seguridad.</p>
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
          <div class="cg-careers__more">
            <span>Más opciones</span>
            <a href="/programas/sommelier">Sommelier</a>
            <a href="/programas/cocina-acelerada">Cocina Acelerada</a>
          </div>

          <a
            href="${whatsappUrl(
              [
                "Hola, vengo de la página web de Cooking Gourmet.",
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

export function initCareersSection() {}
