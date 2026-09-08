import { ADMISSION } from "../../data/admission.data";
import { programsData, type ProgramKey } from "../../data/programs.data";
import { trackEvent } from "../../utils/analytics";

let disposeSlider: (() => void) | undefined;

const WHATSAPP = "https://wa.me/51981377382?text=";
const whatsapp = (message: string) => `${WHATSAPP}${encodeURIComponent(message)}`;
const programOrder: ProgramKey[] = ["gastronomia", "pasteleria", "bar-profesional", "barismo", "sommelier", "cocina"];

function renderProgramSlide(key: ProgramKey, index: number) {
  const program = programsData[key];
  const heading = index === 0
    ? `<h1>${program.title}</h1>`
    : `<h2>${program.title}</h2>`;
  return `
    <article class="cg-hero-slide cg-hero-slide--program ${index === 0 ? "is-active" : ""}" data-hero-slide aria-hidden="${index !== 0}" data-program-id="${program.slug}">
      <div class="cg-hero-slide__media">
        <img src="${program.image}" alt="${program.title} en Cooking Gourmet Huancayo" width="1368" height="1279" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
      </div>
      <div class="container cg-hero-slide__content">
        <div class="cg-hero-copy">
          <span class="cg-hero-kicker">${index < 3 ? `Admisión 2026 · Inicio ${ADMISSION.shortLabel}` : "Programa presencial · Huancayo"}</span>
          ${heading}
          <p>Formación práctica para convertir tu talento en una profesión.</p>
          <div class="cg-hero-meta" aria-label="Información del programa">
            <span><small>Duración</small><strong>${program.duration}</strong></span>
            <span><small>Modalidad</small><strong>${program.modality}</strong></span>
            <span><small>Sede</small><strong>Huancayo</strong></span>
          </div>
          <div class="cg-hero-actions">
            <a class="cg-hero-btn cg-hero-btn--primary" href="${program.path}" data-track-event="hero_program_click" data-program-id="${program.slug}">Conocer programa</a>
            <a class="cg-hero-btn cg-hero-btn--light" href="${whatsapp(program.whatsappMessage)}" target="_blank" rel="noopener noreferrer" data-cta-location="hero_program" data-program-id="${program.slug}">Solicitar información</a>
          </div>
        </div>
      </div>
    </article>`;
}

export function renderHeroSlider() {
  const programs = programOrder.map(renderProgramSlide).join("");
  const workshopIndex = programOrder.length;
  return `
    <section class="cg-hero" aria-label="Programas y talleres de Cooking Gourmet">
      <div class="cg-hero__viewport">
        ${programs}
        <article class="cg-hero-slide cg-hero-slide--workshops" data-hero-slide aria-hidden="true">
          <div class="container cg-workshop-hero">
            <div class="cg-workshop-hero__copy">
              <span class="cg-hero-kicker">Talleres prácticos</span>
              <h2>Aprende algo nuevo.</h2>
              <p>Cocina Peruana, Pastelería Comercial y Petit Four.</p>
              <a class="cg-hero-btn cg-hero-btn--primary" href="${whatsapp("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre los nuevos talleres de Cocina Peruana, Pastelería Comercial y Petit Four.")}" target="_blank" rel="noopener noreferrer" data-cta-location="hero_workshops">Ver talleres</a>
            </div>
            <div class="cg-workshop-covers" aria-label="Talleres disponibles">
              <a href="${whatsapp("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre el taller de Cocina Peruana.")}" target="_blank" rel="noopener noreferrer" class="cg-workshop-cover" data-workshop-id="cocina-peruana" data-cta-location="hero_workshops"><img src="/images/portada/talleres/cocina-peruana.jpg" alt="Taller de Cocina Peruana" width="900" height="1200" loading="lazy" /><span>Cocina Peruana</span></a>
              <a href="${whatsapp("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre el taller de Pastelería Comercial.")}" target="_blank" rel="noopener noreferrer" class="cg-workshop-cover" data-workshop-id="pasteleria-comercial" data-cta-location="hero_workshops"><img src="/images/portada/nuevos-talleres/pasteleria-comercial.jpeg" alt="Taller de Pastelería Comercial" width="1182" height="1600" loading="lazy" /><span>Pastelería Comercial</span></a>
              <a href="${whatsapp("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre el taller Petit Four.")}" target="_blank" rel="noopener noreferrer" class="cg-workshop-cover" data-workshop-id="petit-four" data-cta-location="hero_workshops"><img src="/images/portada/nuevos-talleres/petit-four.jpeg" alt="Taller Petit Four" width="1182" height="1600" loading="lazy" /><span>Petit Four</span></a>
            </div>
          </div>
        </article>
      </div>
      <div class="container cg-hero-nav" aria-label="Navegación del carrusel">
        <div class="cg-hero-dots" role="tablist">
          ${programOrder.map((key, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-hero-dot aria-label="Ver ${programsData[key].title}" aria-selected="${index === 0}"><span></span>${programsData[key].title.replace(" Profesional", "")}</button>`).join("")}
          <button type="button" data-hero-dot aria-label="Ver talleres" aria-selected="false"><span></span>Talleres</button>
        </div>
        <div class="cg-hero-arrows"><button type="button" data-hero-pause aria-label="Pausar carrusel" aria-pressed="false">Ⅱ</button><button type="button" data-hero-prev aria-label="Anterior">←</button><span data-hero-count>01 / 0${workshopIndex + 1}</span><button type="button" data-hero-next aria-label="Siguiente">→</button></div>
      </div>
    </section>`;
}

export function initHeroSlider() {
  disposeSlider?.();
  const slides = [...document.querySelectorAll<HTMLElement>("[data-hero-slide]")];
  const dots = [...document.querySelectorAll<HTMLButtonElement>("[data-hero-dot]")];
  const counter = document.querySelector<HTMLElement>("[data-hero-count]");
  if (slides.length < 2) return;
  let index = 0;
  let timer = 0;
  let paused = false;
  let pointerX = 0;
  const root = document.querySelector<HTMLElement>(".cg-hero");
  const pause = document.querySelector<HTMLButtonElement>("[data-hero-pause]");
  const show = (next: number, interaction?: string) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { const active = i === index; slide.classList.toggle("is-active", active); slide.setAttribute("aria-hidden", String(!active)); });
    dots.forEach((dot, i) => { const active = i === index; dot.classList.toggle("is-active", active); dot.setAttribute("aria-selected", String(active)); });
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    if (interaction) trackEvent("hero_slide_select", { program_id: slides[index].dataset.programId, cta_location: `hero_${interaction}${index === programOrder.length ? "_workshops" : ""}` });
  };
  const restart = () => { window.clearInterval(timer); if (!paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = window.setInterval(() => show(index + 1), 6500); };
  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i, "dot"); restart(); }));
  document.querySelector("[data-hero-prev]")?.addEventListener("click", () => { show(index - 1, "previous"); restart(); });
  document.querySelector("[data-hero-next]")?.addEventListener("click", () => { show(index + 1, "next"); restart(); });
  pause?.addEventListener("click", () => { paused = !paused; pause.setAttribute("aria-pressed", String(paused)); pause.setAttribute("aria-label", paused ? "Reanudar carrusel" : "Pausar carrusel"); pause.textContent = paused ? "▶" : "Ⅱ"; restart(); });
  root?.addEventListener("mouseenter", () => window.clearInterval(timer));
  root?.addEventListener("mouseleave", restart);
  root?.addEventListener("focusin", () => window.clearInterval(timer));
  root?.addEventListener("focusout", restart);
  root?.addEventListener("keydown", event => { if (event.key === "ArrowLeft") show(index - 1, "keyboard"); if (event.key === "ArrowRight") show(index + 1, "keyboard"); });
  root?.addEventListener("pointerdown", event => { pointerX = event.clientX; });
  root?.addEventListener("pointerup", event => { const delta = event.clientX - pointerX; if (Math.abs(delta) > 55) { show(index + (delta < 0 ? 1 : -1), "swipe"); restart(); } });
  const cleanup = () => { window.clearInterval(timer); window.removeEventListener("cg:route-change", routeChanged); };
  const routeChanged = () => { if (!root?.isConnected) cleanup(); };
  disposeSlider = cleanup;
  window.addEventListener("cg:route-change", routeChanged);
  restart();
}
