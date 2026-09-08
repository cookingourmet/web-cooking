const whatsapp = `https://wa.me/51981377382?text=${encodeURIComponent("Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre sus programas.")}`;
const map = "https://www.google.com/maps/search/?api=1&query=Av.%20Ferrocarril%20587%20Huancayo%20Jun%C3%ADn";

export function renderFooter() {
  return `
    <footer class="site-footer" id="footer">
      <div class="container site-footer__top">
        <a class="site-footer__brand" href="/" aria-label="Cooking Gourmet - Inicio">
          <img src="/logo.png" alt="" width="52" height="52" loading="lazy" />
          <span><strong>Cooking Gourmet</strong><small>Escuela de Gastronomía</small></span>
        </a>
        <p>Formación práctica y presencial en Huancayo.</p>
        <a class="site-footer__cta" href="${whatsapp}" target="_blank" rel="noopener noreferrer" data-cta-location="footer">Hablar por WhatsApp</a>
      </div>
      <div class="container site-footer__line"></div>
      <div class="container site-footer__content">
        <nav aria-label="Redes sociales y aula virtual">
          <a href="https://www.instagram.com/cooking_gourmet/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/Cooking.Gourmet" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@cooking.gourmet.oficial" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://cookingourmet.q10.com/" target="_blank" rel="noopener noreferrer">Aula Virtual</a>
        </nav>
        <div class="site-footer__contact">
          <a href="tel:+5164659923">(064) 659923</a>
          <a href="${map}" target="_blank" rel="noopener noreferrer">Av. Ferrocarril 587, Huancayo</a>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© ${new Date().getFullYear()} Cooking Gourmet</span>
        <span>Huancayo, Junín</span>
      </div>
    </footer>`;
}
