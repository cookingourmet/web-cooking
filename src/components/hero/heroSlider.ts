import "./heroSlider.css";

import {
  heroSlides,
  type HeroAction,
  type HeroCardsSlide,
  type HeroSingleSlide,
  type HeroSlide,
} from "./heroData";
import { bindSliderControls } from "./heroControls";
import {
  restartProgressAnimation,
  setHeroProgressDuration,
} from "./heroProgress";
import { mountAssistantWindow } from "./heroAssistantPanel";

const AUTO_TIME = 5500;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value);
}

function renderAction(
  action: HeroAction,
  variant: "primary" | "secondary"
) {
  const externalAttributes = action.external
    ? ' target="_blank" rel="noreferrer"'
    : "";

  return `
    <a
      class="hero-action hero-action--${variant}"
      href="${escapeAttribute(action.href)}"
      ${externalAttributes}
    >
      ${escapeHtml(action.label)}
      ${
        variant === "secondary"
          ? '<span aria-hidden="true">→</span>'
          : ""
      }
    </a>
  `;
}

function renderStartDate(slide: HeroSingleSlide) {
  if (!slide.startDate) return "";

  return `
    <div class="hero-start-date" aria-label="${escapeAttribute(
      `${slide.startDate.label}: ${slide.startDate.day} de ${slide.startDate.month}`
    )}">
      <span class="hero-start-date__label">
        ${escapeHtml(slide.startDate.label)}
      </span>

      <span class="hero-start-date__value">
        <strong>${escapeHtml(slide.startDate.day)}</strong>
        <span>${escapeHtml(slide.startDate.month)}</span>
      </span>
    </div>
  `;
}

function renderSingleSlide(slide: HeroSingleSlide, index: number) {
  const sideClass =
    slide.mediaSide === "left"
      ? "hero-slide--media-left"
      : "hero-slide--media-right";

  const imageScale = slide.imageScale ?? 1;

  return `
    <article
      class="hero-slide hero-slide--single ${sideClass} ${
        index === 0 ? "is-active" : ""
      }"
      data-index="${index}"
      data-slide-id="${escapeAttribute(slide.id)}"
      aria-hidden="${index === 0 ? "false" : "true"}"
    >
      <div class="hero-single hero-shell">
        <div class="hero-single__content">
          ${
            slide.eyebrow
              ? `
                <span class="hero-eyebrow">
                  ${escapeHtml(slide.eyebrow)}
                </span>
              `
              : ""
          }

          <h1>${escapeHtml(slide.title)}</h1>

          <p class="hero-single__subtitle">
            ${escapeHtml(slide.subtitle)}
          </p>

          <div class="hero-single__bottom">
            <div class="hero-actions">
              ${renderAction(slide.primaryAction, "primary")}
              ${
                slide.secondaryAction
                  ? renderAction(slide.secondaryAction, "secondary")
                  : ""
              }
            </div>

            ${renderStartDate(slide)}
          </div>
        </div>

        <div
          class="hero-single__media"
          style="
            --hero-image-position: ${escapeAttribute(
              slide.objectPosition ?? "center"
            )};
            --hero-image-position-mobile: ${escapeAttribute(
              slide.mobileObjectPosition ??
                slide.objectPosition ??
                "center"
            )};
            --hero-image-scale: ${imageScale};
          "
        >
          <div class="hero-single__media-shape" aria-hidden="true"></div>

          <picture>
            ${
              slide.mobileImage
                ? `
                  <source
                    media="(max-width: 768px)"
                    srcset="${escapeAttribute(slide.mobileImage)}"
                  />
                `
                : ""
            }

            <img
              src="${escapeAttribute(slide.image)}"
              alt="${escapeAttribute(slide.imageAlt)}"
              ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </article>
  `;
}

function renderWorkshopCard(
  card: HeroCardsSlide["cards"][number]
) {
  return `
    <a
      class="hero-workshop-card"
      href="${escapeAttribute(card.href)}"
      aria-label="${escapeAttribute(
        `${card.title}, inicia el ${card.day} de ${card.month}`
      )}"
    >
      <img
        src="${escapeAttribute(card.image)}"
        alt="${escapeAttribute(card.imageAlt)}"
        loading="lazy"
        decoding="async"
      />

      <span class="hero-workshop-card__overlay" aria-hidden="true"></span>

      <span class="hero-workshop-card__date">
        <small>Inicio</small>
        <strong>${escapeHtml(card.day)}</strong>
        <span>${escapeHtml(card.month)}</span>
      </span>

      <span class="hero-workshop-card__content">
        <strong>${escapeHtml(card.title)}</strong>
        ${
          card.subtitle
            ? `<small>${escapeHtml(card.subtitle)}</small>`
            : ""
        }
      </span>
    </a>
  `;
}

function renderCardsSlide(slide: HeroCardsSlide, index: number) {
  return `
    <article
      class="hero-slide hero-slide--cards ${
        index === 0 ? "is-active" : ""
      }"
      data-index="${index}"
      data-slide-id="${escapeAttribute(slide.id)}"
      aria-hidden="${index === 0 ? "false" : "true"}"
    >
      <div class="hero-cards hero-shell">
        <div class="hero-cards__intro">
          ${
            slide.eyebrow
              ? `
                <span class="hero-eyebrow">
                  ${escapeHtml(slide.eyebrow)}
                </span>
              `
              : ""
          }

          <h1>${escapeHtml(slide.title)}</h1>

          <p>${escapeHtml(slide.subtitle)}</p>

          ${
            slide.primaryAction
              ? `
                <div class="hero-actions">
                  ${renderAction(slide.primaryAction, "primary")}
                </div>
              `
              : ""
          }
        </div>

        <div class="hero-cards__grid">
          ${slide.cards.map(renderWorkshopCard).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderSlide(slide: HeroSlide, index: number) {
  return slide.layout === "single"
    ? renderSingleSlide(slide, index)
    : renderCardsSlide(slide, index);
}

function renderProgressItem(slide: HeroSlide, index: number) {
  return `
    <button
      class="hero-progress__item ${index === 0 ? "is-active" : ""}"
      type="button"
      data-progress="${index}"
      aria-label="Ir a ${escapeAttribute(slide.shortLabel)}"
      aria-current="${index === 0 ? "true" : "false"}"
    >
      <span class="hero-progress__number" aria-hidden="true">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <span class="hero-progress__track" aria-hidden="true">
        <span class="hero-progress__fill"></span>
      </span>

      <span class="hero-progress__label">
        ${escapeHtml(slide.shortLabel)}
      </span>
    </button>
  `;
}

export function renderHeroSlider() {
  return `
    <section
      class="hero-slider"
      id="heroSlider"
      aria-label="Programas y talleres destacados"
    >
      <div class="hero-slider__viewport" id="heroViewport">
        ${heroSlides.map(renderSlide).join("")}
      </div>

      <div class="hero-slider__navigation hero-shell">
        <button
          class="hero-arrow"
          type="button"
          data-hero-prev
          aria-label="Ver slide anterior"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div class="hero-progress" id="heroProgress">
          ${heroSlides.map(renderProgressItem).join("")}
        </div>

        <button
          class="hero-arrow"
          type="button"
          data-hero-next
          aria-label="Ver siguiente slide"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  `;
}

export function initHeroSlider() {
  const heroSlider =
    document.querySelector<HTMLElement>("#heroSlider");

  if (!heroSlider) {
    mountAssistantWindow();
    return;
  }

  if (heroSlider.dataset.heroInitialized === "true") {
    mountAssistantWindow();
    return;
  }

  heroSlider.dataset.heroInitialized = "true";
  setHeroProgressDuration(heroSlider, AUTO_TIME);

  const slideElements = Array.from(
    heroSlider.querySelectorAll<HTMLElement>(".hero-slide")
  );

  const progressItems = Array.from(
    heroSlider.querySelectorAll<HTMLButtonElement>(
      ".hero-progress__item"
    )
  );

  const prevButton =
    heroSlider.querySelector<HTMLButtonElement>("[data-hero-prev]");

  const nextButton =
    heroSlider.querySelector<HTMLButtonElement>("[data-hero-next]");

  if (!slideElements.length) {
    mountAssistantWindow();
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let currentSlide = 0;
  let autoPlayId: number | null = null;
  let autoPlayStartedAt = 0;
  let remainingTime = AUTO_TIME;

  const pauseReasons = new Set<string>();

  function normalizeIndex(index: number) {
    return (
      (index % slideElements.length) +
      slideElements.length
    ) % slideElements.length;
  }

  function clearAutoPlay(adjustRemainingTime = false) {
    if (autoPlayId === null) return;

    if (adjustRemainingTime) {
      const elapsed = performance.now() - autoPlayStartedAt;
      remainingTime = Math.max(0, remainingTime - elapsed);
    }

    window.clearTimeout(autoPlayId);
    autoPlayId = null;
  }

  function scheduleAutoPlay() {
    if (
      reducedMotion ||
      document.hidden ||
      pauseReasons.size > 0 ||
      slideElements.length <= 1
    ) {
      return;
    }

    clearAutoPlay(false);

    if (remainingTime <= 0) {
      remainingTime = AUTO_TIME;
    }

    autoPlayStartedAt = performance.now();

    autoPlayId = window.setTimeout(() => {
      autoPlayId = null;
      remainingTime = AUTO_TIME;
      goToNextSlide();
      scheduleAutoPlay();
    }, remainingTime);
  }

  function resetAutoPlay() {
    clearAutoPlay(false);
    remainingTime = AUTO_TIME;
    scheduleAutoPlay();
  }

  function setPaused(reason: string, paused: boolean) {
    if (paused) {
      const wasEmpty = pauseReasons.size === 0;
      pauseReasons.add(reason);

      if (wasEmpty) {
        clearAutoPlay(true);
      }
    } else {
      pauseReasons.delete(reason);

      if (pauseReasons.size === 0) {
        scheduleAutoPlay();
      }
    }

    heroSlider?.classList.toggle(
      "is-paused",
      pauseReasons.size > 0 || document.hidden
    );
  }

  function updateHeroSlider(index: number) {
    const normalizedIndex = normalizeIndex(index);
    currentSlide = normalizedIndex;

    slideElements.forEach((slide, slideIndex) => {
      const isActive = slideIndex === normalizedIndex;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    progressItems.forEach((item, itemIndex) => {
      const isActive = itemIndex === normalizedIndex;

      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-current", String(isActive));

      if (isActive) {
        restartProgressAnimation(item);
      }
    });
  }

  function goToPreviousSlide() {
    updateHeroSlider(currentSlide - 1);
  }

  function goToNextSlide() {
    updateHeroSlider(currentSlide + 1);
  }

  bindSliderControls({
    root: heroSlider,
    progressItems,
    prev: prevButton,
    next: nextButton,
    onSelect: updateHeroSlider,
    onPrev: goToPreviousSlide,
    onNext: goToNextSlide,
    onReset: resetAutoPlay,
  });

  // En escritorio no pausamos el autoplay por hover o foco.
  // El hero ocupa gran parte de la pantalla y el cursor suele permanecer
  // encima, lo que detenía el slider de forma permanente.

  document.addEventListener("visibilitychange", () => {
    setPaused("visibility", document.hidden);
  });

  updateHeroSlider(0);
  resetAutoPlay();
  mountAssistantWindow();
}
