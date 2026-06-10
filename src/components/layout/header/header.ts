import { renderNavbar } from "./navbar";
import { bindDropdown } from "./dropdown";

const MOBILE_BREAKPOINT = 1024;

declare global {
  interface Window {
    __cookingHeaderAbortController?: AbortController;
  }
}

export function renderHeader() {
  return `
    <header class="topbar" id="siteHeader">
      <div class="topbar__inner">
        <a href="/" class="brand" aria-label="Ir al inicio de Cooking Gourmet">
          <span class="brand__mark">
            <img
              src="/images/logo.png"
              alt="Cooking Gourmet"
              width="46"
              height="46"
            />
          </span>

          <span class="brand__text">
            <strong class="brand__title">Cooking Gourmet</strong>
            <small class="brand__subtitle">Escuela de Alta Cocina</small>
          </span>
        </a>

        <div class="topbar__mobile-actions">
          <a
            href="https://cookingourmet.q10.com/"
            class="topbar__virtual"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aula Virtual
          </a>

          <button
            class="menu-toggle"
            id="menuToggle"
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="navbar"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        ${renderNavbar()}
      </div>

      <button
        class="navbar-backdrop"
        id="navBackdrop"
        type="button"
        aria-label="Cerrar menú"
        tabindex="-1"
      ></button>
    </header>
  `;
}

export function initHeader() {
  window.__cookingHeaderAbortController?.abort();

  const abortController = new AbortController();
  const { signal } = abortController;

  window.__cookingHeaderAbortController = abortController;

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById(
    "menuToggle"
  ) as HTMLButtonElement | null;
  const menuClose = document.getElementById(
    "menuClose"
  ) as HTMLButtonElement | null;
  const navbar = document.getElementById("navbar");
  const backdrop = document.getElementById(
    "navBackdrop"
  ) as HTMLButtonElement | null;
  const programsDropdown = document.getElementById("programsDropdown");
  const programsBtn = document.getElementById(
    "programsBtn"
  ) as HTMLButtonElement | null;
  const programsMenu = document.getElementById("programsMenu");

  if (
    !header ||
    !menuToggle ||
    !navbar ||
    !programsDropdown ||
    !programsBtn ||
    !programsMenu
  ) {
    return;
  }

  const isMobileView = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const dropdownController = bindDropdown(
    programsBtn,
    programsDropdown,
    programsMenu,
    MOBILE_BREAKPOINT,
    signal
  );

  function syncHeaderScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function setNavbarOpen(isOpen: boolean, restoreFocus = false) {
    const shouldOpen = isMobileView() && isOpen;

    navbar.classList.toggle("is-open", shouldOpen);
    backdrop?.classList.toggle("is-open", shouldOpen);
    document.body.classList.toggle("nav-is-open", shouldOpen);

    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
    menuToggle.setAttribute(
      "aria-label",
      shouldOpen ? "Cerrar menú" : "Abrir menú"
    );

    if (isMobileView()) {
      navbar.setAttribute("aria-hidden", String(!shouldOpen));
    } else {
      navbar.removeAttribute("aria-hidden");
    }

    if (shouldOpen) {
      window.requestAnimationFrame(() => {
        menuClose?.focus({ preventScroll: true });
      });
      return;
    }

    dropdownController?.close();

    if (restoreFocus) {
      menuToggle.focus({ preventScroll: true });
    }
  }

  menuToggle.addEventListener(
    "click",
    () => {
      setNavbarOpen(!navbar.classList.contains("is-open"));
    },
    { signal }
  );

  menuClose?.addEventListener(
    "click",
    () => {
      setNavbarOpen(false, true);
    },
    { signal }
  );

  backdrop?.addEventListener(
    "click",
    () => {
      setNavbarOpen(false, true);
    },
    { signal }
  );

  navbar.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        if (isMobileView()) {
          setNavbarOpen(false);
        }
      },
      { signal }
    );
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;

      if (navbar.classList.contains("is-open")) {
        event.preventDefault();
        setNavbarOpen(false, true);
      }
    },
    { signal }
  );

  window.addEventListener(
    "resize",
    () => {
      if (!isMobileView()) {
        setNavbarOpen(false);
      } else if (!navbar.classList.contains("is-open")) {
        navbar.setAttribute("aria-hidden", "true");
      }
    },
    { signal }
  );

  window.addEventListener("scroll", syncHeaderScroll, {
    signal,
    passive: true,
  });

  syncHeaderScroll();
  setNavbarOpen(false);
}
