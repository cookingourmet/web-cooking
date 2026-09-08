import "./about.css";

export function renderAboutSection() {
  return `
    <section class="cg-about" id="nosotros" aria-labelledby="cg-about-title">
      <div class="cg-about__container">
        <div class="cg-about__image">
          <img src="/images/about/chef.png" alt="Chefs de Cooking Gourmet en Huancayo" loading="lazy" decoding="async" />
          <span>Desde 2008</span>
        </div>
        <div class="cg-about__content">
          <span class="cg-about__eyebrow">Cooking Gourmet</span>
          <h2 id="cg-about-title">Aprender haciendo cambia tu futuro.</h2>
          <p>Formación presencial, práctica y conectada con el mundo gastronómico.</p>
          <div class="cg-about__facts">
            <div><strong>Desde 2008</strong><span>formando talento</span></div>
            <div><strong>Presencial</strong><span>práctica desde el inicio</span></div>
            <div><strong>Huancayo</strong><span>Av. Ferrocarril 587</span></div>
          </div>
          <a href="#programas">Conoce nuestros programas <span>→</span></a>
        </div>
      </div>
    </section>`;
}
