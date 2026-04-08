import { renderNavbar } from "./navbar";
import { bindDropdown } from "./dropdown";

const MOBILE_BREAKPOINT = 1450;

export function renderHeader() {
  return `
    <header class="topbar">
      <div class="topbar__inner">
        <a href="#" class="brand" aria-label="Cooking Gourmet">
          <div class="brand__mark">
            <img src="/images/logo.png" alt="Cooking Gourmet" />
          </div>

          <div class="brand__text">
            <span class="brand__title">Cooking Gourmet</span>
          </div>
        </a>

        <div class="topbar__quick">
          <a href="https://cookingourmet.q10.com/" class="btn-virtual btn-virtual--top">Aula Virtual</a>

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
    </header>
  `;
}

export function initHeader() {
  const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement | null;
  const navbar = document.getElementById("navbar") as HTMLElement | null;
  const programsDropdown = document.getElementById("programsDropdown") as HTMLElement | null;
  const programsBtn = document.getElementById("programsBtn") as HTMLButtonElement | null;

  if (!navbar || !programsDropdown || !programsBtn) return;

  const safeNavbar = navbar;
  const safeProgramsDropdown = programsDropdown;
  const safeProgramsBtn = programsBtn;
  const safeMenuToggle = menuToggle;

  const isMobileView = () => window.innerWidth <= MOBILE_BREAKPOINT;

  function setNavbarOpen(isOpen: boolean) {
    safeNavbar.classList.toggle("is-open", isOpen);
    safeMenuToggle?.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      safeProgramsDropdown.classList.remove("is-open");
      safeProgramsBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (safeMenuToggle) {
    safeMenuToggle.addEventListener("click", () => {
      const isOpen = safeNavbar.classList.contains("is-open");
      setNavbarOpen(!isOpen);
    });
  }

  bindDropdown(safeProgramsBtn, safeProgramsDropdown, MOBILE_BREAKPOINT);

  document.addEventListener("click", (event) => {
    if (!isMobileView()) return;

    const target = event.target as Node;
    const clickedInsideHeader =
      safeNavbar.contains(target) || safeMenuToggle?.contains(target);

    if (!clickedInsideHeader) {
      setNavbarOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavbarOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      setNavbarOpen(false);
    }
  });
}