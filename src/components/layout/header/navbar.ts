import { mainMenu, programMenu } from "../../../data/menu.data";

const HIDDEN_MAIN_MENU_LABELS = new Set([
  "Estudiantes",
  "Rutas",
  "Inscripción",
  "Inscripciones",
]);

const WHATSAPP_URL =
  "https://wa.me/51981377382?text=Hola%2C%20vengo%20desde%20la%20web%20de%20Cooking%20Gourmet%20y%20quiero%20recibir%20informaci%C3%B3n.";

type ProgramVisual = {
  label?: string;
  href?: string;
  description: string;
};

const PROGRAM_VISUALS: Record<string, ProgramVisual> = {
  Gastronomía: {
    href: "/programas/gastronomia",
    description: "Cocina peruana e internacional con formación práctica.",
  },
  Pastelería: {
    href: "/programas/pasteleria",
    description: "Pastelería, panadería, decoración y emprendimiento.",
  },
  "Bar Profesional": {
    href: "/programas/bar-profesional",
    description: "Coctelería, mixología y servicio profesional de barra.",
  },
  Barismo: {
    href: "/programas/barismo",
    description: "Café, extracción, cata, latte art y cafetería.",
  },
  Sommelier: {
    href: "/programas/sommelier",
    description: "Vinos, cata, maridaje y servicio especializado.",
  },
  Cocina: {
    label: "Cocina Acelerada",
    href: "/programas/cocina-acelerada",
    description: "Formación culinaria intensiva orientada al trabajo real.",
  },
  "Cocina Acelerada": {
    href: "/programas/cocina-acelerada",
    description: "Formación culinaria intensiva orientada al trabajo real.",
  },
};

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function currentPath() {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

function isCurrentHref(href: string) {
  if (!href.startsWith("/")) return false;
  return currentPath() === normalizePath(href);
}

function activeAttributes(href: string) {
  return isCurrentHref(href)
    ? ' class="is-active" aria-current="page"'
    : "";
}

function externalAttributes(href: string) {
  return /^https?:\/\//i.test(href)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
}

function getProgramIcon(label: string) {
  const icons: Record<string, string> = {
    Gastronomía: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v7" />
        <path d="M5 3v4" />
        <path d="M9 3v4" />
        <path d="M7 10v11" />
        <path d="M16 3c-1.8 1.8-2.4 4-2.4 6.2V21" />
        <path d="M16 3c1.8 1.8 2.4 4 2.4 6.2" />
      </svg>
    `,
    Pastelería: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12c0-2.2 1.7-4 3.9-4 .9 0 1.7.3 2.3.8.6-.5 1.4-.8 2.3-.8 2.2 0 3.9 1.8 3.9 4" />
        <path d="M4 12h16" />
        <path d="M6 12v2.3c0 3 2.4 5.4 5.4 5.4h1.2c3 0 5.4-2.4 5.4-5.4V12" />
        <path d="M12 5.2V8" />
      </svg>
    `,
    "Bar Profesional": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12l-4.8 6.4v4.2l2.6 2.4H8.2l2.6-2.4v-4.2L6 4z" />
        <path d="M9 20h6" />
      </svg>
    `,
    Barismo: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9h9v4.2A4.8 4.8 0 0 1 10.2 18H10A4 4 0 0 1 6 14V9z" />
        <path d="M15 10h1.3A2.7 2.7 0 0 1 19 12.7 2.3 2.3 0 0 1 16.7 15H15" />
        <path d="M8.3 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M11.3 3.7c-.9 1-.9 2 .1 3" />
        <path d="M14.2 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M5 20h14" />
      </svg>
    `,
    Sommelier: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3h8v4.5A4 4 0 0 1 12 11.5 4 4 0 0 1 8 7.5V3z" />
        <path d="M12 11.5V18" />
        <path d="M9 21h6" />
      </svg>
    `,
    Cocina: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 10h12a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2z" />
        <path d="M7 10V8a5 5 0 0 1 10 0" />
        <path d="M19 12h1a1 1 0 0 1 1 1v2" />
        <path d="M6 19h10" />
      </svg>
    `,
    "Cocina Acelerada": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 10h12a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2z" />
        <path d="M7 10V8a5 5 0 0 1 10 0" />
        <path d="M19 12h1a1 1 0 0 1 1 1v2" />
        <path d="M6 19h10" />
      </svg>
    `,
  };

  return (
    icons[label] ??
    `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="M9 12h6" />
      </svg>
    `
  );
}

function getMainIcon(label: string) {
  const icons: Record<string, string> = {
    Eventos: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v3" />
        <path d="M17 3v3" />
        <path d="M4 9h16" />
        <rect x="4" y="5" width="16" height="15" rx="3" />
      </svg>
    `,
    "Bolsa laboral": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    `,
    Nosotros: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M15.8 14.3c2.7.2 4.2 1.7 4.7 4.2" />
      </svg>
    `,
    Contacto: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v12H8l-4 3V5z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    `,
  };

  return (
    icons[label] ??
    `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <path d="M9 12h6" />
      </svg>
    `
  );
}

function getSocialIcon(type: "facebook" | "instagram" | "tiktok") {
  const icons = {
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 8h2V4h-2c-2.2 0-4 1.8-4 4v2H8v4h2v6h4v-6h2.2l.8-4H14V8z" />
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    `,
    tiktok: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4c.6 1.8 1.8 3 4 3.5v3c-1.4 0-2.8-.4-4-1.2V15a5 5 0 1 1-5-5c.4 0 .7 0 1 .1v3.1a2 2 0 1 0 1 1.8V4h3z" />
      </svg>
    `,
  };

  return icons[type];
}

function renderProgramItems() {
  return programMenu
    .map((item) => {
      const visual = PROGRAM_VISUALS[item.label] ?? {
        description: "Conoce este programa de formación profesional.",
      };

      const label = visual.label ?? item.label;
      const href = visual.href ?? item.href;

      return `
        <a href="${href}" role="menuitem"${activeAttributes(href)}>
          <span class="program-menu__icon" aria-hidden="true">
            ${getProgramIcon(item.label)}
          </span>

          <span class="program-menu__copy">
            <strong>${label}</strong>
            <small>${visual.description}</small>
          </span>

          <span class="program-menu__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      `;
    })
    .join("");
}

export function renderNavbar() {
  const visibleMainMenu = mainMenu.filter(
    (item) => !HIDDEN_MAIN_MENU_LABELS.has(item.label)
  );

  return `
    <nav class="navbar" id="navbar" aria-label="Navegación principal">
      <div class="navbar__mobile-head">
        <div>
          <span>Menú principal</span>
          <strong>Cooking Gourmet</strong>
        </div>

        <button
          class="navbar__close"
          id="menuClose"
          type="button"
          aria-label="Cerrar menú"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="navbar__content">
        <div class="navbar__center">
          <ul class="nav-links">
            <li class="nav-item nav-item--dropdown" id="programsDropdown">
              <button
                class="nav-link nav-link--dropdown"
                id="programsBtn"
                type="button"
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="programsMenu"
              >
                <span class="nav-link__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 9l9-4 9 4-9 4-9-4z" />
                    <path d="M7 11v4c0 1.8 2.2 3 5 3s5-1.2 5-3v-4" />
                  </svg>
                </span>

                <span>Programas</span>

                <span class="nav-caret" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div class="program-menu" id="programsMenu" role="menu">
                <div class="program-menu__heading">
                  <span>Programas de estudio</span>
                  <strong>Elige el camino que impulsará tu futuro</strong>
                </div>

                <div class="program-menu__grid">
                  ${renderProgramItems()}
                </div>
              </div>
            </li>

            ${visibleMainMenu
              .map(
                (item) => `
                  <li class="nav-item">
                    <a
                      href="${item.href}"
                      class="nav-link${isCurrentHref(item.href) ? " is-active" : ""}"
                      ${isCurrentHref(item.href) ? 'aria-current="page"' : ""}
                      ${externalAttributes(item.href)}
                    >
                      <span class="nav-link__icon" aria-hidden="true">
                        ${getMainIcon(item.label)}
                      </span>
                      <span>${item.label}</span>
                    </a>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>

        <div class="nav-actions">
          <a
            href="https://cookingourmet.q10.com/"
            class="nav-action nav-action--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="nav-action__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="3" width="16" height="18" rx="3" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </span>
            <span>Aula Virtual</span>
          </a>

          <a
            href="${WHATSAPP_URL}"
            class="nav-action nav-action--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="nav-action__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 11.5A8.5 8.5 0 0 1 7 18.7L4 20l1.4-3A8.5 8.5 0 1 1 20 11.5z" />
                <path d="M9.4 8.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.1-.2.3 0 .5.4.8 1.1 1.5 1.9 2 .2.1.4.1.5 0l.7-.4c.2-.1.4-.1.6 0l1.8.9c.2.1.3.2.3.5v.5c0 .2 0 .4-.4.6-.4.2-1 .4-1.6.3-1-.1-2.1-.6-3.4-1.8-1.5-1.3-2.3-2.8-2.5-3.8-.1-.6 0-1.2.2-1.7z" />
              </svg>
            </span>
            <span>Solicitar información</span>
          </a>
        </div>

        <div class="navbar__mobile-footer">
          <span>Síguenos</span>

          <div class="navbar__socials">
            <a
              href="https://www.facebook.com/Cooking.Gourmet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Cooking Gourmet"
            >
              ${getSocialIcon("facebook")}
            </a>

            <a
              href="https://www.instagram.com/cooking_gourmet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Cooking Gourmet"
            >
              ${getSocialIcon("instagram")}
            </a>

            <a
              href="https://www.tiktok.com/@cooking.gourmet.oficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Cooking Gourmet"
            >
              ${getSocialIcon("tiktok")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;
}
