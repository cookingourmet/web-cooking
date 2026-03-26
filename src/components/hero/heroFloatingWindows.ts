export function renderStartWindow() {
  return `
    <div class="hero-start-window" aria-label="Inicio de clases">
      <div class="hero-start-window__top">
        <span class="hero-start-window__eyebrow">Inicio de clases</span>
        <span class="hero-start-window__pulse" aria-hidden="true"></span>
      </div>

      <div class="hero-start-window__date-wrap">
        <strong class="hero-start-window__day">11</strong>
        <span class="hero-start-window__month">de mayo</span>
      </div>

      <p class="hero-start-window__text">
        Matrículas abiertas. Reserva tu vacante y prepárate para empezar con formación práctica desde el primer día.
      </p>

      <div class="hero-start-window__footer">
        <span class="hero-start-window__status">
          <span class="hero-start-window__status-dot" aria-hidden="true"></span>
          Vacantes disponibles
        </span>
      </div>
    </div>
  `;
}

export function renderWorkshopWindow() {
  return `
    <a
      href="#programa-cocina"
      class="hero-workshop-window"
      aria-label="Ir al taller destacado Panes hojaldrados"
    >
      <span class="hero-workshop-window__glow" aria-hidden="true"></span>
      <span class="hero-workshop-window__shine" aria-hidden="true"></span>

      <div class="hero-workshop-window__panel">
        <div class="hero-workshop-window__label-wrap">
          <span class="hero-workshop-window__label">Taller destacado</span>
          <span class="hero-workshop-window__badge">Práctico</span>
        </div>

        <h3 class="hero-workshop-window__title">
          Panes<br>hojaldrados
        </h3>

        <p class="hero-workshop-window__text">
          Aprende técnica, laminado y acabado profesional con práctica guiada en cocina.
        </p>

        <div class="hero-workshop-window__meta">
          <span class="hero-workshop-window__meta-item">Cupos limitados</span>
          <span class="hero-workshop-window__meta-dot" aria-hidden="true"></span>
          <span class="hero-workshop-window__meta-item">Modalidad presencial</span>
        </div>

        <div class="hero-workshop-window__cta">
          <span>Unirme al taller</span>
          <span class="hero-workshop-window__cta-icon" aria-hidden="true">↗</span>
        </div>
      </div>
    </a>
  `;
}