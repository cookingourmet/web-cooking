import type { ProgramData } from "../../data/programs.data";

function renderHeroHighlights(program: ProgramData) {
  const highlights = [
    program.modality ? `Modalidad ${program.modality}` : "",
    program.duration ? `Duración ${program.duration}` : "",
    program.schedule ? `Horarios ${program.schedule}` : "",
  ].filter(Boolean);

  if (!highlights.length) return "";

  return `
    <div class="program-hero-highlights">
      ${highlights
        .map(
          (item) => `
            <div class="program-hero-highlight">
              <span class="program-hero-highlight__dot"></span>
              <span>${item}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderStatCards(program: ProgramData) {
  if (!program.stats?.length) return "";

  return `
    <section class="program-stats">
      <div class="container">
        <div class="program-stats__grid">
          ${program.stats
            .map(
              (stat) => `
                <article class="program-stat-card">
                  <strong>${stat.value}</strong>
                  <span>${stat.label}</span>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderBenefits(program: ProgramData) {
  if (!program.benefits?.length) return "";

  return `
    <section class="program-section program-section--soft">
      <div class="container">
        <div class="program-section__heading">
          <span class="program-section__tag">Ventajas</span>
          <h2>¿Por qué estudiar ${program.title}?</h2>
          <p>Una formación diseñada para prepararte con visión práctica, competitiva y profesional.</p>
        </div>

        <div class="program-benefits-grid">
          ${program.benefits
            .map(
              (item) => `
                <article class="program-benefit-card">
                  <div class="program-benefit-card__icon">✓</div>
                  <p>${item}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderModules(program: ProgramData) {
  if (!program.modules?.length) return "";

  const hasStructuredModules =
    typeof program.modules[0] === "object" &&
    program.modules[0] !== null &&
    "title" in (program.modules[0] as object);

  if (hasStructuredModules) {
    return `
      <section class="program-section">
        <div class="container">
          <div class="program-section__heading">
            <span class="program-section__tag">Malla curricular</span>
            <h2>Formación por módulos</h2>
            <p>Contenido organizado para desarrollar técnica, criterio y dominio profesional paso a paso.</p>
          </div>

          <div class="program-modules-grid">
            ${(program.modules as Array<{ title: string; items: string[] }>)
              .map(
                (module) => `
                  <article class="program-module-card">
                    <div class="program-module-card__top">
                      <span class="program-module-card__badge">${module.title}</span>
                    </div>
                    <ul>
                      ${module.items.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="program-section">
      <div class="container">
        <div class="program-section__heading">
          <span class="program-section__tag">Plan de estudio</span>
          <h2>Contenidos principales</h2>
          <p>Una ruta formativa enfocada en competencias reales para el mundo laboral.</p>
        </div>

        <article class="program-card">
          <ul class="program-list program-list--columns">
            ${(program.modules as string[]).map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>
  `;
}

function renderProfile(program: ProgramData) {
  if (!program.profile?.length) return "";

  return `
    <section class="program-section">
      <div class="container program-two-columns">
        <article class="program-card program-card--glass">
          <span class="program-section__tag">Perfil del estudiante</span>
          <h2>¿A quién va dirigido?</h2>
          <ul class="program-list">
            ${program.profile.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>

        <article class="program-card">
          <span class="program-section__tag">Enfoque</span>
          <h2>Una formación con visión profesional</h2>
          <p>${program.audience ?? "Programa orientado a quienes buscan formación práctica y oportunidades reales de crecimiento profesional."}</p>
          ${
            program.methodology
              ? `<p>${program.methodology}</p>`
              : ""
          }
        </article>
      </div>
    </section>
  `;
}

function renderInvestment(program: ProgramData) {
  if (!program.investment && !program.requirements?.length && !program.uniform?.length) return "";

  return `
    <section class="program-section program-section--soft">
      <div class="container program-three-columns">
        ${
          program.investment
            ? `
          <article class="program-card">
            <span class="program-section__tag">Inversión</span>
            <h2>Costos del programa</h2>

            <div class="program-price-list">
              <div><span>Inscripción</span><strong>${program.investment.inscription}</strong></div>
              <div><span>Matrícula</span><strong>${program.investment.enrollment}</strong></div>
              <div><span>Mensualidad</span><strong>${program.investment.monthly}</strong></div>
              <div><span>Uniforme</span><strong>${program.investment.uniform}</strong></div>
            </div>
          </article>
        `
            : ""
        }

        ${
          program.requirements?.length
            ? `
          <article class="program-card">
            <span class="program-section__tag">Requisitos</span>
            <h2>Documentos necesarios</h2>
            <ul class="program-list">
              ${program.requirements.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        `
            : ""
        }

        ${
          program.uniform?.length
            ? `
          <article class="program-card">
            <span class="program-section__tag">Uniforme</span>
            <h2>Implementos incluidos</h2>
            <ul class="program-list">
              ${program.uniform.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        `
            : ""
        }
      </div>
    </section>
  `;
}

function renderSchedules(program: ProgramData) {
  if (!program.schedules?.length) return "";

  return `
    <section class="program-section">
      <div class="container">
        <div class="program-section__heading">
          <span class="program-section__tag">Horarios</span>
          <h2>Turnos disponibles</h2>
          <p>Elige el horario que mejor se adapte a tu ritmo y disponibilidad.</p>
        </div>

        <div class="program-schedule-grid">
          ${program.schedules
            .map(
              (slot) => `
                <article class="program-schedule-card">
                  <span class="program-schedule-card__code">${slot.code}</span>
                  <h3>${slot.label}</h3>
                  <p>${slot.time}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderOpportunities(program: ProgramData) {
  if (!program.opportunities?.length) return "";

  return `
    <section class="program-section">
      <div class="container">
        <article class="program-card">
          <div class="program-section__heading program-section__heading--compact">
            <span class="program-section__tag">Campo laboral</span>
            <h2>Oportunidades para tu futuro</h2>
            <p>Prepárate para ingresar con seguridad a un mercado con alta demanda y múltiples caminos de crecimiento.</p>
          </div>

          <div class="program-opportunity-grid">
            ${program.opportunities
              .map(
                (item) => `
                  <div class="program-opportunity-chip">${item}</div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderTrustBand(program: ProgramData, whatsappUrl: string) {
  return `
    <section class="program-section">
      <div class="container">
        <article class="program-trust-band">
          <div class="program-trust-band__content">
            <span class="program-section__tag">Impulsa tu futuro</span>
            <h2>Da el siguiente paso con ${program.title}</h2>
            <p>
              Recibe orientación personalizada sobre inversión, horarios, matrícula,
              inicio de clases y todo lo necesario para comenzar con seguridad.
            </p>
          </div>

          <div class="program-trust-band__actions">
            <a class="program-btn program-btn--primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
              Solicitar informes
            </a>
            ${
              program.brochure
                ? `<a class="program-btn program-btn--secondary" href="${program.brochure}" target="_blank" rel="noopener noreferrer">
                    Descargar brochure
                  </a>`
                : ""
            }
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderContact(program: ProgramData, whatsappUrl: string) {
  return `
    <section class="program-section">
      <div class="container program-two-columns">
        <article class="program-card program-card--accent">
          <span class="program-section__tag">Contacto</span>
          <h2>Solicita más información</h2>
          <p>
            Recibe asesoría personalizada sobre matrícula, inversión, turnos disponibles,
            inicio de clases y todo lo que necesitas para comenzar.
          </p>

          <div class="program-contact-list">
            ${
              program.contactPhone
                ? `<div><span>Central</span><strong>${program.contactPhone}</strong></div>`
                : ""
            }
            <div><span>WhatsApp</span><strong>${(program.whatsappNumber ?? "51981377382").replace(/^51/, "")}</strong></div>
            <div><span>Modalidad</span><strong>${program.modality}</strong></div>
          </div>

          <div class="program-premium-hero__actions">
            <a class="program-btn program-btn--primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
              Pedir informes
            </a>
            ${
              program.brochure
                ? `<a class="program-btn program-btn--secondary" href="${program.brochure}" target="_blank" rel="noopener noreferrer">
                    Descargar brochure
                  </a>`
                : ""
            }
          </div>
        </article>

        ${
          program.campuses?.length
            ? `
          <article class="program-card">
            <span class="program-section__tag">Sedes</span>
            <h2>Encuéntranos aquí</h2>
            <ul class="program-list">
              ${program.campuses.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        `
            : `
          <article class="program-card">
            <span class="program-section__tag">Asesoría</span>
            <h2>Atención rápida y personalizada</h2>
            <p>
              Nuestro equipo puede orientarte sobre el programa, costos, horarios y
              proceso de inscripción para que tomes una decisión segura.
            </p>
            <div class="program-inline-actions">
              <a class="program-btn program-btn--primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
                Hablar con asesor
              </a>
            </div>
          </article>
        `
        }
      </div>
    </section>
  `;
}

export function renderProgramDetail(program: ProgramData) {
  const whatsappUrl = `https://wa.me/${program.whatsappNumber ?? "51981377382"}?text=${encodeURIComponent(
    program.whatsappMessage
  )}`;

  return `
    <section class="program-premium-hero">
      <div class="container program-premium-hero__grid">
        <div class="program-premium-hero__content">
          <span class="program-premium-hero__eyebrow">Programa Premium</span>
          <h1 class="program-premium-hero__title">${program.title}</h1>
          <p class="program-premium-hero__subtitle">${program.subtitle}</p>

          ${renderHeroHighlights(program)}

          <div class="program-premium-hero__meta">
            <div class="program-meta-box">
              <span>Modalidad</span>
              <strong>${program.modality}</strong>
            </div>
            <div class="program-meta-box">
              <span>Duración</span>
              <strong>${program.duration}</strong>
            </div>
            <div class="program-meta-box">
              <span>Horarios</span>
              <strong>${program.schedule}</strong>
            </div>
          </div>

          <div class="program-premium-hero__actions">
            <a class="program-btn program-btn--primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
              Solicitar informes
            </a>
            ${
              program.brochure
                ? `<a class="program-btn program-btn--secondary" href="${program.brochure}" target="_blank" rel="noopener noreferrer">
                    ${program.brochureLabel ?? "Ver brochure"}
                  </a>`
                : ""
            }
          </div>
        </div>

        <div class="program-premium-hero__visual">
          <div class="program-premium-hero__image-wrap">
            <img src="${program.image}" alt="${program.title}" class="program-premium-hero__image" />
            ${
              program.heroBadge
                ? `<div class="program-premium-hero__badge">${program.heroBadge}</div>`
                : ""
            }
          </div>
        </div>
      </div>
    </section>

    ${renderStatCards(program)}

    <section class="program-section">
      <div class="container program-two-columns">
        <article class="program-card program-card--glass">
          <span class="program-section__tag">Presentación</span>
          <h2>Forma tu perfil profesional</h2>
          <p>${program.description}</p>
          ${
            program.methodology
              ? `<p>${program.methodology}</p>`
              : ""
          }
        </article>

        <article class="program-card program-card--highlight">
          <span class="program-section__tag">Dirigido a</span>
          <h2>Una carrera pensada para crecer</h2>
          <p>${program.audience ?? "Programa dirigido a estudiantes, emprendedores y personas que desean una formación sólida, moderna y con salida laboral."}</p>

          <div class="program-inline-actions">
            <a class="program-btn program-btn--primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">
              Hablar con asesor
            </a>
          </div>
        </article>
      </div>
    </section>

    ${renderBenefits(program)}
    ${renderModules(program)}
    ${renderProfile(program)}
    ${renderInvestment(program)}
    ${renderSchedules(program)}
    ${renderOpportunities(program)}
    ${renderTrustBand(program, whatsappUrl)}
    ${renderContact(program, whatsappUrl)}
  `;
}