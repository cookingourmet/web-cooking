export type WorkshopFaq = {
  question: string;
  answer: string;
};

export type WorkshopStatus = {
  key: "today" | "ongoing" | "tomorrow" | "upcoming" | "ended";
  label: string;
  shortLabel: string;
  daysUntilStart: number;
};

export type Workshop = {
  id: string;
  leadCode: string;
  slug: string;
  title: string;
  shortTitle: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  dateBadgeDay: string;
  dateBadgeMonth: string;
  price: string;
  capacity: string;
  modality: string;
  location: string;
  image: string;
  imageAlt: string;
  topics: string[];
  audience: string[];
  includes: string[];
  outcomes: string[];
  faqs: WorkshopFaq[];
  summary: string;
  seoDescription: string;
};

// Fechas de fin calculadas según sesiones y frecuencia publicadas en cada taller.
export const workshops: Workshop[] = [
  {
    "id": "fast-food",
    "leadCode": "FF-OCT26",
    "slug": "fast-food",
    "title": "Fast Food",
    "shortTitle": "Fast Food",
    "startDate": "2026-10-26",
    "endDate": "2026-10-29",
    "dateLabel": "Inicio 26 de octubre",
    "dateBadgeDay": "26",
    "dateBadgeMonth": "Octubre",
    "price": "S/ 400",
    "capacity": "Consultar disponibilidad",
    "modality": "Presencial",
    "location": "Huancayo",
    "image": "/images/portada/talleres/fast-food.jpg",
    "imageAlt": "Taller de Fast Food de Cooking Gourmet en Huancayo",
    "topics": [
      "Broaster y Pop Corn Chicken",
      "Festival de alitas: BBQ, acevichada y honey mustard",
      "Burger Party: Royal, a lo pobre y americana",
      "Tenders de pollo y salsas: tártara, mayonesa, olivo y chimichurri"
    ],
    "audience": [
      "Público en general",
      "Amantes de la cocina",
      "Personas interesadas en ampliar su repertorio culinario"
    ],
    "includes": [
      "4 sesiones prácticas de 3 horas",
      "Lunes a jueves · 2:00 p.m. a 5:00 p.m.",
      "Insumos y materiales 100% incluidos",
      "Docentes capacitados y laboratorios de cocina"
    ],
    "outcomes": [
      "Desarrolla técnicas de preparación, presentación y comercialización de comida rápida, con manipulación higiénica, organización de cocina y control de insumos.",
      "Mejorar el sabor, la textura y la presentación de las preparaciones",
      "Aplicar buenas prácticas de higiene y organización"
    ],
    "faqs": [
      {
        "question": "¿Cuál es la duración y el horario?",
        "answer": "4 sesiones de 3 horas. Lunes a jueves · 2:00 p.m. a 5:00 p.m. Inicio: 26 de octubre de 2026."
      },
      {
        "question": "¿Cuál es la inversión y qué incluye?",
        "answer": "El costo total es S/ 400. Incluye insumos y materiales para las clases prácticas. Todo pago debe acreditarse con su comprobante."
      },
      {
        "question": "¿Se entrega certificado?",
        "answer": "Se otorga certificado al culminar, con un costo adicional aproximado de S/ 50.00."
      },
      {
        "question": "¿Cómo me inscribo y dónde se realiza?",
        "answer": "Escríbenos al 981 377 382 para confirmar vacantes, sede y matrícula. Sede Central: Av. Ferrocarril 587, Huancayo. Sede El Tambo: Pasaje Los Andes 376."
      }
    ],
    "summary": "Desarrolla técnicas de preparación, presentación y comercialización de comida rápida, con manipulación higiénica, organización de cocina y control de insumos.",
    "seoDescription": "Taller presencial de Fast Food en Cooking Gourmet Huancayo. Inicio 26 de octubre, 4 sesiones, S/ 400 e insumos incluidos."
  },
  {
    "id": "pescados-y-mariscos",
    "leadCode": "PM-OCT26",
    "slug": "pescados-y-mariscos",
    "title": "Pescados y Mariscos — Avanzado",
    "shortTitle": "Pescados y Mariscos — Avanzado",
    "startDate": "2026-10-26",
    "endDate": "2026-11-04",
    "dateLabel": "Inicio 26 de octubre",
    "dateBadgeDay": "26",
    "dateBadgeMonth": "Octubre",
    "price": "S/ 280",
    "capacity": "Consultar disponibilidad",
    "modality": "Presencial",
    "location": "Huancayo",
    "image": "/images/portada/talleres/pescados-mariscos.jpg",
    "imageAlt": "Taller de Pescados y Mariscos — Avanzado de Cooking Gourmet en Huancayo",
    "topics": [
      "Tiraditos: criollo, ambrosía y trucha",
      "Choritos a la chalaca y conchas a la parmesana",
      "Pulpo al olivo y cau cau de mariscos",
      "Calamar relleno y pulpo al grill",
      "Paella de mariscos y chita a la sal",
      "Arrisotado norteño y saltado de pescados",
      "Chupe de camarones y sudado de pescado",
      "Pescado en salsa de camarones y escabeche de pescado"
    ],
    "audience": [
      "Público en general",
      "Amantes de la cocina",
      "Personas interesadas en ampliar su repertorio culinario"
    ],
    "includes": [
      "8 sesiones prácticas de 3 horas",
      "Lunes a viernes · 5:30 p.m. a 8:30 p.m.",
      "Insumos y materiales 100% incluidos",
      "Docentes capacitados y laboratorios de cocina"
    ],
    "outcomes": [
      "Fortalece tus técnicas de selección, limpieza, conservación, corte y cocción de pescados y mariscos. Combina preparaciones tradicionales y contemporáneas con buenas prácticas de higiene.",
      "Mejorar el sabor, la textura y la presentación de las preparaciones",
      "Aplicar buenas prácticas de higiene y organización"
    ],
    "faqs": [
      {
        "question": "¿Cuál es la duración y el horario?",
        "answer": "8 sesiones de 3 horas. Lunes a viernes · 5:30 p.m. a 8:30 p.m. Inicio: 26 de octubre de 2026."
      },
      {
        "question": "¿Cuál es la inversión y qué incluye?",
        "answer": "El costo total es S/ 280. Incluye insumos y materiales para las clases prácticas. Todo pago debe acreditarse con su comprobante."
      },
      {
        "question": "¿Se entrega certificado?",
        "answer": "Se otorga certificado al culminar, con un costo adicional aproximado de S/ 50.00."
      },
      {
        "question": "¿Cómo me inscribo y dónde se realiza?",
        "answer": "Escríbenos al 981 377 382 para confirmar vacantes, sede y matrícula. Sede Central: Av. Ferrocarril 587, Huancayo. Sede El Tambo: Pasaje Los Andes 376."
      }
    ],
    "summary": "Fortalece tus técnicas de selección, limpieza, conservación, corte y cocción de pescados y mariscos. Combina preparaciones tradicionales y contemporáneas con buenas prácticas de higiene.",
    "seoDescription": "Taller presencial de Pescados y Mariscos — Avanzado en Cooking Gourmet Huancayo. Inicio 26 de octubre, 8 sesiones, S/ 280 e insumos incluidos."
  },
  {
    "id": "cocina-peruana",
    "leadCode": "CP-OCT26",
    "slug": "cocina-peruana",
    "title": "Cocina Peruana",
    "shortTitle": "Cocina Peruana",
    "startDate": "2026-10-28",
    "endDate": "2026-11-20",
    "dateLabel": "Inicio 28 de octubre",
    "dateBadgeDay": "28",
    "dateBadgeMonth": "Octubre",
    "price": "S/ 280",
    "capacity": "Consultar disponibilidad",
    "modality": "Presencial",
    "location": "Huancayo",
    "image": "/images/portada/talleres/cocina-peruana.jpg",
    "imageAlt": "Taller de Cocina Peruana de Cooking Gourmet en Huancayo",
    "topics": [
      "Causa tricolor",
      "Solterito de queso y palta a la reina",
      "Ají de gallina y escabeche de pollo",
      "Papa rellena y arroz tapado",
      "Sopa seca y carapulcra",
      "Lomo saltado y mondonguito italiano",
      "Arroz con pollo y rocoto arequipeño con pastel de papa",
      "Juane de gallina y tacacho con cecina"
    ],
    "audience": [
      "Público en general",
      "Amantes de la cocina",
      "Personas interesadas en ampliar su repertorio culinario"
    ],
    "includes": [
      "8 sesiones prácticas de 3 horas",
      "Miércoles y viernes · 5:30 p.m. a 8:30 p.m.",
      "Insumos y materiales 100% incluidos",
      "Docentes capacitados y laboratorios de cocina"
    ],
    "outcomes": [
      "Aprende preparaciones representativas del Perú y refuerza la selección de insumos, mise en place, fondos, aderezos, técnicas de cocción y presentación final.",
      "Mejorar el sabor, la textura y la presentación de las preparaciones",
      "Aplicar buenas prácticas de higiene y organización"
    ],
    "faqs": [
      {
        "question": "¿Cuál es la duración y el horario?",
        "answer": "8 sesiones de 3 horas. Miércoles y viernes · 5:30 p.m. a 8:30 p.m. Inicio: 28 de octubre de 2026."
      },
      {
        "question": "¿Cuál es la inversión y qué incluye?",
        "answer": "El costo total es S/ 280. Incluye insumos y materiales para las clases prácticas. Todo pago debe acreditarse con su comprobante."
      },
      {
        "question": "¿Se entrega certificado?",
        "answer": "Se otorga certificado al culminar, con un costo adicional aproximado de S/ 50.00."
      },
      {
        "question": "¿Cómo me inscribo y dónde se realiza?",
        "answer": "Escríbenos al 981 377 382 para confirmar vacantes, sede y matrícula. Sede Central: Av. Ferrocarril 587, Huancayo. Sede El Tambo: Pasaje Los Andes 376."
      }
    ],
    "summary": "Aprende preparaciones representativas del Perú y refuerza la selección de insumos, mise en place, fondos, aderezos, técnicas de cocción y presentación final.",
    "seoDescription": "Taller presencial de Cocina Peruana en Cooking Gourmet Huancayo. Inicio 28 de octubre, 8 sesiones, S/ 280 e insumos incluidos."
  }
];

function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(value = new Date()) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function daysBetween(from: Date, to: Date) {
  const dayMs = 86_400_000;
  return Math.round((to.getTime() - from.getTime()) / dayMs);
}

export function getWorkshopStatus(workshop: Workshop, now = new Date()): WorkshopStatus {
  const today = startOfDay(now);
  const start = parseLocalDate(workshop.startDate);
  const end = parseLocalDate(workshop.endDate);
  const daysUntilStart = daysBetween(today, start);

  if (today.getTime() > end.getTime()) {
    return {
      key: "ended",
      label: "Taller finalizado",
      shortLabel: "Finalizado",
      daysUntilStart,
    };
  }

  if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
    const startsToday = today.getTime() === start.getTime();
    return {
      key: startsToday ? "today" : "ongoing",
      label: startsToday ? "Inicia hoy" : "Taller en curso",
      shortLabel: startsToday ? "Hoy" : "En curso",
      daysUntilStart,
    };
  }

  if (daysUntilStart === 1) {
    return {
      key: "tomorrow",
      label: "Inicia mañana",
      shortLabel: "Mañana",
      daysUntilStart,
    };
  }

  return {
    key: "upcoming",
    label: daysUntilStart <= 7 ? `Faltan ${daysUntilStart} días` : "Próximo taller",
    shortLabel: daysUntilStart <= 7 ? `${daysUntilStart} días` : "Próximo",
    daysUntilStart,
  };
}

export function getAvailableWorkshops(now = new Date()) {
  return workshops
    .filter((workshop) => getWorkshopStatus(workshop, now).key !== "ended")
    .sort((a, b) => {
      const aStatus = getWorkshopStatus(a, now);
      const bStatus = getWorkshopStatus(b, now);
      const priority = (status: WorkshopStatus) =>
        status.key === "today" || status.key === "ongoing" ? 0 : 1;

      const statusDifference = priority(aStatus) - priority(bStatus);
      if (statusDifference !== 0) return statusDifference;

      return parseLocalDate(a.startDate).getTime() - parseLocalDate(b.startDate).getTime();
    });
}

export function findWorkshopBySlug(slug: string) {
  return workshops.find((workshop) => workshop.slug === slug);
}

export function workshopPath(workshop: Workshop) {
  return `/talleres/${workshop.slug}`;
}

type WorkshopWhatsAppIntent = "info" | "reserve" | "next";

function readAttribution() {
  if (typeof window === "undefined") return { source: "web", campaign: "organico" };
  const direct = new URLSearchParams(window.location.search);
  let stored: Record<string, string> = {};

  try {
    const saved = window.sessionStorage.getItem("cg_attribution");
    if (saved) stored = JSON.parse(saved);
  } catch {
    // Si sessionStorage no está disponible, usamos los parámetros actuales.
  }

  const source = direct.get("utm_source") || stored.utm_source || "web";
  const campaign = direct.get("utm_campaign") || stored.utm_campaign || "organico";

  return { source, campaign };
}

export function workshopWhatsAppUrl(
  workshop: Workshop,
  intent: WorkshopWhatsAppIntent = "info"
) {
  const { source, campaign } = readAttribution();
  const action =
    intent === "reserve"
      ? "Quiero separar mi vacante y confirmar el proceso de inscripción."
      : intent === "next"
        ? "Quiero información sobre una próxima edición de este taller."
        : "Quiero información y confirmar disponibilidad.";

  const message = [
    "Hola, vengo de la página web de Cooking Gourmet.",
    `Taller: ${workshop.shortTitle}`,
    `Código: ${workshop.leadCode}`,
    `Fecha: ${workshop.dateLabel}`,
    `Inversión publicada: ${workshop.price}`,
    action,
    `Origen: ${source}`,
    `Campaña: ${campaign}`,
  ].join("\n");

  return `https://wa.me/51981377382?text=${encodeURIComponent(message)}`;
}
