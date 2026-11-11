/** Convocatorias de talleres de noviembre-diciembre de 2026.
 * Textos proporcionados por Marketing Cooking Gourmet, 10 de noviembre de 2026.
 * NOTA: el afiche de Parrilla dice 24/11, el copy dice 26/11.
 * Fecha de texto vigente aquí: 26/11; corregir afiche antes de publicación.
 * No se inventan precios, horarios ni cupos disponibles.
 */
export type WorkshopCampaign = {
  id: string;
  title: string;
  dateLabel: string;
  startsOn: string;
  image: string;
  imageAlt: string;
  intro: string;
  plus: string;
  tagline: string;
};

export const workshopCampaigns: WorkshopCampaign[] = [
  {
    id: "parrilla-carbones",
    title: "Parrilla y Carbones",
    dateLabel: "24 de noviembre",
    startsOn: "2026-11-26",
    image: "/images/talleres/cuadrados/parrilla-carbones.webp",
    imageAlt: "Afiche del taller Parrilla y Carbones de Cooking Gourmet.",
    intro: "Aprende de manera práctica a controlar el fuego, trabajar correctamente las brasas y lograr carnes con excelente sabor, textura y punto de cocción.",
    plus: "Conoce técnicas para aprovechar mejor el carbón, controlar temperaturas y conseguir ese auténtico sabor parrillero que marca la diferencia.",
    tagline: "Inscríbete ahora y lleva tus preparaciones a otro nivel.",
  },
  {
    id: "decoracion-tortas",
    title: "Decoración de Tortas",
    dateLabel: "24 de noviembre",
    startsOn: "2026-11-24",
    image: "/images/talleres/cuadrados/decoracion-tortas.webp",
    imageAlt: "Afiche del taller Decoración de Tortas de Cooking Gourmet. Inicio 24 de noviembre.",
    intro: "Aprenderás técnicas prácticas para lograr presentaciones más atractivas, profesionales y creativas.",
    plus: "Perfecciona acabados, decoración y presentación para crear tortas que destaquen visualmente, ideales para celebraciones, pedidos o tu propio emprendimiento.",
    tagline: "Haz que tus creaciones también enamoren a primera vista.",
  },
  {
    id: "pizza-perfecta",
    title: "Pizza Perfecta",
    dateLabel: "26 de noviembre",
    startsOn: "2026-11-26",
    image: "/images/talleres/cuadrados/pizza-perfecta.webp",
    imageAlt: "Afiche del taller Pizza Perfecta de Cooking Gourmet. Inicio 26 de noviembre.",
    intro: "Descubre los secretos para preparar pizzas deliciosas desde cero, trabajando cada etapa de manera práctica y profesional.",
    plus: "Aprende a conseguir una buena masa, combinar correctamente tus ingredientes y lograr una pizza con excelente textura, sabor y acabado.",
    tagline: "Convierte cada pizza en una experiencia irresistible.",
  },
  {
    id: "postres-navidenos",
    title: "Postres Navideños",
    dateLabel: "1 de diciembre",
    startsOn: "2026-12-01",
    image: "/images/talleres/cuadrados/postres-navidenos.webp",
    imageAlt: "Afiche del taller Postres Navideños de Cooking Gourmet. Inicio 1 de diciembre.",
    intro: "Aprende a preparar postres inspirados en la temporada navideña y sorprende con presentaciones especiales, llenas de sabor y creatividad.",
    plus: "Ideal para aprender nuevas preparaciones para compartir en familia o ampliar tu catálogo y generar ingresos durante la campaña navideña.",
    tagline: "Prepárate para una Navidad llena de sabor.",
  },
];

export const workshopContact = {
  phoneText: "981 377 382",
  phoneInternational: "51981377382",
  locations: [
    { name: "Sede Central", address: "Av. Ferrocarril 587" },
    { name: "Sede El Tambo", address: "Pasaje Los Andes 376" },
  ],
};

export function workshopCampaignWhatsAppUrl(workshop: WorkshopCampaign) {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    `Quisiera información para inscribirme al taller ${workshop.title}.`,
    `Inicio: ${workshop.dateLabel} de 2026.`,
    "¿Me confirman vacantes, precio, horarios y sede?",
  ].join("\n");
  return `https://wa.me/${workshopContact.phoneInternational}?text=${encodeURIComponent(message)}`;
}
