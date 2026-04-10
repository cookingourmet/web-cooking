import type { ProgramData, ProgramModule } from "../../data/programs.data";

type ProgramCopy = {
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  aboutTag: string;
  aboutTitle: string;
  aboutText: string;
  curriculumTag: string;
  curriculumTitle: string;
  curriculumSubtitle: string;
  featuresTag: string;
  featuresTitle: string;
  darkTag: string;
  darkTitle: string;
  admissionTag: string;
  admissionTitle: string;
  investmentTitle: string;
  ctaTitle: string;
  ctaText: string;
  primaryAction: string;
  secondaryAction: string;
  brochureAction: string;
  floatingBadge: string;
};

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripProfessionalTitle(title: string) {
  return title.replace(/\s+profesional$/i, "").trim();
}

function buildWhatsAppUrl(program: ProgramData) {
  return `https://wa.me/${program.whatsappNumber ?? "51981377382"}?text=${encodeURIComponent(
    program.whatsappMessage
  )}`;
}

function normalizeModules(modules: ProgramData["modules"]): ProgramModule[] {
  return modules.map((module, index) => {
    if (typeof module === "string") {
      return {
        title: `Módulo ${String(index + 1).padStart(2, "0")}`,
        items: [module],
      };
    }

    return module as ProgramModule;
  });
}

function getProgramCopy(program: ProgramData): ProgramCopy {
  const cleanTitle = stripProfessionalTitle(program.title);
  const slug = program.slug?.toLowerCase?.() ?? "";

  if (slug === "gastronomia") {
    return {
      eyebrow: "Excelencia culinaria",
      heroTitle: cleanTitle,
      heroDescription:
        "Transforma tu pasión por la cocina en una carrera con visión internacional, práctica intensiva y proyección laboral real.",
      aboutTag: "Nosotros",
      aboutTitle: "Formamos talento culinario para escenarios reales",
      aboutText:
        "Desarrollamos profesionales con técnica, creatividad y disciplina, preparados para destacar en restaurantes, hoteles, catering y emprendimientos gastronómicos de alto nivel.",
      curriculumTag: "Malla curricular",
      curriculumTitle: "Plan de estudios especializado",
      curriculumSubtitle:
        "Un recorrido académico diseñado para construir dominio técnico, criterio gastronómico y experiencia práctica.",
      featuresTag: "Formación diferenciada",
      featuresTitle: "Una experiencia de aprendizaje más completa",
      darkTag: "Ruta de ingreso",
      darkTitle: "Requisitos para comenzar",
      admissionTag: "Admisión",
      admissionTitle: "Documentos y beneficios",
      investmentTitle: "Inversión académica",
      ctaTitle: "Da el siguiente paso hacia tu futuro gastronómico",
      ctaText:
        "Recibe asesoría personalizada sobre horarios, costos, matrícula e inicio de clases y asegura tu vacante.",
      primaryAction: "Solicitar informes",
      secondaryAction: "Explorar malla",
      brochureAction: program.brochureLabel ?? "Ver brochure",
      floatingBadge: "Cocina, técnica y proyección profesional",
    };
  }

  if (slug === "pasteleria") {
    return {
      eyebrow: "Potencia tu crecimiento",
      heroTitle: "Pastelería",
      heroDescription:
        "Emprende tu camino con una formación práctica, precisa y creativa para destacar en el mundo de la pastelería profesional.",
      aboutTag: "Nosotros",
      aboutTitle: "Formamos profesionales en pastelería con visión real de negocio",
      aboutText:
        "Destacamos en la formación de especialistas en pastelería con dominio técnico, creatividad y precisión. Nuestra propuesta académica desarrolla bases sólidas para la elaboración de creaciones sofisticadas, decoración, chocolatería, postres de vanguardia y gestión emprendedora.",
      curriculumTag: "Malla curricular",
      curriculumTitle: "Plan de estudios en pastelería",
      curriculumSubtitle:
        "Una formación progresiva para dominar técnicas fundamentales, pastelería avanzada, panadería, chocolatería y desarrollo profesional.",
      featuresTag: "Formación diferenciada",
      featuresTitle: "Aprende, crea y construye tu propio camino",
      darkTag: "Perfil recomendado",
      darkTitle: "¿A quién va dirigido?",
      admissionTag: "Admisión",
      admissionTitle: "Requisitos, horarios e inversión",
      investmentTitle: "Inversión académica",
      ctaTitle: "Inicia y construye tu negocio pastelero",
      ctaText:
        "Solicita información sobre horarios, matrícula, inversión e inicio de clases y prepárate para convertir tu talento en una oportunidad profesional.",
      primaryAction: "Solicitar informes",
      secondaryAction: "Ver malla",
      brochureAction: program.brochureLabel ?? "Ver brochure",
      floatingBadge: "Precisión, técnica y creatividad pastelera",
    };
  }

  if (slug === "barismo") {
    return {
      eyebrow: "Especialización cafetera",
      heroTitle: "Barismo",
      heroDescription:
        "Domina el café desde el origen hasta la taza y conviértete en un profesional capaz de extraer, analizar y servir experiencias memorables.",
      aboutTag: "Especialización",
      aboutTitle: "Conviértete en especialista del café",
      aboutText:
        "Este programa está diseñado para desarrollar competencias técnicas en espresso, leche y espuma, métodos de preparación, cata, tueste y sourcing coffee. Aprenderás a comprender el café de forma integral, desde su origen y perfil sensorial hasta su servicio profesional.",
      curriculumTag: "Plan de estudio",
      curriculumTitle: "Malla curricular de barismo",
      curriculumSubtitle:
        "Una ruta académica enfocada en extracción, análisis sensorial, preparación avanzada y dominio profesional del café.",
      featuresTag: "Ventajas",
      featuresTitle: "Una formación especializada y competitiva",
      darkTag: "Perfil recomendado",
      darkTitle: "¿A quién va dirigido?",
      admissionTag: "Admisión",
      admissionTitle: "Requisitos, uniforme y horarios",
      investmentTitle: "Inversión académica",
      ctaTitle: "Impulsa tu perfil en el mundo del café",
      ctaText:
        "Recibe asesoría sobre matrícula, horarios, costos e inicio de clases y prepárate para destacar en cafeterías, barras de especialidad y emprendimientos del rubro.",
      primaryAction: "Solicitar informes",
      secondaryAction: "Ver plan de estudio",
      brochureAction: program.brochureLabel ?? "Ver brochure",
      floatingBadge: "Café, técnica, análisis y servicio profesional",
    };
  }

  if (slug === "sommelier") {
    return {
      eyebrow: "Sabores, aromas y texturas",
      heroTitle: "Sommelier",
      heroDescription:
        "Desarrolla sensibilidad sensorial, criterio técnico y dominio del vino para sobresalir en servicio, cata, maridaje y asesoría especializada.",
      aboutTag: "Nosotros",
      aboutTitle: "Formamos sommeliers con enfoque técnico y sensorial",
      aboutText:
        "Nuestra formación combina ciencia de la enología y arte de la cata para que el estudiante comprenda el vino en todas sus dimensiones. Se fortalecen habilidades en análisis sensorial, servicio, maridaje y selección de etiquetas con una mirada profesional y actual.",
      curriculumTag: "Malla curricular",
      curriculumTitle: "Plan de estudios en sommelier",
      curriculumSubtitle:
        "Un programa pensado para dominar viticultura, cata, servicio del vino, maridaje, cava y evaluación sensorial.",
      featuresTag: "Formación diferenciada",
      featuresTitle: "Especialización para destacar en el universo del vino",
      darkTag: "Perfil recomendado",
      darkTitle: "¿A quién va dirigido?",
      admissionTag: "Admisión",
      admissionTitle: "Requisitos, certificación e inversión",
      investmentTitle: "Inversión académica",
      ctaTitle: "Especialízate ahora como sommelier profesional",
      ctaText:
        "Solicita información sobre matrícula, horarios, costos y certificación para comenzar tu crecimiento en restaurantes, bodegas, asesoría o proyectos propios.",
      primaryAction: "Solicitar informes",
      secondaryAction: "Explorar malla",
      brochureAction: program.brochureLabel ?? "Ver brochure",
      floatingBadge: "Cata, servicio, maridaje y cultura del vino",
    };
  }

  if (
    slug === "bar-profesional" ||
    slug === "bar_profesional" ||
    slug === "bar"
  ) {
    return {
      eyebrow: "Mejora tu destreza",
      heroTitle: "Bar Profesional",
      heroDescription:
        "Estudia en tiempo récord y desarrolla habilidades en coctelería, mixología, destilados y gestión de bar con enfoque práctico.",
      aboutTag: "Nosotros",
      aboutTitle: "Formación dinámica para dominar la barra profesional",
      aboutText:
        "Somos una escuela orientada a formar bartenders creativos, versátiles y competitivos. Nuestro enfoque práctico permite que cada estudiante domine la preparación de cócteles, el uso de destilados, las técnicas de servicio y la gestión eficiente de barra.",
      curriculumTag: "Malla curricular",
      curriculumTitle: "Plan de estudios de bar profesional",
      curriculumSubtitle:
        "Aprende desde las bases del bartender hasta coctelería avanzada, mixología, costo y rentabilidad del bar.",
      featuresTag: "Formación diferenciada",
      featuresTitle: "Aprendizaje ágil, práctico y orientado al mercado",
      darkTag: "Perfil recomendado",
      darkTitle: "¿A quién va dirigido?",
      admissionTag: "Admisión",
      admissionTitle: "Requisitos, uniforme y horarios",
      investmentTitle: "Inversión académica",
      ctaTitle: "Conviértete en experto en corto tiempo",
      ctaText:
        "Solicita información personalizada sobre horarios, matrícula, inversión e inicio de clases para dar el siguiente paso en coctelería y servicio de bar.",
      primaryAction: "Solicitar informes",
      secondaryAction: "Ver malla",
      brochureAction: program.brochureLabel ?? "Ver brochure",
      floatingBadge: "Coctelería, mixología y servicio profesional",
    };
  }

  return {
    eyebrow: "Programa especializado",
    heroTitle: cleanTitle,
    heroDescription: program.subtitle,
    aboutTag: "Presentación",
    aboutTitle: `Especialízate con ${program.title}`,
    aboutText: program.description,
    curriculumTag: "Plan académico",
    curriculumTitle: "Plan de estudios",
    curriculumSubtitle:
      "Contenido estructurado para desarrollar habilidades prácticas y criterio profesional.",
    featuresTag: "Ventajas",
    featuresTitle: "¿Por qué elegir este programa?",
    darkTag: "Perfil recomendado",
    darkTitle: "¿A quién va dirigido?",
    admissionTag: "Admisión",
    admissionTitle: "Requisitos e inversión",
    investmentTitle: "Inversión académica",
    ctaTitle: `Impulsa tu crecimiento con ${program.title}`,
    ctaText:
      "Solicita información personalizada sobre horarios, matrícula, inversión e inicio de clases.",
    primaryAction: "Solicitar información",
    secondaryAction: "Ver malla",
    brochureAction: program.brochureLabel ?? "Ver brochure",
    floatingBadge: program.heroBadge ?? "Formación práctica aplicada",
  };
}

function renderHero(program: ProgramData, copy: ProgramCopy, whatsappUrl: string) {
  return `
    <section class="program-landing-hero">
      <div class="program-landing-hero__bg">
        <img src="${escapeHtml(program.image)}" alt="${escapeHtml(program.title)}" />
      </div>

      <div class="program-landing-hero__overlay"></div>

      <div class="container program-landing-hero__content">
        <div class="program-landing-hero__text">
          <span class="program-landing-hero__eyebrow">${escapeHtml(copy.eyebrow)}</span>
          <h1>${escapeHtml(copy.heroTitle)}</h1>
          <p class="program-landing-hero__lead">${escapeHtml(copy.heroDescription)}</p>

          <div class="program-landing-hero__actions">
            <a
              class="program-landing-btn program-landing-btn--primary"
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(copy.primaryAction)}
            </a>

            <a
              class="program-landing-btn program-landing-btn--ghost"
              href="#program-curriculum"
            >
              ${escapeHtml(copy.secondaryAction)}
            </a>

            ${
              program.brochure
                ? `
                  <a
                    class="program-landing-btn program-landing-btn--ghost"
                    href="${escapeHtml(program.brochure)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${escapeHtml(copy.brochureAction)}
                  </a>
                `
                : ""
            }
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStats(program: ProgramData) {
  if (!program.stats?.length) return "";

  return `
    <section class="program-landing-stats">
      <div class="container">
        <div class="program-landing-stats__grid">
          ${program.stats
            .map(
              (stat) => `
                <article class="program-landing-stat">
                  <strong>${escapeHtml(stat.value)}</strong>
                  <span>${escapeHtml(stat.label)}</span>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAbout(program: ProgramData, copy: ProgramCopy) {
  const bullets = [
    ...(program.benefits?.slice(0, 2) ?? []),
    ...(program.methodology ? [program.methodology] : []),
  ].slice(0, 3);

  return `
    <section class="program-landing-section program-landing-section--light">
      <div class="container">
        <div class="program-landing-about">
          <div class="program-landing-about__media">
            <div class="program-landing-about__image-wrap">
              <img
                src="${escapeHtml(program.image)}"
                alt="${escapeHtml(program.title)}"
                class="program-landing-about__image"
              />
              <div class="program-landing-about__badge">
                ${escapeHtml(copy.floatingBadge)}
              </div>
            </div>
          </div>

          <div class="program-landing-about__content">
            <span class="program-landing-tag">${escapeHtml(copy.aboutTag)}</span>
            <h2>${escapeHtml(copy.aboutTitle)}</h2>
            <p>${escapeHtml(copy.aboutText)}</p>
            ${
              program.audience
                ? `<p>${escapeHtml(program.audience)}</p>`
                : ""
            }

            ${
              bullets.length
                ? `
                  <ul class="program-landing-bullets">
                    ${bullets
                      .map((item) => `<li>${escapeHtml(item)}</li>`)
                      .join("")}
                  </ul>
                `
                : ""
            }
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCurriculum(program: ProgramData, copy: ProgramCopy) {
  const modules = normalizeModules(program.modules);

  if (!modules.length) return "";

  return `
    <section class="program-landing-section program-landing-section--soft" id="program-curriculum">
      <div class="container">
        <div class="program-landing-heading program-landing-heading--center">
          <span class="program-landing-tag">${escapeHtml(copy.curriculumTag)}</span>
          <h2>${escapeHtml(copy.curriculumTitle)}</h2>
          <p>${escapeHtml(copy.curriculumSubtitle)}</p>
        </div>

        <div class="program-landing-curriculum">
          ${modules
            .map(
              (module, index) => `
                <article class="program-landing-module-card">
                  <div class="program-landing-module-card__number">
                    ${String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>${escapeHtml(module.title)}</h3>
                  <ul>
                    ${module.items
                      .map((item) => `<li>${escapeHtml(item)}</li>`)
                      .join("")}
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

function renderFeatureCards(program: ProgramData, copy: ProgramCopy) {
  const jobPreview = program.opportunities?.slice(0, 3).join(", ");

  const cards = [
    {
      icon: "✦",
      title: "Formación intensiva",
      text:
        program.methodology ??
        "Aprendizaje práctico con acompañamiento cercano, enfoque técnico y preparación aplicada al trabajo real.",
    },
    {
      icon: "◈",
      title: "Salida laboral",
      text: jobPreview
        ? `Proyección en ${jobPreview} y otros espacios del sector.`
        : "Proyección laboral en negocios, restaurantes y espacios especializados del rubro.",
    },
    {
      icon: "◉",
      title: "Horarios flexibles",
      text: program.schedule
        ? `Disponibilidad en ${program.schedule} para adaptarse a tu ritmo.`
        : "Horarios pensados para compatibilizar estudio, trabajo y crecimiento profesional.",
    },
  ];

  return `
    <section class="program-landing-section program-landing-section--light">
      <div class="container">
        <div class="program-landing-heading">
          <span class="program-landing-tag">${escapeHtml(copy.featuresTag)}</span>
          <h2>${escapeHtml(copy.featuresTitle)}</h2>
          <p>
            Una propuesta académica diseñada para brindarte técnica, experiencia,
            empleabilidad y una formación más competitiva.
          </p>
        </div>

        <div class="program-landing-feature-grid">
          ${cards
            .map(
              (card) => `
                <article class="program-landing-feature-card">
                  <div class="program-landing-feature-card__icon">${card.icon}</div>
                  <h3>${escapeHtml(card.title)}</h3>
                  <p>${escapeHtml(card.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDarkPanel(program: ProgramData, copy: ProgramCopy) {
  const items = (
    program.profile?.length ? program.profile : program.requirements ?? []
  ).slice(0, 3);

  if (!items.length) return "";

  return `
    <section class="program-landing-section program-landing-section--dark">
      <div class="container">
        <div class="program-landing-dark-panel">
          <span class="program-landing-dark-panel__eyebrow">${escapeHtml(copy.darkTag)}</span>
          <h2>${escapeHtml(copy.darkTitle)}</h2>

          <ul>
            ${items
              .map(
                (item, index) => `
                  <li>
                    <strong>0${index + 1}.</strong>
                    <span>${escapeHtml(item)}</span>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderAdmission(program: ProgramData, copy: ProgramCopy, whatsappUrl: string) {
  const investment = program.investment;
  const opportunities = program.opportunities?.slice(0, 4) ?? [];

  return `
    <section class="program-landing-section program-landing-section--white">
      <div class="container">
        <div class="program-landing-admission">
          <div class="program-landing-admission__left">
            <span class="program-landing-tag">${escapeHtml(copy.admissionTag)}</span>
            <h2>${escapeHtml(copy.admissionTitle)}</h2>

            ${
              program.requirements?.length
                ? `
                  <div class="program-landing-requirements">
                    ${program.requirements
                      .map(
                        (item) => `
                          <article class="program-landing-requirement-item">
                            <div class="program-landing-requirement-item__icon">•</div>
                            <div>
                              <strong>${escapeHtml(item)}</strong>
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                `
                : ""
            }

            ${
              opportunities.length
                ? `
                  <div class="program-landing-jobs">
                    <h3>Bolsa de trabajo</h3>
                    <div class="program-landing-jobs__grid">
                      ${opportunities
                        .map((item) => `<span>${escapeHtml(item)}</span>`)
                        .join("")}
                    </div>
                  </div>
                `
                : ""
            }
          </div>

          <aside class="program-landing-investment">
            <span class="program-landing-investment__ribbon">Matrícula abierta</span>
            <h3>${escapeHtml(copy.investmentTitle)}</h3>

            <div class="program-landing-investment__list">
              <div>
                <span>Inscripción única</span>
                <strong>${escapeHtml(investment?.inscription ?? "Consultar")}</strong>
              </div>
              <div>
                <span>Matrícula</span>
                <strong>${escapeHtml(investment?.enrollment ?? "Consultar")}</strong>
              </div>
              <div>
                <span>Mensualidad</span>
                <strong>${escapeHtml(investment?.monthly ?? "Consultar")}</strong>
              </div>
              ${
                investment?.uniform
                  ? `
                    <div>
                      <span>Uniforme</span>
                      <strong>${escapeHtml(investment.uniform)}</strong>
                    </div>
                  `
                  : ""
              }
            </div>

            <p class="program-landing-investment__note">
              *Incluye orientación personalizada sobre horarios, matrícula y proceso de inscripción.
            </p>

            <a
              class="program-landing-btn program-landing-btn--primary"
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(copy.primaryAction)}
            </a>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderCta(program: ProgramData, copy: ProgramCopy, whatsappUrl: string) {
  return `
    <section class="program-landing-section program-landing-section--cta">
      <div class="container">
        <div class="program-landing-cta">
          <div>
            <h2>${escapeHtml(copy.ctaTitle)}</h2>
            <p>${escapeHtml(copy.ctaText)}</p>
          </div>

          <div class="program-landing-cta__actions">
            <a
              class="program-landing-btn program-landing-btn--primary"
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(copy.primaryAction)}
            </a>

            ${
              program.brochure
                ? `
                  <a
                    class="program-landing-btn program-landing-btn--ghost"
                    href="${escapeHtml(program.brochure)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${escapeHtml(copy.brochureAction)}
                  </a>
                `
                : ""
            }
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderProgramDetail(program: ProgramData) {
  const copy = getProgramCopy(program);
  const whatsappUrl = buildWhatsAppUrl(program);

  return `
    ${renderHero(program, copy, whatsappUrl)}
    ${renderStats(program)}
    ${renderAbout(program, copy)}
    ${renderCurriculum(program, copy)}
    ${renderFeatureCards(program, copy)}
    ${renderDarkPanel(program, copy)}
    ${renderAdmission(program, copy, whatsappUrl)}
    ${renderCta(program, copy, whatsappUrl)}
  `;
}