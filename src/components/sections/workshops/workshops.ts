import "./workshops.css";
const number = "51981377382";
const items = [
  { id:"cocina-peruana", title:"Cocina Peruana", image:"/images/portada/talleres/cocina-peruana.jpg" },
  { id:"pasteleria-comercial", title:"Pastelería Comercial", image:"/images/portada/nuevos-talleres/pasteleria-comercial.jpeg" },
  { id:"petit-four", title:"Petit Four", image:"/images/portada/nuevos-talleres/petit-four.jpeg" },
];
const whatsapp = (title:string) => `https://wa.me/${number}?text=${encodeURIComponent(`Hola, vengo de la página web de Cooking Gourmet. Quiero información sobre el taller de ${title}. ¿Podrían indicarme la próxima fecha, horario e inversión?`)}`;
export function renderWorkshopsSection() {
  return `<section class="cg-workshops" id="talleres" aria-labelledby="cg-workshops-title"><div class="cg-workshops__container">
    <header class="cg-workshops__heading"><div><span>Talleres prácticos</span><h2 id="cg-workshops-title">Aprende algo nuevo.</h2></div><p>Experiencias presenciales, concretas y enfocadas en la práctica.</p></header>
    <div class="cg-workshops__grid">${items.map((item,index) => `<a class="cg-workshop-card" href="${whatsapp(item.title)}" target="_blank" rel="noopener noreferrer" data-track-event="workshop_whatsapp_click" data-track-workshop="${item.id}"><img src="${item.image}" alt="Taller de ${item.title} en Cooking Gourmet" width="900" height="1200" loading="lazy" decoding="async" /><span class="cg-workshop-card__index">0${index+1}</span><span class="cg-workshop-card__copy"><small>Modalidad presencial</small><strong>${item.title}</strong><b>Consultar próxima fecha →</b></span></a>`).join("")}</div>
  </div></section>`;
}
