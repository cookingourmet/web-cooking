const WHATSAPP_NUMBER = "51981377382";

const MAP_CENTRAL_URL =
  "https://www.google.com/maps/search/?api=1&query=Av.%20Ferrocarril%20587%20Huancayo%20Jun%C3%ADn";

const MAP_BRANCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Los%20Andes%20376%20Psje.%20Manchego%20Mu%C3%B1oz%20El%20Tambo%20Huancayo";

function footerWhatsAppUrl() {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    "Quiero información sobre los programas gastronómicos en Huancayo.",
    "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type FooterIcon =
  | "chef"
  | "cake"
  | "cocktail"
  | "coffee"
  | "wine"
  | "pan"
  | "whatsapp"
  | "phone"
  | "mail"
  | "map"
  | "pin"
  | "arrow"
  | "home"
  | "users"
  | "book"
  | "contact";

function renderFooterIcon(icon: FooterIcon) {
  const icons: Record<FooterIcon, string> = {
    chef: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 11.2C4.6 10.8 3 9.3 3 7.3 3 5.1 4.8 3.5 6.9 3.5c.8 0 1.5.2 2.1.6A4.3 4.3 0 0 1 12 3a4.3 4.3 0 0 1 3 1.1c.6-.4 1.3-.6 2.1-.6 2.1 0 3.9 1.6 3.9 3.8 0 2-1.6 3.5-3.5 3.9"/>
        <path d="M6.5 11v7.2c0 1.1.9 1.8 1.9 1.8h7.2c1 0 1.9-.7 1.9-1.8V11"/>
        <path d="M9 15h6"/>
      </svg>
    `,
    cake: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h16v7H4z"/>
        <path d="M6 13v-2a6 6 0 0 1 12 0v2"/>
        <path d="M8 7V4"/>
        <path d="M16 7V4"/>
        <path d="M4 17c2 1.2 4 1.2 6 0s4-1.2 6 0 3.2.9 4 0"/>
      </svg>
    `,
    cocktail: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h14l-7 8z"/>
        <path d="M12 12v7"/>
        <path d="M8 20h8"/>
        <path d="M16 4l3-2"/>
      </svg>
    `,
    coffee: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/>
        <path d="M16 10h2.2a2.3 2.3 0 0 1 0 4.6H16"/>
        <path d="M8 5c0 1-.8 1-.8 2"/>
        <path d="M12 5c0 1-.8 1-.8 2"/>
      </svg>
    `,
    wine: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3h8v5a4 4 0 0 1-8 0z"/>
        <path d="M12 12v7"/>
        <path d="M8 21h8"/>
        <path d="M8 7h8"/>
      </svg>
    `,
    pan: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8v3.5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5z"/>
        <path d="M8 10l2 3"/>
        <path d="M12 8l1.5 3.5"/>
        <path d="M16 10l-2 3"/>
      </svg>
    `,
    whatsapp: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.8a8 8 0 0 1-11.8 7L4 20l1.2-4.1A8 8 0 1 1 20 11.8z"/>
        <path d="M9.3 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.4.5c-.1.2-.2.3-.1.5.4.8 1.1 1.5 1.9 1.9.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .7-.5 1.5-1.2 1.7-.6.2-1.4.1-2.4-.3-1.9-.8-3.5-2.3-4.4-4.2-.5-1-.6-1.9-.3-2.6z"/>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 4.8 8.7 4c.6-.2 1.2.1 1.4.7l.9 2.2c.2.5 0 1-.4 1.3l-1.1.8a12 12 0 0 0 5.5 5.5l.8-1.1c.3-.4.8-.6 1.3-.4l2.2.9c.6.2.9.8.7 1.4l-.8 2.1c-.2.6-.8 1-1.5.9C10.7 17.8 6.2 13.3 5.7 6.3c0-.7.3-1.3.9-1.5z"/>
      </svg>
    `,
    mail: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z"/>
        <path d="m4 7 8 6 8-6"/>
      </svg>
    `,
    map: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3z"/>
        <path d="M9 3v15"/>
        <path d="M15 6v15"/>
      </svg>
    `,
    pin: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11z"/>
        <circle cx="12" cy="10" r="2.5"/>
      </svg>
    `,
    arrow: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14"/>
        <path d="m13 6 6 6-6 6"/>
      </svg>
    `,
    home: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11 12 4l9 7"/>
        <path d="M5 10v10h14V10"/>
        <path d="M9 20v-6h6v6"/>
      </svg>
    `,
    users: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M17 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
        <path d="M3.5 20c.7-3.2 2.7-5 5.5-5s4.8 1.8 5.5 5"/>
        <path d="M14 17c.8-1 1.8-1.5 3-1.5 2 0 3.3 1.2 3.8 3.5"/>
      </svg>
    `,
    book: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h10a4 4 0 0 1 4 4v12H8a3 3 0 0 1-3-3z"/>
        <path d="M5 17a3 3 0 0 1 3-3h11"/>
        <path d="M9 8h6"/>
      </svg>
    `,
    contact: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v14H4z"/>
        <path d="M8 9h8"/>
        <path d="M8 13h5"/>
      </svg>
    `,
  };

  return icons[icon];
}

const footerPrograms: Array<{
  label: string;
  href: string;
  icon: FooterIcon;
}> = [
  {
    label: "Gastronomía Profesional",
    href: "/programas/gastronomia",
    icon: "chef",
  },
  {
    label: "Pastelería Profesional",
    href: "/programas/pasteleria",
    icon: "cake",
  },
  {
    label: "Bar Profesional",
    href: "/programas/bar-profesional",
    icon: "cocktail",
  },
  {
    label: "Barismo Profesional",
    href: "/programas/barismo",
    icon: "coffee",
  },
  {
    label: "Sommelier Profesional",
    href: "/programas/sommelier",
    icon: "wine",
  },
  {
    label: "Cocina Acelerada",
    href: "/programas/cocina-acelerada",
    icon: "pan",
  },
];

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer" id="footer">
      <div class="site-footer__glow site-footer__glow--one"></div>
      <div class="site-footer__glow site-footer__glow--two"></div>

      <div class="container site-footer__inner">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a href="/" class="site-footer__logo" aria-label="Ir al inicio de Cooking Gourmet">
              <img
                src="/logo.png"
                alt="Cooking Gourmet Escuela de Gastronomía en Huancayo"
                loading="lazy"
                decoding="async"
              />
            </a>

            <div>
              <strong>Cooking Gourmet</strong>
              <p>
                Escuela de Gastronomía en Huancayo. Formación práctica y presencial
                en Gastronomía, Pastelería, Barismo, Bar Profesional, Sommelier y Cocina Acelerada.
              </p>
            </div>
          </div>

          <div class="site-footer__cta">
            <span>Admisión e informes</span>
            <h3>¿Listo para iniciar tu formación gastronómica?</h3>
            <a
              href="${footerWhatsAppUrl()}"
              class="site-footer__whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="site-footer__whatsapp-icon">
                ${renderFooterIcon("whatsapp")}
              </span>
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        <div class="site-footer__grid">
          <div class="site-footer__col">
            <h4>Programas</h4>

            <nav class="site-footer__links" aria-label="Programas de Cooking Gourmet en Huancayo">
              ${footerPrograms
                .map(
                  (program) => `
                    <a href="${program.href}">
                      <span class="site-footer__link-icon">
                        ${renderFooterIcon(program.icon)}
                      </span>
                      <span>${program.label}</span>
                    </a>
                  `
                )
                .join("")}
            </nav>
          </div>

          <div class="site-footer__col">
            <h4>Contacto</h4>

            <ul class="site-footer__contact">
              <li>
                <span class="site-footer__contact-icon">
                  ${renderFooterIcon("whatsapp")}
                </span>

                <div>
                  <span class="site-footer__contact-label">WhatsApp</span>
                  <a
                    href="${footerWhatsAppUrl()}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +51 981 377 382
                  </a>
                </div>
              </li>

              <li>
                <span class="site-footer__contact-icon">
                  ${renderFooterIcon("phone")}
                </span>

                <div>
                  <span class="site-footer__contact-label">Teléfono</span>
                  <a href="tel:+5164659923">
                    (064) 659923
                  </a>
                </div>
              </li>

              <li>
                <span class="site-footer__contact-icon">
                  ${renderFooterIcon("mail")}
                </span>

                <div>
                  <span class="site-footer__contact-label">Correo</span>
                  <a href="mailto:ventas@cookingourmet.edu.pe">
                    ventas@cookingourmet.edu.pe
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div class="site-footer__col">
            <h4>Ubicación</h4>

            <address class="site-footer__address">
              <a
                class="site-footer__address-item"
                href="${MAP_CENTRAL_URL}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="site-footer__address-icon">
                  ${renderFooterIcon("pin")}
                </span>

                <div>
                  <span>Sede central</span>
                  Av. Ferrocarril 587 - Huancayo, Junín
                </div>
              </a>

              <a
                class="site-footer__address-item"
                href="${MAP_BRANCH_URL}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="site-footer__address-icon">
                  ${renderFooterIcon("map")}
                </span>

                <div>
                  <span>Sucursal</span>
                  Los Andes N° 376, Psje. Manchego Muñoz - El Tambo
                </div>
              </a>
            </address>
          </div>

          <div class="site-footer__col">
            <h4>Alcance</h4>

            <ul class="site-footer__zones">
              <li>Huancayo</li>
              <li>El Tambo</li>
              <li>Chilca</li>
              <li>Chupaca</li>
              <li>Concepción</li>
              <li>Jauja</li>
              <li>Tarma</li>
              <li>Chanchamayo</li>
              <li>Satipo</li>
            </ul>

            <a class="site-footer__mini-link" href="#programas">
              <span class="site-footer__mini-link-icon">
                ${renderFooterIcon("arrow")}
              </span>
              Ver programas disponibles
            </a>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p>
            © ${currentYear} Cooking Gourmet. Todos los derechos reservados.
          </p>

          <div class="site-footer__bottom-links">
            <a href="/">
              ${renderFooterIcon("home")}
              <span>Inicio</span>
            </a>

            <a href="#nosotros">
              ${renderFooterIcon("users")}
              <span>Nosotros</span>
            </a>

            <a href="#programas">
              ${renderFooterIcon("book")}
              <span>Programas</span>
            </a>

            <a href="#contacto">
              ${renderFooterIcon("contact")}
              <span>Contacto</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}