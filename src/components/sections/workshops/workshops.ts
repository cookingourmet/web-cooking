import "./workshops.css";
import { workshopCampaigns, workshopCampaignWhatsAppUrl, workshopContact } from "../../../data/workshopCampaigns.data";

/** Tarjetas de talleres reales con descripción y «El plus», sin mostrar
 * convocatorias antiguas como actuales. Los cuatro afiches van en el slider principal.
 */
export function renderWorkshopsSection() {
  return `<section class="cg-workshops cg-workshops--campaign" id="talleres" aria-labelledby="cg-workshops-title">
    <div class="cg-workshops__container">
      <header class="cg-workshops__heading">
        <div><span>Cooking Gourmet · Huancayo</span><h2 id="cg-workshops-title">Talleres para aprender y emprender.</h2></div>
        <p>Descubre las nuevas convocatorias de noviembre y diciembre y consulta las vacantes directamente con nuestro equipo.</p>
      </header>
      <div class="cg-workshops__grid cg-workshops__grid--campaign">
        ${workshopCampaigns.map((item) => `
          <article class="cg-workshop-campaign-card" id="taller-${item.id}">
            <a class="cg-workshop-campaign-card__media" href="${workshopCampaignWhatsAppUrl(item)}" target="_blank" rel="noopener noreferrer" data-track-event="workshop_whatsapp_click" data-track-workshop="${item.id}" aria-label="Consultar taller ${item.title}">
              <img src="${item.image}" alt="${item.imageAlt}" width="1200" height="1200" loading="lazy" decoding="async" />
            </a>
            <div class="cg-workshop-campaign-card__body">
              <span class="cg-workshop-campaign-card__date">Inicio · ${item.dateLabel}</span>
              <h3>${item.title}</h3>
              <p>${item.intro}</p>
              <div class="cg-workshop-campaign-card__benefit"><strong>El plus</strong><p>${item.plus}</p></div>
              <p class="cg-workshop-campaign-card__tagline">${item.tagline}</p>
              <a class="cg-workshop-campaign-card__action" href="${workshopCampaignWhatsAppUrl(item)}" target="_blank" rel="noopener noreferrer" data-track-event="workshop_whatsapp_click" data-track-workshop="${item.id}">Consultar vacantes <span aria-hidden="true">↗</span></a>
            </div>
          </article>`).join("")}
      </div>
      <div class="cg-workshops-contact" aria-label="Información e inscripciones">
        <div><span class="cg-workshops-contact__eyebrow">Más información e inscripciones</span><a href="tel:+${workshopContact.phoneInternational}" class="cg-workshops-contact__phone">${workshopContact.phoneText}</a></div>
        <div class="cg-workshops-contact__locations">${workshopContact.locations.map((location) => `<p><strong>${location.name}</strong><span>${location.address} · Huancayo</span></p>`).join("")}</div>
      </div>
    </div>
  </section>`;
}
