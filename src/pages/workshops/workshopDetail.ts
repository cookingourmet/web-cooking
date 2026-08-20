import { renderHeader, initHeader } from "../../components/layout/header/header";
import { renderFooter } from "../../components/layout/footer/footer";
import {
  findWorkshopBySlug,
  getAvailableWorkshops,
  getWorkshopStatus,
  workshopPath,
  workshopWhatsAppUrl,
  type Workshop,
} from "../../data/workshops.data";
import "./workshopDetail.css";

const SITE_URL = "https://www.cookingourmet.edu.pe";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setMeta(selector: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (!meta) {
    meta = document.createElement("meta");
    const property = selector.match(/property="([^"]+)"/)?.[1];
    const name = selector.match(/name="([^"]+)"/)?.[1];
    if (property) meta.setAttribute("property", property);
    if (name) meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

function applyWorkshopSeo(workshop: Workshop) {
  const url = `${SITE_URL}${workshopPath(workshop)}`;
  const image = `${SITE_URL}${workshop.image}`;
  const title = `${workshop.shortTitle} en Huancayo | Cooking Gourmet`;

  document.title = title;
  setMeta('meta[name="description"]', workshop.seoDescription);
  setMeta('meta[property="og:type"]', "website");
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', workshop.seoDescription);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[name="twitter:card"]', "summary_large_image");
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', workshop.seoDescription);
  setMeta('meta[name="twitter:image"]', image);
  setCanonical(url);

  document.getElementById("workshop-schema")?.remove();
  const schema = document.createElement("script");
  schema.id = "workshop-schema";
  schema.type = "application/ld+json";
  schema.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Course",
    name: workshop.title,
    description: workshop.seoDescription,
    provider: {
      "@type": "Organization",
      name: "Cooking Gourmet",
      url: SITE_URL,
    },
    url,
  });
  document.head.appendChild(schema);
}

function renderRelatedWorkshop(workshop: Workshop, index: number) {
  const status = getWorkshopStatus(workshop);

  return `
    <a
      class="workshop-related__item"
      href="${workshopPath(workshop)}"
      data-track-event="related_workshop_click"
      data-track-workshop="${escapeHtml(workshop.id)}"
      data-reveal
      style="--reveal-delay: ${index * 70}ms"
    >
      <img src="${escapeHtml(workshop.image)}" alt="${escapeHtml(workshop.imageAlt)}" loading="lazy" />
      <span>
        <small>${escapeHtml(status.label)} · ${escapeHtml(workshop.dateLabel)}</small>
        <strong>${escapeHtml(workshop.shortTitle)}</strong>
        <b>${escapeHtml(workshop.price)}</b>
      </span>
    </a>
  `;
}

function renderChecklist(items: string[], className = "workshop-detail__checklist") {
  return `
    <ul class="${className}">
      ${items
        .map(
          (item) => `
            <li>
              <span aria-hidden="true">✓</span>
              <p>${escapeHtml(item)}</p>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function renderFaq(workshop: Workshop) {
  return workshop.faqs
    .map(
      (faq, index) => `
        <details class="workshop-faq__item" ${index === 0 ? "open" : ""} data-reveal>
          <summary>
            <span>${escapeHtml(faq.question)}</span>
            <i aria-hidden="true">+</i>
          </summary>
          <div class="workshop-faq__answer">
            <p>${escapeHtml(faq.answer)}</p>
          </div>
        </details>
      `
    )
    .join("");
}

export function renderWorkshopDetailPage(slug: string) {
  const workshop = findWorkshopBySlug(slug);

  if (!workshop) return null;

  const status = getWorkshopStatus(workshop);
  const isEnded = status.key === "ended";
  const related = getAvailableWorkshops()
    .filter((item) => item.id !== workshop.id)
    .slice(0, 2);

  const primaryUrl = workshopWhatsAppUrl(workshop, isEnded ? "next" : "reserve");
  const primaryLabel = isEnded ? "Consultar próxima edición" : "Separar mi vacante";
  const primaryEvent = isEnded ? "workshop_next_edition_click" : "workshop_reserve_click";

  return `
    <div class="site-shell">
      ${renderHeader()}

      <main class="workshop-detail" data-workshop-page="${escapeHtml(workshop.id)}">
        <section class="workshop-detail__hero" data-reveal-section>
          <div class="workshop-detail__container workshop-detail__hero-grid">
            <div class="workshop-detail__media" data-reveal>
              <img src="${escapeHtml(workshop.image)}" alt="${escapeHtml(workshop.imageAlt)}" fetchpriority="high" />
              <span class="workshop-detail__date-badge">
                <small>Inicio</small>
                <strong>${escapeHtml(workshop.dateBadgeDay)}</strong>
                <span>${escapeHtml(workshop.dateBadgeMonth)}</span>
              </span>
              <span class="workshop-detail__status workshop-detail__status--${status.key}">
                ${escapeHtml(status.label)}
              </span>
            </div>

            <div class="workshop-detail__copy" data-reveal style="--reveal-delay: 80ms">
              <a class="workshop-detail__back" href="/#talleres">← Volver a talleres</a>
              <span class="workshop-detail__eyebrow">Taller práctico · Huancayo</span>
              <h1>${escapeHtml(workshop.title)}</h1>
              <p class="workshop-detail__lead">${escapeHtml(workshop.summary)}</p>

              <div class="workshop-detail__facts" data-track-view="workshop_price_view" data-track-workshop="${escapeHtml(workshop.id)}">
                <div><small>Fecha</small><strong>${escapeHtml(workshop.dateLabel)}</strong></div>
                <div><small>Modalidad</small><strong>${escapeHtml(workshop.modality)}</strong></div>
                <div><small>Cupos</small><strong>${escapeHtml(workshop.capacity)}</strong></div>
                <div><small>Inversión</small><strong>${escapeHtml(workshop.price)}</strong></div>
              </div>

              <div class="workshop-detail__cta-row">
                <a
                  class="workshop-detail__cta workshop-detail__cta--primary"
                  href="${primaryUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="${primaryEvent}"
                  data-track-workshop="${escapeHtml(workshop.id)}"
                >
                  ${primaryLabel}
                </a>

                ${
                  !isEnded
                    ? `<a
                        class="workshop-detail__cta workshop-detail__cta--ghost"
                        href="${workshopWhatsAppUrl(workshop, "info")}"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track-event="workshop_info_click"
                        data-track-workshop="${escapeHtml(workshop.id)}"
                      >
                        Tengo una consulta
                      </a>`
                    : ""
                }
              </div>

              <p class="workshop-detail__small-note">
                ${
                  isEnded
                    ? "Esta fecha ya finalizó. Puedes consultar por una nueva edición del taller."
                    : "Admisión confirmará disponibilidad, horario y el proceso vigente antes de cualquier pago."
                }
              </p>
            </div>
          </div>
        </section>

        <section class="workshop-detail__content" data-reveal-section>
          <div class="workshop-detail__container">
            <div class="workshop-detail__content-grid">
              <article class="workshop-detail__panel" data-reveal>
                <span class="workshop-detail__panel-label">Contenido</span>
                <h2>¿Qué trabajarás en el taller?</h2>
                <div class="workshop-detail__topics">
                  ${workshop.topics
                    .map(
                      (topic, index) => `
                        <div class="workshop-detail__topic">
                          <span>${String(index + 1).padStart(2, "0")}</span>
                          <strong>${escapeHtml(topic)}</strong>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </article>

              <article class="workshop-detail__panel" data-reveal style="--reveal-delay: 80ms">
                <span class="workshop-detail__panel-label">Ideal para</span>
                <h2>¿Para quién está pensado?</h2>
                ${renderChecklist(workshop.audience)}
              </article>
            </div>

            <div class="workshop-detail__value-grid">
              <article class="workshop-detail__panel workshop-detail__panel--soft" data-reveal>
                <span class="workshop-detail__panel-label">Experiencia</span>
                <h2>Qué encontrarás</h2>
                ${renderChecklist(workshop.includes)}
              </article>

              <article class="workshop-detail__panel workshop-detail__panel--soft" data-reveal style="--reveal-delay: 70ms">
                <span class="workshop-detail__panel-label">Resultado</span>
                <h2>Qué podrás reforzar</h2>
                ${renderChecklist(workshop.outcomes)}
              </article>

              <aside class="workshop-detail__panel workshop-detail__panel--dark" data-reveal style="--reveal-delay: 140ms">
                <span class="workshop-detail__panel-label">Cupos limitados</span>
                <h2>${isEnded ? "Consulta la próxima fecha" : "Confirma antes de pagar"}</h2>
                <p>
                  ${
                    isEnded
                      ? "Escríbenos para conocer si habrá una nueva edición y dejar registrado tu interés."
                      : "Escríbenos antes de realizar cualquier pago. Te confirmaremos vacantes, horario y las indicaciones vigentes para tu inscripción."
                  }
                </p>
                <a
                  href="${primaryUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="${primaryEvent}"
                  data-track-workshop="${escapeHtml(workshop.id)}"
                >
                  ${primaryLabel}
                </a>
                <small>Código de seguimiento: ${escapeHtml(workshop.leadCode)}</small>
              </aside>
            </div>
          </div>
        </section>

        <section class="workshop-faq" data-reveal-section>
          <div class="workshop-detail__container workshop-faq__grid">
            <div class="workshop-faq__intro" data-reveal>
              <span class="workshop-detail__panel-label">Antes de inscribirte</span>
              <h2>Preguntas frecuentes</h2>
              <p>Resolvemos las dudas más comunes antes de que converses con admisión.</p>
            </div>
            <div class="workshop-faq__list">
              ${renderFaq(workshop)}
            </div>
          </div>
        </section>

        ${
          related.length
            ? `<section class="workshop-related" data-reveal-section>
                <div class="workshop-detail__container">
                  <div class="workshop-related__heading" data-reveal>
                    <span>También puedes revisar</span>
                    <h2>Otros talleres disponibles</h2>
                  </div>
                  <div class="workshop-related__grid">
                    ${related.map(renderRelatedWorkshop).join("")}
                  </div>
                </div>
              </section>`
            : ""
        }

        <div class="workshop-mobile-cta" aria-label="Acción rápida del taller">
          <div>
            <small>${escapeHtml(workshop.shortTitle)}</small>
            <strong>${escapeHtml(workshop.price)}</strong>
          </div>
          <a
            href="${primaryUrl}"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="${primaryEvent}"
            data-track-workshop="${escapeHtml(workshop.id)}"
          >
            ${primaryLabel}
          </a>
        </div>
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initWorkshopDetailPage(slug: string) {
  const workshop = findWorkshopBySlug(slug);
  if (!workshop) return;

  initHeader();
  applyWorkshopSeo(workshop);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "workshop_detail_view",
    workshop_id: workshop.id,
    workshop_name: workshop.shortTitle,
    workshop_code: workshop.leadCode,
    workshop_status: getWorkshopStatus(workshop).key,
  });
}
