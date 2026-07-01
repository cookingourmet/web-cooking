import "./about.css";

type AboutIcon = "fire" | "chef" | "star" | "growth" | "team" | "service";

const WHATSAPP_NUMBER = "51981377382";

function aboutWhatsAppUrl() {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    "Quiero información sobre sus programas de Gastronomía, Pastelería, Barismo, Bar Profesional, Sommelier y Cocina Acelerada en Huancayo.",
    "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const values: Array<{
  icon: AboutIcon;
  title: string;
  text: string;
}> = [
  {
    icon: "star",
    title: "Excelencia",
    text: "Cuidamos cada detalle del aprendizaje, la técnica culinaria y la práctica profesional.",
  },
  {
    icon: "chef",
    title: "Disciplina",
    text: "Formamos estudiantes responsables, constantes y preparados para cocinas reales.",
  },
  {
    icon: "fire",
    title: "Pasión",
    text: "Impulsamos el amor por la gastronomía desde la práctica, la creatividad y la vocación.",
  },
  {
    icon: "growth",
    title: "Innovación",
    text: "Promovemos nuevas ideas, tendencias gastronómicas y visión emprendedora.",
  },
  {
    icon: "team",
    title: "Trabajo en equipo",
    text: "Fortalecemos la comunicación, la colaboración y el crecimiento conjunto.",
  },
  {
    icon: "service",
    title: "Vocación de servicio",
    text: "Formamos profesionales con actitud humana y enfoque en la experiencia del cliente.",
  },
];

function renderIcon(icon: AboutIcon) {
  const icons: Record<AboutIcon, string> = {
    fire: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22c4.2 0 7-2.8 7-6.8 0-2.8-1.7-5.3-3.4-7.2-.5 2.6-1.8 3.8-3 4.4.3-3.6-1.7-6.6-4.4-9.4.1 4-2.2 6.1-3.1 8.1-.7 1.3-1.1 2.6-1.1 4.1C5 19.2 7.8 22 12 22z"/>
      </svg>
    `,
    chef: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 11.2C4.6 10.8 3 9.3 3 7.3 3 5.1 4.8 3.5 6.9 3.5c.8 0 1.5.2 2.1.6A4.3 4.3 0 0 1 12 3a4.3 4.3 0 0 1 3 1.1c.6-.4 1.3-.6 2.1-.6 2.1 0 3.9 1.6 3.9 3.8 0 2-1.6 3.5-3.5 3.9"/>
        <path d="M6.5 11v7.2c0 1.1.9 1.8 1.9 1.8h7.2c1 0 1.9-.7 1.9-1.8V11"/>
        <path d="M9 15h6"/>
      </svg>
    `,
    star: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/>
      </svg>
    `,
    growth: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19h16"/>
        <path d="M6 16l4-4 3 3 5-7"/>
        <path d="M15 8h3v3"/>
      </svg>
    `,
    team: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M17 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
        <path d="M3.5 20c.7-3.2 2.7-5 5.5-5s4.8 1.8 5.5 5"/>
        <path d="M14 17c.8-1 1.8-1.5 3-1.5 2 0 3.3 1.2 3.8 3.5"/>
      </svg>
    `,
    service: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-7-4.3-7-10a4.2 4.2 0 0 1 7-3.1A4.2 4.2 0 0 1 19 11c0 5.7-7 10-7 10z"/>
        <path d="M9 12h6"/>
      </svg>
    `,
  };

  return icons[icon];
}

function renderValues() {
  return values
    .map(
      (value) => `
        <article class="cg-about-value">
          <div class="cg-about-value__icon">
            ${renderIcon(value.icon)}
          </div>
          <h4>${value.title}</h4>
          <p>${value.text}</p>
        </article>
      `
    )
    .join("");
}

export function renderAboutSection() {
  return `
    <section class="cg-about" id="nosotros" aria-labelledby="cg-about-title">
      <div class="cg-about__bg"></div>
      <div class="cg-about__shape cg-about__shape--one"></div>
      <div class="cg-about__shape cg-about__shape--two"></div>

      <div class="cg-about__container">
        <div class="cg-about-hero">
          <div class="cg-about-hero__content" data-cg-about-reveal="left">
            <span class="cg-about__eyebrow">Nosotros</span>

            <h2 class="cg-about__title" id="cg-about-title">
              Escuela de alta cocina en Huancayo con 18 años formando profesionales
            </h2>

            <p class="cg-about__lead">
              Cooking Gourmet es una escuela de gastronomía en Huancayo especializada
              en formación práctica y presencial. Formamos estudiantes de Huancayo,
              El Tambo, Chilca y toda la región Junín en programas de Gastronomía
              Profesional, Pastelería, Barismo, Bar Profesional, Sommelier y Cocina Acelerada.
            </p>

            <div class="cg-about-seo-list" aria-label="Programas principales">
              <a href="/programas/gastronomia">Gastronomía Profesional</a>
              <a href="/programas/pasteleria">Pastelería</a>
              <a href="/programas/barismo">Barismo</a>
              <a href="/programas/bar-profesional">Bar Profesional</a>
            </div>

            <div class="cg-about-hero__actions">
              <a href="#programas" class="cg-about-btn cg-about-btn--primary">
                Ver programas
              </a>

              <a
                href="${aboutWhatsAppUrl()}"
                class="cg-about-btn cg-about-btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar información
              </a>
            </div>
          </div>

          <div class="cg-about-hero__visual" data-cg-about-reveal="right">
            <div class="cg-about-photo-card cg-about-photo-card--chef">
              <img
                src="/images/about/chef.png"
                alt="Chef instructor de Cooking Gourmet enseñando gastronomía profesional en Huancayo"
                loading="lazy"
                decoding="async"
              />

              <div class="cg-about-photo-card__content">
                <span>Formación práctica</span>
                <strong>Aprende con experiencia real desde el primer día</strong>
              </div>
            </div>

            <div class="cg-about-years">
              <span class="cg-about-years__label">Desde 2008</span>
              <strong>18</strong>
              <span>Años de trayectoria en Huancayo</span>
            </div>

            <div class="cg-about-mini-card cg-about-mini-card--top">
              <strong>Huancayo · Junín</strong>
              <span>Formación gastronómica presencial para la región</span>
            </div>

            <div class="cg-about-mini-card cg-about-mini-card--bottom">
              <strong>Práctica real</strong>
              <span>Cocina, pastelería, bar y café con aprendizaje aplicado</span>
            </div>
          </div>
        </div>

        <div class="cg-about__main">
          <article class="cg-about-story" data-cg-about-reveal="up">
            <div class="cg-about-story__top">
              <span class="cg-about-story__badge">Nuestra historia</span>
              <span class="cg-about-story__years">2008 — 2026</span>
            </div>

            <h3 class="cg-about-story__title">
              Formamos profesionales para la cocina real y el mundo gastronómico actual.
            </h3>

            <p class="cg-about-story__text">
              Nacimos con el propósito de brindar una formación gastronómica cercana,
              práctica y exigente en Huancayo. Hoy seguimos impulsando estudiantes que
              desean convertir su vocación en una carrera con identidad, técnica, nivel
              profesional y oportunidades en restaurantes, hoteles, cafeterías, bares,
              catering y emprendimientos propios.
            </p>

            <div class="cg-about-location">
              <span>Alcance regional</span>
              <p>
                Recibimos estudiantes de Huancayo, El Tambo, Chilca, Chupaca,
                Concepción, Jauja, Tarma, Chanchamayo, Satipo y otras zonas de Junín.
              </p>
            </div>

            <div class="cg-about-infra">
              <img
                src="/images/about/infraestructura.png"
                alt="Ambientes e infraestructura de Cooking Gourmet para estudiar gastronomía en Huancayo"
                loading="lazy"
                decoding="async"
              />

              <div class="cg-about-infra__content">
                <span>Infraestructura profesional</span>
                <strong>Ambientes preparados para aprender haciendo</strong>
              </div>
            </div>

            <div class="cg-about-timeline">
              <div class="cg-about-timeline__item">
                <span>2008</span>
                <p>Inicio de una propuesta educativa enfocada en técnica, práctica y disciplina.</p>
              </div>

              <div class="cg-about-timeline__item">
                <span>Trayectoria</span>
                <p>Estudiantes formados con creatividad, exigencia y pasión por la gastronomía.</p>
              </div>

              <div class="cg-about-timeline__item">
                <span>2026</span>
                <p>18 años fortaleciendo el talento gastronómico de Huancayo y Junín.</p>
              </div>
            </div>
          </article>

          <div class="cg-about__side">
            <article class="cg-about-card" data-cg-about-reveal="right">
              <span class="cg-about-card__tag">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3" />
                  <path d="M12 19v3" />
                  <path d="M2 12h3" />
                  <path d="M19 12h3" />
                </svg>
                Misión
              </span>

              <h3 class="cg-about-card__title">
                Formar expertos competitivos y emprendedores
              </h3>

              <p class="cg-about-card__text">
                Ofrecemos formación práctica y creativa en cocina, pastelería,
                barismo, bar profesional y servicio gastronómico, impulsando el
                crecimiento de futuros profesionales y emprendedores.
              </p>
            </article>

            <article class="cg-about-card cg-about-card--accent" data-cg-about-reveal="right">
              <span class="cg-about-card__tag">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Visión
              </span>

              <h3 class="cg-about-card__title">
                Liderar la educación gastronómica en Junín
              </h3>

              <p class="cg-about-card__text">
                Buscamos ser una institución referente, innovadora y conectada con
                las tendencias actuales del sector gastronómico, manteniendo una
                formación presencial, técnica y orientada al trabajo real.
              </p>
            </article>

            <article class="cg-about-card cg-about-card--dark" data-cg-about-reveal="right">
              <span class="cg-about-card__tag">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 19h16" />
                  <path d="M6 16l4-4 3 3 5-7" />
                  <path d="M15 8h3v3" />
                </svg>
                Programas
              </span>

              <h3 class="cg-about-card__title">
                Formación para diferentes metas profesionales
              </h3>

              <p class="cg-about-card__text">
                Nuestros programas están orientados a quienes desean trabajar,
                emprender o especializarse en gastronomía, pastelería, cafetería,
                coctelería y servicio especializado.
              </p>
            </article>
          </div>
        </div>

        <div class="cg-about-values" data-cg-about-reveal="up">
          <div class="cg-about-values__header">
            <span class="cg-about__eyebrow">Nuestros valores</span>
            <h3 class="cg-about-values__title">
              La esencia que guía nuestra formación gastronómica
            </h3>
          </div>

          <div class="cg-about-values__grid">
            ${renderValues()}
          </div>
        </div>
      </div>
    </section>
  `;
}