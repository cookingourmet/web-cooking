import "./about.css";

const WHATSAPP_NUMBER = "51981377382";

function aboutWhatsAppUrl() {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    "Quiero información sobre sus programas presenciales en Huancayo.",
    "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function renderAboutSection() {
  return `
    <section class="cg-about cg-about--compact" id="nosotros" aria-labelledby="cg-about-title">
      <div class="cg-about__bg"></div>
      <div class="cg-about__shape cg-about__shape--one"></div>
      <div class="cg-about__shape cg-about__shape--two"></div>

      <div class="cg-about__container">
        <div class="cg-about-hero">
          <div class="cg-about-hero__content" data-reveal style="--reveal-delay: 40ms">
            <span class="cg-about__eyebrow">Cooking Gourmet</span>

            <h2 class="cg-about__title" id="cg-about-title">
              18 años formando talento gastronómico en Huancayo
            </h2>

            <p class="cg-about__lead">
              Desde 2008 brindamos formación presencial y práctica para quienes
              quieren aprender, especializarse, trabajar o emprender en el mundo
              gastronómico.
            </p>

            <div
              class="cg-about-seo-list"
              aria-label="Programas principales de Cooking Gourmet en Huancayo"
            >
              <a href="/programas/gastronomia">Gastronomía</a>
              <a href="/programas/pasteleria">Pastelería</a>
              <a href="/programas/barismo">Barismo</a>
              <a href="/programas/bar-profesional">Bar Profesional</a>
              <a href="/programas/sommelier">Sommelier</a>
              <a href="/programas/cocina-acelerada">Cocina Acelerada</a>
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
                data-track-event="home_about_whatsapp_click"
              >
                Hablar con admisión
              </a>
            </div>
          </div>

          <div class="cg-about-hero__visual" data-reveal style="--reveal-delay: 120ms">
            <div class="cg-about-photo-card cg-about-photo-card--chef">
              <img
                src="/images/about/chef.png"
                alt="Chef instructor de Cooking Gourmet durante una clase práctica en Huancayo"
                loading="lazy"
                decoding="async"
              />

              <div class="cg-about-photo-card__content">
                <span>Aprender haciendo</span>
                <strong>Formación práctica y presencial</strong>
              </div>
            </div>

            <div class="cg-about-years">
              <span class="cg-about-years__label">Desde 2008</span>
              <strong>18</strong>
              <span>años de trayectoria</span>
            </div>

            <div class="cg-about-mini-card cg-about-mini-card--top">
              <strong>Huancayo · Junín</strong>
              <span>Formación gastronómica presencial</span>
            </div>

            <div class="cg-about-mini-card cg-about-mini-card--bottom">
              <strong>Práctica real</strong>
              <span>Cocina, pastelería, café y barra</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
