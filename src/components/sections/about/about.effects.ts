export function initAboutEffects() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".cg-about")
  );

  if (!sections.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  sections.forEach((section) => {
    if (section.dataset.cgAboutInitialized === "true") return;
    section.dataset.cgAboutInitialized = "true";

    const revealItems = Array.from(
      section.querySelectorAll<HTMLElement>("[data-cg-about-reveal]")
    );

    const statNumbers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-cg-counter]")
    );

    const bg = section.querySelector<HTMLElement>(".cg-about__bg");
    const grid = section.querySelector<HTMLElement>(".cg-about__grid");

    // Siempre visible por defecto; solo animamos cuando JS está listo
    if (!prefersReducedMotion && revealItems.length) {
      section.classList.add("cg-about--ready");

      revealItems.forEach((item, index) => {
        const revealType = item.dataset.cgAboutReveal ?? "up";

        let baseDelay = 0;
        if (revealType === "up") baseDelay = 20;
        if (revealType === "left") baseDelay = 50;
        if (revealType === "right") baseDelay = 90;

        item.style.transitionDelay = `${Math.min(baseDelay + index * 90, 540)}ms`;
        item.style.willChange = "opacity, transform, filter";
      });
    }

    const showAllRevealItems = () => {
      revealItems.forEach((item) => {
        item.classList.add("is-visible");
        item.style.willChange = "auto";
      });
    };

    const startCounters = () => {
      statNumbers.forEach((el) => {
        if (el.dataset.cgCounterStarted === "true") return;
        el.dataset.cgCounterStarted = "true";

        const target = Number(el.dataset.cgCounter ?? el.textContent ?? "0");
        const duration = Number(el.dataset.cgCounterDuration ?? 1600);

        if (!Number.isFinite(target)) return;

        if (prefersReducedMotion) {
          el.textContent = formatCounter(target);
          return;
        }

        animateCounter(el, target, duration);
      });
    };

    // Reveal
    if (!prefersReducedMotion && revealItems.length && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            target.style.willChange = "auto";
            revealObserver.unobserve(target);
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -10% 0px",
        }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      showAllRevealItems();
    }

    // Counters
    if (statNumbers.length && "IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            startCounters();
            counterObserver.disconnect();
          });
        },
        {
          threshold: 0.3,
        }
      );

      counterObserver.observe(section);
    } else {
      startCounters();
    }

    // Parallax ligero
    if (!prefersReducedMotion) {
      let ticking = false;

      const updateParallax = () => {
        const rect = section.getBoundingClientRect();
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;

        // si está muy lejos del viewport, no hacer nada
        if (rect.bottom < 0 || rect.top > viewportHeight) {
          ticking = false;
          return;
        }

        const progress = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
          0,
          1
        );

        const bgShift = (progress - 0.5) * 28;
        const gridShift = (progress - 0.5) * 18;

        if (bg) {
          bg.style.transform = `translate3d(0, ${bgShift}px, 0) scale(1.02)`;
        }

        if (grid) {
          grid.style.transform = `translate3d(0, ${gridShift}px, 0)`;
        }

        ticking = false;
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      };

      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }
  });
}

function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number
) {
  const start = performance.now();
  const from = 0;

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = clamp(elapsed / duration, 0, 1);
    const eased = easeOutCubic(progress);
    const value = Math.round(from + (target - from) * eased);

    element.textContent = formatCounter(value);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = formatCounter(target);
    }
  };

  window.requestAnimationFrame(step);
}

function formatCounter(value: number) {
  return new Intl.NumberFormat("es-PE").format(value);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}