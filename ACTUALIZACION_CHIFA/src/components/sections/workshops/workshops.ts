import "./workshops.css";
import { getAvailableWorkshops, workshopWhatsAppUrl } from "../../../data/workshops.data";
export function renderWorkshopsSection() {
  return `<section class="cg-workshops" id="talleres" aria-labelledby="cg-workshops-title"><div class="cg-workshops__container">
    <header class="cg-workshops__heading"><div><span>Talleres prácticos</span><h2 id="cg-workshops-title">Aprende algo nuevo.</h2></div><p>Experiencias presenciales, concretas y enfocadas en la práctica.</p></header>
    <div class="cg-workshops__grid">${getAvailableWorkshops().map((item,index) => `<a class="cg-workshop-card" href="${workshopWhatsAppUrl(item)}" target="_blank" rel="noopener noreferrer" data-track-event="workshop_whatsapp_click" data-track-workshop="${item.id}"><img src="${item.image}" alt="Taller de ${item.title} en Cooking Gourmet" width="900" height="1200" loading="lazy" decoding="async" /><span class="cg-workshop-card__index">0${index+1}</span><span class="cg-workshop-card__copy"><small>${item.dateLabel} · Presencial</small><strong>${item.title}</strong><b>Consultar taller →</b></span></a>`).join("")}</div>
  </div></section>`;
}
