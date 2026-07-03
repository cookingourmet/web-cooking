import "./contact.css";

type ContactItem = {
  label: string;
  title: string;
  text: string;
  href: string;
  external?: boolean;
};

const WHATSAPP_NUMBER = "51981377382";
const PHONE_LABEL = "+51 981 377 382";
const PHONE_LINK = "tel:+51981377382";
const EMAIL = "ventas@cookingourmet.edu.pe";
const ADDRESS = "Av. Ferrocarril 587 - Huancayo, Junín";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Av.%20Ferrocarril%20587%20Huancayo%20Jun%C3%ADn";

function contactWhatsAppUrl() {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    "Quiero información sobre los programas presenciales en Huancayo.",
    "Deseo conocer horarios, matrícula, mensualidad e inicio de clases.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderContactItem(item: ContactItem) {
  const externalAttrs = item.external
    ? 'target="_blank" rel="noopener noreferrer"'
    : "";

  return `
    <a class="cg-contact-card" href="${item.href}" ${externalAttrs}>
      <span class="cg-contact-card__label">${item.label}</span>
      <strong>${item.title}</strong>
      <p>${item.text}</p>
    </a>
  `;
}

const contactItems: ContactItem[] = [
  {
    label: "WhatsApp",
    title: "Solicita información",
    text: "Habla con admisión sobre horarios, matrícula, mensualidad e inicio de clases.",
    href: contactWhatsAppUrl(),
    external: true,
  },
  {
    label: "Teléfono",
    title: PHONE_LABEL,
    text: "Comunícate directamente con Cooking Gourmet Huancayo.",
    href: PHONE_LINK,
  },
  {
    label: "Correo",
    title: EMAIL,
    text: "Escríbenos para consultas académicas, admisión o información institucional.",
    href: `mailto:${EMAIL}`,
  },
  {
    label: "Ubicación",
    title: "Sede Huancayo",
    text: ADDRESS,
    href: MAP_URL,
    external: true,
  },
];

export function renderContactSection() {
  return `
    <section class="cg-contact" id="contacto" aria-labelledby="cg-contact-title">
      <div class="cg-contact__bg"></div>

      <div class="cg-contact__container">
        <div class="cg-contact__heading">
          <span class="cg-contact__eyebrow">Contacto</span>

          <h2 id="cg-contact-title">
            Conversemos sobre tu próximo paso en Cooking Gourmet Huancayo
          </h2>

          <p>
            Estamos en Huancayo para orientarte sobre nuestros programas de
            Gastronomía Profesional, Pastelería, Barismo, Bar Profesional,
            Sommelier y Cocina Acelerada. Solicita información y asegura tu vacante.
          </p>
        </div>

        <div class="cg-contact__layout">
          <div class="cg-contact__info">
            <div class="cg-contact__grid">
              ${contactItems.map(renderContactItem).join("")}
            </div>

            <div class="cg-contact__schedule">
              <span>Atención de admisión</span>
              <strong>Recibe orientación personalizada</strong>
              <p>
                Consulta por horarios disponibles, inversión, requisitos,
                ubicación de la sede e inicio de clases para programas
                presenciales en Huancayo.
              </p>

              <div class="cg-contact__actions">
                <a
                  class="cg-contact-btn cg-contact-btn--primary"
                  href="${contactWhatsAppUrl()}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribir por WhatsApp
                </a>

                <a
                  class="cg-contact-btn cg-contact-btn--ghost"
                  href="${MAP_URL}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación
                </a>
              </div>
            </div>
          </div>

          <aside class="cg-contact__panel">
            <span class="cg-contact__panel-badge">Cooking Gourmet</span>

            <h3>Escuela de gastronomía en Huancayo</h3>

            <p>
              Formación práctica, presencial y orientada al mundo gastronómico
              para estudiantes, emprendedores y profesionales de Huancayo y la
              región Junín.
            </p>

            <ul>
              <li>Gastronomía Profesional</li>
              <li>Pastelería Profesional</li>
              <li>Barismo y Bar Profesional</li>
              <li>Sommelier y Cocina Acelerada</li>
            </ul>

            <div class="cg-contact__address">
              <span>Dirección</span>
              <strong>${ADDRESS}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}