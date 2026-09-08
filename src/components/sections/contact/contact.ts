import "./contact.css";

const message = encodeURIComponent("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre los programas, horarios e inversión.");
const whatsapp = `https://wa.me/51981377382?text=${message}`;
const map = "https://www.google.com/maps/search/?api=1&query=Av.%20Ferrocarril%20587%20Huancayo%20Jun%C3%ADn";

export function renderContactSection() {
  return `
    <section class="cg-contact" id="contacto" aria-labelledby="cg-contact-title">
      <div class="cg-contact__container">
        <div class="cg-contact__copy">
          <span>Admisión</span>
          <h2 id="cg-contact-title">Tu próximo paso empieza aquí.</h2>
          <p>Consulta horarios, inversión y vacantes disponibles.</p>
          <a href="${whatsapp}" target="_blank" rel="noopener noreferrer" data-cta-location="contact">Escribir por WhatsApp <b>→</b></a>
        </div>
        <div class="cg-contact__details">
          <div><span>Visítanos</span><a href="${map}" target="_blank" rel="noopener noreferrer">Av. Ferrocarril 587, Huancayo</a></div>
          <div><span>Llámanos</span><a href="tel:+51981377382">+51 981 377 382</a></div>
          <div><span>Referencia</span><a href="${map}" target="_blank" rel="noopener noreferrer">Esquina de Av. Ferrocarril y Cuzco</a></div>
        </div>
      </div>
    </section>`;
}
