import "./workshops.css";
import {
  getAvailableWorkshops,
  getWorkshopStatus,
  workshopPath,
  workshopWhatsAppUrl,
  type Workshop,
} from "../../../data/workshops.data";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderWorkshopCard(workshop: Workshop, featured = false, index = 0) {
  const status = getWorkshopStatus(workshop);

  return `
    <article
      class="cg-workshop-card ${featured ? "cg-workshop-card--featured" : ""}"
      data-workshop="${escapeHtml(workshop.id)}"
      data-reveal
      style="--reveal-delay: ${Math.min(index, 4) * 70}ms"
    >
      <a
        class="cg-workshop-card__media"
        href="${workshopPath(workshop)}"
        data-track-event="workshop_detail_click"
        data-track-workshop="${escapeHtml(workshop.id)}"
        aria-label="Ver información del taller ${escapeHtml(workshop.shortTitle)}"
      >
        <img
          src="${escapeHtml(workshop.image)}"
          alt="${escapeHtml(workshop.imageAlt)}"
          loading="${featured ? "eager" : "lazy"}"
          decoding="async"
        />

        <span class="cg-workshop-card__shade" aria-hidden="true"></span>

        ${featured ? '<span class="cg-workshop-card__featured-label">Taller destacado</span>' : ""}

        <span class="cg-workshop-card__date">
          <small>Inicio</small>
          <strong>${escapeHtml(workshop.dateBadgeDay)}</strong>
          <span>${escapeHtml(workshop.dateBadgeMonth)}</span>
        </span>

        <span class="cg-workshop-card__status cg-workshop-card__status--${status.key}">
          ${escapeHtml(status.label)}
        </span>
      </a>

      <div class="cg-workshop-card__body">
        <div class="cg-workshop-card__topline">
          <span>${escapeHtml(workshop.modality)}</span>
          <span>${escapeHtml(workshop.capacity)}</span>
          <span>${escapeHtml(workshop.location)}</span>
        </div>

        <h3>
          <a href="${workshopPath(workshop)}">
            ${escapeHtml(workshop.title)}
          </a>
        </h3>

        <p>${escapeHtml(workshop.summary)}</p>

        <div class="cg-workshop-card__topics" aria-label="Temas del taller">
          ${workshop.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
        </div>

        <div class="cg-workshop-card__footer">
          <div class="cg-workshop-card__price" data-track-view="workshop_price_view" data-track-workshop="${escapeHtml(workshop.id)}">
            <small>Inversión</small>
            <strong>${escapeHtml(workshop.price)}</strong>
          </div>

          <div class="cg-workshop-card__actions">
            <a
              class="cg-workshop-btn cg-workshop-btn--ghost"
              href="${workshopPath(workshop)}"
              data-track-event="workshop_detail_click"
              data-track-workshop="${escapeHtml(workshop.id)}"
            >
              Ver detalles
            </a>

            <a
              class="cg-workshop-btn cg-workshop-btn--primary"
              href="${workshopWhatsAppUrl(workshop, "reserve")}"
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="workshop_reserve_click"
              data-track-workshop="${escapeHtml(workshop.id)}"
            >
              Separar vacante
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function renderWorkshopsSection() {
  const available = getAvailableWorkshops();
  const featured = available[0];
  const secondary = available.slice(1);

  return `
    <section class="cg-workshops" id="talleres" aria-labelledby="cg-workshops-title" data-reveal-section>
      <div class="cg-workshops__container">
        <div class="cg-workshops__heading" data-reveal>
          <div>
            <span class="cg-workshops__eyebrow">Talleres prácticos</span>
            <h2 id="cg-workshops-title">Aprende haciendo</h2>
            <p>
              Elige un taller, revisa exactamente qué aprenderás y confirma tu vacante directamente con admisión.
            </p>
          </div>

          <div class="cg-workshops__note">
            <span>Cupos limitados</span>
            <strong>Hasta 20 participantes por taller</strong>
          </div>
        </div>

        ${
          featured
            ? `
              <div class="cg-workshops__featured">
                ${renderWorkshopCard(featured, true, 0)}
              </div>

              ${
                secondary.length
                  ? `<div class="cg-workshops__grid cg-workshops__grid--secondary">
                      ${secondary.map((workshop, index) => renderWorkshopCard(workshop, false, index + 1)).join("")}
                    </div>`
                  : ""
              }
            `
            : `
              <div class="cg-workshops__empty" data-reveal>
                <span>Próximas fechas</span>
                <h3>Estamos preparando nuevos talleres.</h3>
                <p>Escríbenos y te avisamos qué talleres estarán disponibles próximamente.</p>
              </div>
            `
        }

        <div class="cg-workshops__trust" data-reveal>
          <div>
            <strong>Práctica presencial</strong>
            <span>Aprendizaje enfocado en hacer, preguntar y corregir durante el taller.</span>
          </div>
          <div>
            <strong>Información clara</strong>
            <span>Fecha, inversión, contenido y cupos visibles antes de escribir a admisión.</span>
          </div>
          <div>
            <strong>Atención por WhatsApp</strong>
            <span>Confirma disponibilidad y recibe las indicaciones para tu inscripción.</span>
          </div>
        </div>

        <div class="cg-workshops__closing" data-reveal>
          <p>
            ¿No sabes cuál elegir? Cuéntanos qué quieres aprender y te orientamos.
          </p>

          <a
            href="https://wa.me/51981377382?text=${encodeURIComponent(
              "Hola, vengo de la web de Cooking Gourmet. Quiero orientación para elegir uno de los talleres disponibles."
            )}"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="workshops_general_whatsapp_click"
          >
            Hablar con admisión
          </a>
        </div>
      </div>
    </section>
  `;
}
