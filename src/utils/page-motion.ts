declare global {
  interface Window {
    __cookingMotionObserver?: IntersectionObserver;
    __cookingTrackingObserver?: IntersectionObserver;
    __cookingEngagementAbortController?: AbortController;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealImmediately(elements: HTMLElement[]) {
  elements.forEach((element) => element.classList.add("is-revealed"));
}

export function initPageMotion() {
  window.__cookingMotionObserver?.disconnect();

  const main = document.querySelector<HTMLElement>("main");
  if (!main) return;

  main.classList.remove("cg-route-enter");
  void main.offsetWidth;
  main.classList.add("cg-route-enter");

  const sections = Array.from(
    main.querySelectorAll<HTMLElement>("section[data-reveal-section], :scope > section")
  );

  sections.forEach((section, index) => {
    if (!section.dataset.revealSection) {
      section.dataset.revealSection = "auto";
    }

    if (!section.style.getPropertyValue("--section-reveal-delay")) {
      section.style.setProperty("--section-reveal-delay", `${Math.min(index, 4) * 35}ms`);
    }
  });

  const elements = Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealImmediately(sections);
    revealImmediately(elements);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add("is-revealed");
        observer.unobserve(element);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    }
  );

  [...sections, ...elements].forEach((element) => observer.observe(element));
  window.__cookingMotionObserver = observer;
}

function readAttribution() {
  try {
    const saved = window.sessionStorage.getItem("cg_attribution");
    return saved ? (JSON.parse(saved) as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function pushViewEvent(element: HTMLElement) {
  const eventName = element.dataset.trackView;
  if (!eventName || element.dataset.trackViewSent === "true") return;

  element.dataset.trackViewSent = "true";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    workshop_id: element.dataset.trackWorkshop,
    path: window.location.pathname,
    ...readAttribution(),
  });
}

export function initEngagementTracking() {
  window.__cookingTrackingObserver?.disconnect();
  window.__cookingEngagementAbortController?.abort();

  const abortController = new AbortController();
  const { signal } = abortController;
  window.__cookingEngagementAbortController = abortController;

  const trackedViews = Array.from(document.querySelectorAll<HTMLElement>("[data-track-view]"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          pushViewEvent(element);
          observer.unobserve(element);
        });
      },
      { threshold: 0.6 }
    );

    trackedViews.forEach((element) => observer.observe(element));
    window.__cookingTrackingObserver = observer;
  } else {
    trackedViews.forEach(pushViewEvent);
  }

  let sentHalfPage = false;

  const trackDepth = () => {
    if (sentHalfPage) return;

    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportBottom = window.scrollY + window.innerHeight;
    const ratio = documentHeight > 0 ? viewportBottom / documentHeight : 0;

    if (ratio < 0.5) return;

    sentHalfPage = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_scroll_50",
      path: window.location.pathname,
      ...readAttribution(),
    });
  };

  window.addEventListener("scroll", trackDepth, { passive: true, signal });
  trackDepth();
}
