import { mainMenu, programMenu } from "../../../data/menu.data";

function getProgramIcon(label: string) {
  const icons: Record<string, string> = {
    "Gastronomía": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v7" />
        <path d="M5 3v4" />
        <path d="M9 3v4" />
        <path d="M7 10v11" />
        <path d="M16 3c-1.8 1.8-2.4 4-2.4 6.2V21" />
        <path d="M16 3c1.8 1.8 2.4 4 2.4 6.2" />
      </svg>
    `,
    "Pastelería": `
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
    "Barismo": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9h9v4.2A4.8 4.8 0 0 1 10.2 18H10A4 4 0 0 1 6 14V9z" />
        <path d="M15 10h1.3A2.7 2.7 0 0 1 19 12.7 2.3 2.3 0 0 1 16.7 15H15" />
        <path d="M8.3 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M11.3 3.7c-.9 1-.9 2 .1 3" />
        <path d="M14.2 4.2c-.7.8-.8 1.7-.1 2.5" />
        <path d="M5 20h14" />
      </svg>
    `,
    "Sommelier": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3h8v4.5A4 4 0 0 1 12 11.5 4 4 0 0 1 8 7.5V3z" />
        <path d="M12 11.5V18" />
        <path d="M9 21h6" />
      </svg>
    `,
    "Cocina": `
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
        <circle cx="12" cy="12" r="6" />
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
    Estudiantes: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9l9-4 9 4-9 4-9-4z" />
        <path d="M7 11v4c0 1.8 2.2 3 5 3s5-1.2 5-3v-4" />
      </svg>
    `,
    Rutas: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18c6 0 2-10 8-10" />
      </svg>
    `,
    Inscripción: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4h3a2 2 0 0 1 2 2v14l-5-3-5 3V6a2 2 0 0 1 2-2h3" />
        <path d="M9 4h6" />
      </svg>
    `,
    "Bolsa laboral": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    `,
  };

  return (
    icons[label] ??
    `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="6" />
      </svg>
    `
  );
}

function getSocialIcon(type: "facebook" | "instagram" | "tiktok" | "whatsapp") {
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
    whatsapp: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5A8.5 8.5 0 0 1 7 18.7L4 20l1.4-3A8.5 8.5 0 1 1 20 11.5z" />
        <path d="M9.4 8.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.1-.2.3 0 .5.4.8 1.1 1.5 1.9 2 .2.1.4.1.5 0l.7-.4c.2-.1.4-.1.6 0l1.8.9c.2.1.3.2.3.5v.5c0 .2 0 .4-.4.6-.4.2-1 .4-1.6.3-1-.1-2.1-.6-3.4-1.8-1.5-1.3-2.3-2.8-2.5-3.8-.1-.6 0-1.2.2-1.7z" />
      </svg>
    `,
  };

  return icons[type];
}

export function renderNavbar() {
  return `
    <nav class="navbar" id="navbar">
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
              <span class="nav-link__icon nav-link__icon--gold" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M3 9l9-4 9 4-9 4-9-4z" />
                  <path d="M7 11v4c0 1.8 2.2 3 5 3s5-1.2 5-3v-4" />
                </svg>
              </span>
              <span>Programas de Estudio</span>
              <span class="nav-caret" aria-hidden="true">▾</span>
            </button>

            <div class="dropdown-menu" id="programsMenu" role="menu">
              ${programMenu
                .map(
                  (item) => `
                    <a href="${item.href}" role="menuitem">
                      <span class="dropdown-menu__icon" aria-hidden="true">
                        ${getProgramIcon(item.label)}
                      </span>
                      <span>${item.label}</span>
                    </a>
                  `
                )
                .join("")}
            </div>
          </li>

          ${mainMenu
            .map(
              (item) => `
                <li>
                  <a class="nav-link" href="${item.href}">
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
        <a href="https://cookingourmet.q10.com/" class="btn-virtual">
          <span class="btn-virtual__glow"></span>
          <span>Aula Virtual</span>
        </a>

        <a href="#" class="nav-link nav-link--icon">
          <span class="nav-link__icon nav-link__icon--gold" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M4.9 4.9a10 10 0 1 1 0 14.2" />
            </svg>
          </span>
          <span>Intranet</span>
        </a>

        <div class="socials">
          <a
              href="https://www.facebook.com/Cooking.Gourmet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              ${getSocialIcon("facebook")}
            </a>

            <a
              href="https://www.instagram.com/cooking_gourmet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              ${getSocialIcon("instagram")}
            </a>

            <a
              href="https://www.tiktok.com/@cooking.gourmet.oficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              ${getSocialIcon("tiktok")}
            </a>
          <a
            href="https://wa.me/51981377382?text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            ${getSocialIcon("whatsapp")}
          </a>
        </div>
      </div>
    </nav>
  `;
}