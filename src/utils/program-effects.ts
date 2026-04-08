export function initProgramPageEffects() {
  const hasProgramPage =
    document.querySelector(".program-landing-hero") ||
    document.querySelector(".program-premium-hero");

  if (!hasProgramPage) return;

  initRevealEffects();
  initProgramCounters();
  initImageParallax();
}

function initRevealEffects() {
  const selectors = [
    ".program-landing-about__media",
    ".program-landing-about__content",
    ".program-landing-module-card",
    ".program-landing-feature-card",
    ".program-landing-dark-panel",
    ".program-landing-requirement-item",
    ".program-landing-jobs__grid span",
    ".program-landing-investment",
    ".program-landing-cta",
    ".program-landing-stat",
    ".program-stat-card",
    ".program-card",
    ".program-benefit-card",
    ".program-module-card",
    ".program-schedule-card",
    ".program-trust-band",
  ];

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(selectors.join(","))
  );

  if (!elements.length) return;

  elements.forEach((element, index) => {
    element.classList.add("reveal-up");
    element.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initProgramCounters() {
  const counterElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".program-landing-stat strong, .program-stat-card strong"
    )
  );

  if (!counterElements.length) return;

  counterElements.forEach((element) => {
    element.classList.add("program-counter-ready");
  });

  const statsSection =
    document.querySelector(".program-landing-stats") ||
    document.querySelector(".program-stats");

  if (!statsSection) {
    counterElements.forEach((element, index) => {
      window.setTimeout(() => animateCounter(element), index * 120);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      if (!isVisible) return;

      counterElements.forEach((element, index) => {
        window.setTimeout(() => animateCounter(element), index * 140);
      });

      obs.disconnect();
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(statsSection);
}

function animateCounter(element: HTMLElement) {
  if (element.dataset.counterDone === "true") return;

  const originalText = (element.dataset.originalText ?? element.textContent ?? "").trim();
  if (!originalText) return;

  element.dataset.originalText = originalText;

  const numericText = originalText.replace(/[^\d.,]/g, "");
  if (!numericText) return;

  const hasLeadingPlus = originalText.startsWith("+");
  const hasTrailingPlus = originalText.endsWith("+") && !hasLeadingPlus;
  const hasPercent = originalText.includes("%");
  const hasComma = numericText.includes(",");
  const hasDot = numericText.includes(".");

  const normalizedNumber = Number(numericText.replace(/,/g, ""));
  if (!Number.isFinite(normalizedNumber) || normalizedNumber <= 0) return;

  const decimals = hasDot ? getDecimalPlaces(numericText) : 0;
  const duration = normalizedNumber >= 1000 ? 1900 : 1600;
  const startTime = performance.now();

  element.dataset.counterDone = "true";

  const update = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = normalizedNumber * easedProgress;
    const roundedValue =
      decimals > 0
        ? Number(currentValue.toFixed(decimals))
        : Math.round(currentValue);

    let formattedValue = "";

    if (decimals > 0) {
      formattedValue = roundedValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else if (hasComma || normalizedNumber >= 1000) {
      formattedValue = Math.round(roundedValue).toLocaleString("en-US");
    } else {
      formattedValue = String(Math.round(roundedValue));
    }

    if (hasLeadingPlus) formattedValue = `+${formattedValue}`;
    if (hasTrailingPlus) formattedValue = `${formattedValue}+`;
    if (hasPercent) formattedValue = `${formattedValue}%`;

    element.textContent = formattedValue;

    if (progress < 1) {
      requestAnimationFrame(update);
      return;
    }

    element.textContent = originalText;
  };

  requestAnimationFrame(update);
}

function getDecimalPlaces(value: string) {
  const parts = value.split(".");
  if (parts.length < 2) return 0;
  return parts[1]?.length ?? 0;
}

function initImageParallax() {
  const wrappers = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".program-landing-about__image-wrap, .program-premium-hero__image-wrap"
    )
  );

  if (!wrappers.length) return;

  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window;

  if (isTouchDevice) return;

  wrappers.forEach((wrapper) => {
    const image = wrapper.querySelector<HTMLElement>("img");
    if (!image) return;

    wrapper.addEventListener("mousemove", (event) => {
      const bounds = wrapper.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;

      const moveX = (relativeX - 0.5) * 12;
      const moveY = (relativeY - 0.5) * 12;

      image.style.transform = `scale(1.08) translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    wrapper.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  });
}