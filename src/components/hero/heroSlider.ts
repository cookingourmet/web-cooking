import { ADMISSION } from "../../data/admission.data";
import { programsData } from "../../data/programs.data";

export function renderHeroSlider() {
  return `
    <section class="admission-hero" aria-labelledby="admission-title">
      <div class="container admission-hero__grid">
        <div class="admission-hero__copy">
          <p class="admission-kicker">Cooking Gourmet · Huancayo</p>
          <h1 id="admission-title">Tu pasión por la cocina,<br/><span>tu próximo paso.</span></h1>
          <p class="admission-hero__lead">Fórmate en Gastronomía, Pastelería o Bar Profesional con clases presenciales y aprendizaje práctico.</p>
          <div class="admission-date">
            <span>Nuevo inicio de clases</span>
            <time datetime="${ADMISSION.date}">${ADMISSION.shortLabel}<small>2026</small></time>
          </div>
          <div class="admission-actions">
            <a class="admission-button" href="#programas">Elegir mi programa <span aria-hidden="true">↗</span></a>
            <a class="admission-text-link" href="https://wa.me/51981377382?text=${encodeURIComponent(`Hola, quiero consultar los horarios y costos del inicio del ${ADMISSION.label} en Gastronomía, Pastelería o Bar Profesional.`)}" target="_blank" rel="noopener noreferrer" data-cta-location="home_hero">Consultar horarios</a>
          </div>
          <p class="admission-hero__location">Av. Ferrocarril 587, Huancayo · Formación presencial</p>
        </div>
        <div class="admission-hero__visual">
          <img src="/images/portada/gastronomia.jpg" alt="Gastronomía en Cooking Gourmet, Huancayo" width="1368" height="1279" fetchpriority="high" decoding="async" />
          <div class="admission-hero__caption"><span>Aprende haciendo</span><strong>Desde 2008 en Huancayo</strong></div>
        </div>
      </div>
      <nav class="container admission-programs" aria-label="Programas con inicio el 16 de noviembre">
        ${ADMISSION.programs.map((key, index) => {
          const program = programsData[key];
          return `<a href="${program.path}"><span class="admission-programs__number">0${index + 1}</span><span><strong>${program.title}</strong><small>${program.duration} · Presencial</small></span><span aria-hidden="true">↗</span></a>`;
        }).join("")}
      </nav>
    </section>`;
}

export function initHeroSlider() {}
