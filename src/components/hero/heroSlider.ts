import { workshopCampaigns, workshopCampaignWhatsAppUrl } from "../../data/workshopCampaigns.data";
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

function renderWorkshopPromoSlide() {
  const first = workshopCampaigns[0];
  return `
    <article class="cg-hero-slide cg-hero-slide--workshops" data-hero-slide data-campaign-slide aria-hidden="true">
      <div class="container cg-workshop-hero cg-workshop-hero--campaign">
        <div class="cg-workshop-hero__copy">
          <span class="cg-hero-kicker">Cooking Gourmet · Nuevos talleres</span>
          <h2 data-campaign-title>${first.title}</h2>
          <p data-campaign-intro>${first.intro}</p>
          <div class="cg-workshop-campaign__plus"><span>El plus</span><p data-campaign-plus>${first.plus}</p></div>
          <div class="cg-workshop-campaign__start"><small>Inicio anunciado</small><strong data-campaign-date>${first.dateLabel}</strong></div>
          <div class="cg-hero-actions cg-workshop-campaign__actions">
            <a class="cg-hero-btn cg-hero-btn--primary" data-campaign-cta href="${workshopCampaignWhatsAppUrl(first)}" target="_blank" rel="noopener noreferrer" data-cta-location="hero_workshops">Consultar este taller</a>
            <a class="cg-hero-btn cg-hero-btn--light" href="#talleres" data-campaign-all>Ver todos</a>
          </div>
        </div>
        <div class="cg-workshop-campaign__viewer" aria-label="Afiche de cada taller">
          <div class="cg-workshop-campaign__frame">
            ${workshopCampaigns.map((item, i) => `
              <a href="${workshopCampaignWhatsAppUrl(item)}" target="_blank" rel="noopener noreferrer" data-campaign-poster data-workshop-id="${item.id}" class="cg-workshop-campaign__poster ${i === 0 ? "is-active" : ""}" aria-label="Consultar el taller ${item.title}" aria-hidden="${i !== 0}" ${i === 0 ? "" : 'tabindex="-1"'}>
                <img src="${item.image}" alt="${item.imageAlt}" width="1200" height="1200" loading="lazy" decoding="async" />
              </a>`).join("")}
          </div>
          <div class="cg-workshop-campaign__controls" aria-label="Control de afiches de talleres">
            <button type="button" data-campaign-prev aria-label="Afiche anterior">←</button>
            <div class="cg-workshop-campaign__dots">
              ${workshopCampaigns.map((item, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" data-campaign-dot aria-label="Ver afiche de ${item.title}" aria-current="${i === 0}"><span></span></button>`).join("")}
            </div>
            <span data-campaign-count>01 / ${String(workshopCampaigns.length).padStart(2, "0")}</span>
            <button type="button" data-campaign-next aria-label="Siguiente afiche">→</button>
          </div>
        </div>
      </div>
    </article>`;
}

export function renderHeroSlider() {
  const programs = programOrder.map(renderProgramSlide).join("");
  return `
    <section class="cg-hero" aria-label="Programas y talleres de Cooking Gourmet">
      <div class="cg-hero__viewport">
        ${programs}
        ${renderWorkshopPromoSlide()}
      </div>
      <div class="container cg-hero-nav" aria-label="Navegación del carrusel principal">
        <div class="cg-hero-dots" role="tablist">
          ${programOrder.map((key, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-hero-dot aria-label="Ver ${programsData[key].title}" aria-selected="${index === 0}"><span></span>${programsData[key].title.replace(" Profesional", "")}</button>`).join("")}
          <button type="button" data-hero-dot aria-label="Ver talleres" aria-selected="false"><span></span>Talleres</button>
        </div>
        <div class="cg-hero-arrows"><button type="button" data-hero-pause aria-label="Pausar carrusel" aria-pressed="false">Ⅱ</button><button type="button" data-hero-prev aria-label="Anterior">←</button><span data-hero-count>01 / ${String(programOrder.length + 1).padStart(2, "0")}</span><button type="button" data-hero-next aria-label="Siguiente">→</button></div>
      </div>
    </section>`;
}

export function initHeroSlider() {
  disposeSlider?.();
  const slides = [...document.querySelectorAll<HTMLElement>("[data-hero-slide]")];
  const dots = [...document.querySelectorAll<HTMLButtonElement>("[data-hero-dot]")];
  const counter = document.querySelector<HTMLElement>("[data-hero-count]");
  const root = document.querySelector<HTMLElement>(".cg-hero");
  if (slides.length < 2 || !root) return;

  const posters = [...root.querySelectorAll<HTMLAnchorElement>("[data-campaign-poster]")];
  const innerDots = [...root.querySelectorAll<HTMLButtonElement>("[data-campaign-dot]")];
  const title = root.querySelector<HTMLElement>("[data-campaign-title]");
  const intro = root.querySelector<HTMLElement>("[data-campaign-intro]");
  const plus = root.querySelector<HTMLElement>("[data-campaign-plus]");
  const date = root.querySelector<HTMLElement>("[data-campaign-date]");
  const cta = root.querySelector<HTMLAnchorElement>("[data-campaign-cta]");
  const innerCounter = root.querySelector<HTMLElement>("[data-campaign-count]");
  const pause = root.querySelector<HTMLButtonElement>("[data-hero-pause]");
  let index = 0;
  let campaignIndex = 0;
  let paused = false;
  let hovering = false;
  let focused = false;
  let pointerX = 0;
  let timer = 0;
  const workshopIndex = programOrder.length;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setCampaign = (next: number, interaction?: string) => {
    campaignIndex = (next + workshopCampaigns.length) % workshopCampaigns.length;
    const campaign = workshopCampaigns[campaignIndex];
    posters.forEach((poster, i) => {
      const active = i === campaignIndex;
      poster.classList.toggle("is-active", active);
      poster.setAttribute("aria-hidden", String(!active));
      poster.tabIndex = active ? 0 : -1;
    });
    innerDots.forEach((dot, i) => {
      const active = i === campaignIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", String(active));
    });
    if (title) title.textContent = campaign.title;
    if (intro) intro.textContent = campaign.intro;
    if (plus) plus.textContent = campaign.plus;
    if (date) date.textContent = campaign.dateLabel;
    if (cta) cta.href = workshopCampaignWhatsAppUrl(campaign);
    if (innerCounter) innerCounter.textContent = `${String(campaignIndex + 1).padStart(2, "0")} / ${String(workshopCampaigns.length).padStart(2, "0")}`;
    if (interaction) trackEvent("hero_slide_select", { workshop_id: campaign.id, cta_location: `hero_workshops_${interaction}` });
  };

  const show = (next: number, interaction?: string) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
    if (index === workshopIndex) setCampaign(0);
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    if (interaction) trackEvent("hero_slide_select", {
      program_id: slides[index].dataset.programId,
      workshop_id: index === workshopIndex ? workshopCampaigns[campaignIndex].id : undefined,
      cta_location: index === workshopIndex ? `hero_${interaction}_workshops` : `hero_${interaction}`,
    });
  };

  // Una sola pestaña «Talleres» contiene los cuatro afiches. El slider principal
  // permanece en esa pestaña hasta mostrar los cuatro, luego vuelve a la primera carrera.
  const restart = () => {
    window.clearTimeout(timer);
    if (paused || hovering || focused || reducedMotion) return;
    timer = window.setTimeout(() => {
      if (index === workshopIndex) {
        if (campaignIndex === workshopCampaigns.length - 1) show(index + 1);
        else setCampaign(campaignIndex + 1);
      } else show(index + 1);
      restart();
    }, index === workshopIndex ? 4800 : 6500);
  };

  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i, "dot"); restart(); }));
  root.querySelector("[data-hero-prev]")?.addEventListener("click", () => { show(index - 1, "previous"); restart(); });
  root.querySelector("[data-hero-next]")?.addEventListener("click", () => { show(index + 1, "next"); restart(); });
  root.querySelector("[data-campaign-prev]")?.addEventListener("click", () => { setCampaign(campaignIndex - 1, "previous"); restart(); });
  root.querySelector("[data-campaign-next]")?.addEventListener("click", () => { setCampaign(campaignIndex + 1, "next"); restart(); });
  innerDots.forEach((dot, i) => dot.addEventListener("click", () => { setCampaign(i, "dot"); restart(); }));
  pause?.addEventListener("click", () => {
    paused = !paused;
    pause.setAttribute("aria-pressed", String(paused));
    pause.setAttribute("aria-label", paused ? "Reanudar carrusel" : "Pausar carrusel");
    pause.textContent = paused ? "▶" : "Ⅱ";
    restart();
  });
  const enter = () => { hovering = true; window.clearTimeout(timer); };
  const leave = () => { hovering = false; restart(); };
  const focusIn = () => { focused = true; window.clearTimeout(timer); };
  const focusOut = (event: FocusEvent) => {
    if (!root.contains(event.relatedTarget as Node | null)) { focused = false; restart(); }
  };
  const keydown = (event: KeyboardEvent) => {
    if ((event.target as Element).closest("[data-campaign-prev], [data-campaign-next], [data-campaign-dot]")) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); if (index === workshopIndex) setCampaign(campaignIndex - 1, "keyboard"); else show(index - 1, "keyboard"); restart(); }
    if (event.key === "ArrowRight") { event.preventDefault(); if (index === workshopIndex) setCampaign(campaignIndex + 1, "keyboard"); else show(index + 1, "keyboard"); restart(); }
  };
  const pointerDown = (event: PointerEvent) => { pointerX = event.clientX; };
  const pointerUp = (event: PointerEvent) => {
    const delta = event.clientX - pointerX;
    if (Math.abs(delta) < 60) return;
    if (index === workshopIndex) setCampaign(campaignIndex + (delta < 0 ? 1 : -1), "swipe");
    else show(index + (delta < 0 ? 1 : -1), "swipe");
    restart();
  };
  root.addEventListener("mouseenter", enter);
  root.addEventListener("mouseleave", leave);
  root.addEventListener("focusin", focusIn);
  root.addEventListener("focusout", focusOut);
  root.addEventListener("keydown", keydown);
  root.addEventListener("pointerdown", pointerDown);
  root.addEventListener("pointerup", pointerUp);

  const cleanup = () => {
    window.clearTimeout(timer);
    root.removeEventListener("mouseenter", enter);
    root.removeEventListener("mouseleave", leave);
    root.removeEventListener("focusin", focusIn);
    root.removeEventListener("focusout", focusOut);
    root.removeEventListener("keydown", keydown);
    root.removeEventListener("pointerdown", pointerDown);
    root.removeEventListener("pointerup", pointerUp);
    window.removeEventListener("cg:route-change", routeChanged);
  };
  const routeChanged = () => { if (!root.isConnected) cleanup(); };
  disposeSlider = cleanup;
  window.addEventListener("cg:route-change", routeChanged);
  restart();
}
