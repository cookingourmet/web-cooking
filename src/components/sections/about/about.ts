import "./about.css";

export function renderAboutSection() {
  return `
    <section class="cg-about" id="nosotros">
      <div class="cg-about__bg"></div>
      <div class="cg-about__grid"></div>

      <div class="cg-about__container">
        <div class="cg-about__header" data-cg-about-reveal="up">
          <span class="cg-about__eyebrow">Nosotros</span>
          <h2 class="cg-about__title">
            18 años formando profesionales con pasión, técnica y visión gastronómica
          </h2>
          <p class="cg-about__lead">
            Cooking Gourmet Escuela de Alta Cocina celebra en 2026 sus 18 años de trayectoria,
            consolidándose como un espacio de formación donde la disciplina, la creatividad y la
            experiencia real se unen para preparar a los nuevos talentos de la gastronomía.
          </p>
        </div>

        <div class="cg-about__main">
          <article class="cg-about-story" data-cg-about-reveal="left">
            <div class="cg-about-story__glow"></div>

            <div class="cg-about-story__top">
              <span class="cg-about-story__badge">Desde 2008</span>
              <span class="cg-about-story__years">18 años · 2026</span>
            </div>

            <h3 class="cg-about-story__title">Nuestra historia</h3>

            <p class="cg-about-story__text">
              Cooking Gourmet nació con el propósito de impulsar una formación gastronómica más
              cercana a la realidad profesional, combinando técnica, práctica constante y una
              enseñanza inspirada en la excelencia.
            </p>

            <p class="cg-about-story__text">
              A lo largo de estos años, hemos acompañado a cientos de estudiantes en su crecimiento
              académico y humano, ayudándolos a convertir su vocación en una carrera con identidad,
              nivel y proyección.
            </p>

            <div class="cg-about-story__stats">
              <div class="cg-about-stat">
                <strong>18</strong>
                <span>Años de trayectoria</span>
              </div>

              <div class="cg-about-stat">
                <strong>Alta</strong>
                <span>Formación práctica</span>
              </div>

              <div class="cg-about-stat">
                <strong>Real</strong>
                <span>Experiencia aplicada</span>
              </div>
            </div>
          </article>

          <div class="cg-about__side">
            <article class="cg-about-card" data-cg-about-reveal="right">
              <span class="cg-about-card__tag">Misión</span>
              <h3 class="cg-about-card__title">Formar profesionales íntegros y competitivos</h3>
              <p class="cg-about-card__text">
                Brindar una formación gastronómica de alta calidad, centrada en el desarrollo de
                competencias técnicas, creatividad, disciplina y vocación de servicio, preparando
                estudiantes capaces de destacar en cocinas, pastelerías, barras y emprendimientos
                del sector gastronómico.
              </p>
            </article>

            <article class="cg-about-card cg-about-card--accent" data-cg-about-reveal="right">
              <span class="cg-about-card__tag">Visión</span>
              <h3 class="cg-about-card__title">Ser una escuela referente en formación gastronómica</h3>
              <p class="cg-about-card__text">
                Ser reconocidos como una institución líder en educación culinaria, innovadora,
                inspiradora y conectada con las exigencias del mundo gastronómico actual, formando
                profesionales capaces de transformar su talento en oportunidades reales.
              </p>
            </article>
          </div>
        </div>

        <div class="cg-about-values" data-cg-about-reveal="up">
          <div class="cg-about-values__header">
            <span class="cg-about__eyebrow">Nuestros valores</span>
            <h3 class="cg-about-values__title">La esencia que guía nuestra formación</h3>
          </div>

          <div class="cg-about-values__grid">
            <article class="cg-about-value">
              <div class="cg-about-value__icon">01</div>
              <h4>Excelencia</h4>
              <p>Buscamos calidad en cada detalle del aprendizaje y la práctica profesional.</p>
            </article>

            <article class="cg-about-value">
              <div class="cg-about-value__icon">02</div>
              <h4>Disciplina</h4>
              <p>Fomentamos constancia, responsabilidad y respeto por el proceso de formación.</p>
            </article>

            <article class="cg-about-value">
              <div class="cg-about-value__icon">03</div>
              <h4>Pasión</h4>
              <p>Creemos en una enseñanza que impulse el amor auténtico por la gastronomía.</p>
            </article>

            <article class="cg-about-value">
              <div class="cg-about-value__icon">04</div>
              <h4>Innovación</h4>
              <p>Promovemos ideas nuevas, creatividad y adaptación a las tendencias del sector.</p>
            </article>

            <article class="cg-about-value">
              <div class="cg-about-value__icon">05</div>
              <h4>Trabajo en equipo</h4>
              <p>Valoramos la colaboración, la comunicación y el crecimiento conjunto.</p>
            </article>

            <article class="cg-about-value">
              <div class="cg-about-value__icon">06</div>
              <h4>Vocación de servicio</h4>
              <p>Formamos profesionales con actitud humana, compromiso y enfoque en la experiencia.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  `;
}