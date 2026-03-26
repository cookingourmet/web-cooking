import { heroSlides } from "./heroData";
import { restartProgressAnimation } from "./heroProgress";
import { mountAssistantWindow } from "./heroAssistantPanel";

const AUTO_TIME = 5500;
const WORKSHOP_TARGET_SLIDE = 5;

const HERO_PROGRESS_META = [
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v7" />
        <path d="M5 3v4" />
        <path d="M9 3v4" />
        <path d="M7 10v11" />
        <path d="M16 3c-1.8 1.8-2.4 4-2.4 6.2V21" />
        <path d="M16 3c1.8 1.8 2.4 4 2.4 6.2" />
      </svg>
    `,
  },
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12c0-2.2 1.7-4 3.9-4 .9 0 1.7.3 2.3.8.6-.5 1.4-.8 2.3-.8 2.2 0 3.9 1.8 3.9 4" />
        <path d="M4 12h16" />
        <path d="M6 12v2.3c0 3 2.4 5.4 5.4 5.4h1.2c3 0 5.4-2.4 5.4-5.4V12" />
        <path d="M12 5.2V8" />
      </svg>
    `,
  },
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12l-4.8 6.4v4.2l2.6 2.4H8.2l2.6-2.4v-4.2L6 4z" />
        <path d="M9 20h6" />
      </svg>
    `,
  },
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9h9a0 0 0 0 1 0 0v4.2A4.8 4.8 0 0 1 10.2 18H10A4 4 0 0 1 6 14v-5a0 0 0 0 1 0 0z" />
        <path d="M15 10h1.3A2.7 2.7 0 0 1 19 12.7v0A2.3 2.3 0 0 1 16.7 15H15" />
        <path d="M8.3 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M11.3 3.7c-.9 1-.9 2 .1 3" />
        <path d="M14.2 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M5 20h14" />
      </svg>
    `,
  },
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3h8v4.5A4 4 0 0 1 12 11.5A4 4 0 0 1 8 7.5V3z" />
        <path d="M12 11.5V18" />
        <path d="M9 21h6" />
      </svg>
    `,
  },
  {
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 10h12a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2z" />
        <path d="M7 10V8a5 5 0 0 1 10 0" />
        <path d="M19 12h1a1 1 0 0 1 1 1v2" />
        <path d="M6 19h10" />
      </svg>
    `,
  },
];

function getProgressMeta(index: number) {
  return (
    HERO_PROGRESS_META[index] ?? {
      icon: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="6" />
        </svg>
      `,
    }
  );
}

function renderStartWindow() {
  return `
    <div class="hero-start-window">
      <div class="hero-start-window__top">
        <span class="hero-start-window__eyebrow">Inicio de clases</span>
        <span class="hero-start-window__pulse"></span>
      </div>

      <div class="hero-start-window__date-wrap">
        <strong class="hero-start-window__day">11</strong>
        <span class="hero-start-window__month">de mayo</span>
      </div>

      <p class="hero-start-window__text">
        Matrículas abiertas. Reserva tu vacante y prepárate para empezar con formación práctica desde el primer día.
      </p>

      <div class="hero-start-window__footer">
        <span class="hero-start-window__status">
          <span class="hero-start-window__status-dot"></span>
          Vacantes disponibles
        </span>
      </div>
    </div>
  `;
}

function renderWorkshopWindow() {
  return `
    <a
      href="#"
      class="hero-workshop-window"
      data-go-slide="${WORKSHOP_TARGET_SLIDE}"
      aria-label="Ir al programa de Cocina"
    >
      <span class="hero-workshop-window__fire hero-workshop-window__fire--pink"></span>
      <span class="hero-workshop-window__fire hero-workshop-window__fire--red"></span>
      <span class="hero-workshop-window__fire hero-workshop-window__fire--gold"></span>
      <span class="hero-workshop-window__sparks"></span>

      <div class="hero-workshop-window__frame">
        <div class="hero-workshop-window__topline">
          <span class="hero-workshop-window__overline">INICIO: 13 DE ABRIL</span>
          <span class="hero-workshop-window__live"></span>
        </div>

        <div class="hero-workshop-window__center">
          <span class="hero-workshop-window__program">TALLER</span>
          <h3 class="hero-workshop-window__title">HOJALDRES Y MASAS LAMINADAS</h3>
        </div>

        <div class="hero-workshop-window__action">
          <span class="hero-workshop-window__action-label">UNIRME AL TALLER</span>
        </div>
      </div>
    </a>
  `;
}

export function renderHeroSlider() {
  return `
    <section class="hero-slider" aria-label="Programas destacados">
      <div class="hero-slider__viewport" id="heroViewport">
        ${heroSlides
          .map(
            (slide, index) => `
          <article class="hero-slide ${index === 0 ? "is-active" : ""}" data-index="${index}">
            <div class="hero-slide__bg">
              <img src="${slide.image}" alt="${slide.title}">
            </div>

            <div class="hero-slide__overlay"></div>
            <div class="hero-slide__grid"></div>
            <div class="hero-slide__glow"></div>

            <div class="hero-slide__content container">
              <div class="hero-slide__left">
                <span class="hero-badge">${slide.badge}</span>
                <h1>${slide.title}</h1>
                <h2>${slide.subtitle}</h2>
                <p>${slide.description}</p>

                <div class="hero-actions">
                  <a href="#" class="hero-btn hero-btn--primary">${slide.cta}</a>
                  <a href="#" class="hero-btn hero-btn--ghost">Solicitar información</a>
                </div>
              </div>

              <div class="hero-slide__right">
                <div class="hero-floating-stack">
                  ${renderWorkshopWindow()}
                  ${renderStartWindow()}
                </div>
              </div>
            </div>
          </article>
        `
          )
          .join("")}
      </div>

      <div class="hero-progress" id="heroProgress">
        ${heroSlides
          .map((_, index) => {
            const meta = getProgressMeta(index);

            return `
              <button
                class="hero-progress__item ${index === 0 ? "is-active" : ""}"
                type="button"
                aria-label="Ir al slide ${index + 1}"
                data-progress="${index}"
              >
                <span class="hero-progress__icon" aria-hidden="true">
                  ${meta.icon}
                </span>

                <span class="hero-progress__track">
                  <span class="hero-progress__fill"></span>
                </span>
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

export function initHeroSlider() {
  const heroSlidesEls = Array.from(
    document.querySelectorAll<HTMLElement>(".hero-slide")
  );

  const heroProgressItems = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".hero-progress__item")
  );

  const heroWorkshopLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".hero-workshop-window[data-go-slide]")
  );

  const heroSlider = document.querySelector<HTMLElement>(".hero-slider");

  if (!heroSlidesEls.length) return;

  let currentSlide = 0;
  let autoPlayId: number | null = null;

  function updateHeroSlider(index: number) {
    currentSlide = index;

    heroSlidesEls.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });

    heroProgressItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
      restartProgressAnimation(item);
    });
  }

  function goToNextSlide() {
    const nextIndex = (currentSlide + 1) % heroSlidesEls.length;
    updateHeroSlider(nextIndex);
  }

  function stopAutoPlay() {
    if (autoPlayId !== null) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();

    autoPlayId = window.setInterval(() => {
      goToNextSlide();
    }, AUTO_TIME);
  }

  function resetAutoPlay() {
    startAutoPlay();
  }

  heroProgressItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateHeroSlider(index);
      resetAutoPlay();
    });
  });

  heroWorkshopLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const rawIndex = Number(link.dataset.goSlide);
      const targetIndex = Number.isFinite(rawIndex)
        ? Math.max(0, Math.min(rawIndex, heroSlidesEls.length - 1))
        : heroSlidesEls.length - 1;

      updateHeroSlider(targetIndex);
      resetAutoPlay();
    });
  });

  function updateGridGlow(event: MouseEvent) {
    if (!heroSlider) return;

    const rect = heroSlider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    heroSlider.style.setProperty("--hero-mouse-x", `${x}px`);
    heroSlider.style.setProperty("--hero-mouse-y", `${y}px`);
    heroSlider.classList.add("is-hovering");
  }

  function clearGridGlow() {
    heroSlider?.classList.remove("is-hovering");
  }

  heroSlider?.addEventListener("mousemove", updateGridGlow);
  heroSlider?.addEventListener("mouseenter", (event) => {
    stopAutoPlay();
    updateGridGlow(event as MouseEvent);
  });
  heroSlider?.addEventListener("mouseleave", () => {
    clearGridGlow();
    startAutoPlay();
  });
  heroSlider?.addEventListener("focusin", stopAutoPlay);
  heroSlider?.addEventListener("focusout", startAutoPlay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoPlay();
    else startAutoPlay();
  });

  updateHeroSlider(0);
  startAutoPlay();

  // Monta el asistente UNA SOLA VEZ fuera de los slides
  mountAssistantWindow();
}