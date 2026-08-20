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

export const workshops: Workshop[] = [
  {
    id: "pasteleria-boutique",
    leadCode: "PB-AGO26",
    slug: "pasteleria-boutique",
    title: "Pastelería Boutique - 3 días",
    shortTitle: "Pastelería Boutique",
    startDate: "2026-08-26",
    endDate: "2026-08-28",
    dateLabel: "26, 27 y 28 de agosto",
    dateBadgeDay: "26-28",
    dateBadgeMonth: "Agosto",
    price: "S/ 280",
    capacity: "20 participantes",
    modality: "Presencial",
    location: "Huancayo",
    image: "/images/talleres/taller-pasteleria-boutique.webp",
    imageAlt: "Taller de Pastelería Boutique de Cooking Gourmet en Huancayo",
    topics: ["Pasta choux", "Piononos", "Cup cakes"],
    audience: [
      "Personas que quieren reforzar técnicas de pastelería",
      "Emprendedores que desean ampliar su catálogo",
      "Aficionados que prefieren aprender de forma práctica",
    ],
    includes: [
      "Sesiones presenciales y prácticas",
      "Acompañamiento durante las preparaciones",
      "Contenido enfocado en los productos publicados",
    ],
    outcomes: [
      "Practicar técnicas aplicables a preparaciones de pastelería boutique",
      "Mejorar presentación, orden de trabajo y ejecución",
      "Resolver dudas directamente durante la práctica",
    ],
    faqs: [
      {
        question: "¿Necesito experiencia previa?",
        answer:
          "No es indispensable. El taller está planteado para aprender mediante práctica guiada. Si ya tienes experiencia, también puedes aprovecharlo para reforzar técnica.",
      },
      {
        question: "¿Cómo separo mi vacante?",
        answer:
          "Escríbenos por WhatsApp. Admisión confirmará disponibilidad, horario y el proceso vigente para reservar tu lugar antes de cualquier pago.",
      },
      {
        question: "¿Dónde se realiza?",
        answer:
          "El taller es presencial en Cooking Gourmet, Huancayo. Admisión te enviará la ubicación y las indicaciones finales al confirmar tu inscripción.",
      },
    ],
    summary:
      "Tres días de práctica enfocada en preparaciones de pastelería boutique para quienes buscan aprender nuevas técnicas y ampliar su repertorio.",
    seoDescription:
      "Taller presencial de Pastelería Boutique en Cooking Gourmet Huancayo. Aprende pasta choux, piononos y cup cakes en 3 días de práctica.",
  },
  {
    id: "limonadas-triples",
    leadCode: "LT-AGO26",
    slug: "limonadas-y-triples",
    title: "Limonadas y Triples",
    shortTitle: "Limonadas y Triples",
    startDate: "2026-08-31",
    endDate: "2026-09-01",
    dateLabel: "31 de agosto y 1 de septiembre",
    dateBadgeDay: "31-01",
    dateBadgeMonth: "Ago/Set",
    price: "S/ 190",
    capacity: "20 participantes",
    modality: "Presencial",
    location: "Huancayo",
    image: "/images/talleres/taller-limonadas-triples.webp",
    imageAlt: "Taller de Limonadas y Triples de Cooking Gourmet en Huancayo",
    topics: ["Limonadas", "Triples"],
    audience: [
      "Personas interesadas en preparaciones rápidas y comerciales",
      "Emprendedores que buscan nuevas opciones para su carta",
      "Aficionados que quieren aprender de manera presencial",
    ],
    includes: [
      "Sesiones presenciales y prácticas",
      "Acompañamiento durante las preparaciones",
      "Contenido enfocado en bebidas y triples publicados",
    ],
    outcomes: [
      "Practicar preparaciones de limonadas y triples",
      "Mejorar organización y presentación del producto",
      "Resolver dudas directamente durante el taller",
    ],
    faqs: [
      {
        question: "¿Necesito experiencia previa?",
        answer:
          "No es indispensable. El taller está diseñado para acompañarte durante las preparaciones y ayudarte a seguir el proceso paso a paso.",
      },
      {
        question: "¿Cómo separo mi vacante?",
        answer:
          "Escríbenos por WhatsApp. Admisión confirmará disponibilidad, horario y el proceso vigente para reservar tu lugar.",
      },
      {
        question: "¿Dónde se realiza?",
        answer:
          "El taller es presencial en Cooking Gourmet, Huancayo. La ubicación e indicaciones finales se confirman con admisión.",
      },
    ],
    summary:
      "Taller práctico para aprender preparaciones de bebidas refrescantes y triples con acompañamiento presencial en Cooking Gourmet.",
    seoDescription:
      "Taller presencial de Limonadas y Triples en Cooking Gourmet Huancayo. Cupos limitados y aprendizaje práctico.",
  },
  {
    id: "fast-food",
    leadCode: "FF-AGO26",
    slug: "fast-food",
    title: "Fast Food",
    shortTitle: "Fast Food",
    startDate: "2026-08-20",
    endDate: "2026-08-21",
    dateLabel: "20 y 21 de agosto",
    dateBadgeDay: "20-21",
    dateBadgeMonth: "Agosto",
    price: "S/ 250",
    capacity: "20 participantes",
    modality: "Presencial",
    location: "Huancayo",
    image: "/images/talleres/taller-fast-food.webp",
    imageAlt: "Taller Fast Food de Cooking Gourmet en Huancayo",
    topics: ["Burger Party", "Alitas"],
    audience: [
      "Personas que quieren aprender fast food desde la práctica",
      "Emprendedores que desean incorporar nuevas preparaciones",
      "Aficionados que prefieren aprender junto a un instructor",
    ],
    includes: [
      "Sesiones presenciales y prácticas",
      "Acompañamiento durante las preparaciones",
      "Contenido enfocado en Burger Party y alitas",
    ],
    outcomes: [
      "Practicar preparaciones de fast food en un entorno guiado",
      "Mejorar orden de trabajo, técnica y presentación",
      "Resolver dudas directamente durante la práctica",
    ],
    faqs: [
      {
        question: "¿Necesito experiencia previa?",
        answer:
          "No es indispensable. El taller está orientado a aprender mediante práctica y acompañamiento presencial.",
      },
      {
        question: "¿Cómo separo mi vacante?",
        answer:
          "Escríbenos por WhatsApp. Admisión confirmará si aún hay vacantes y te indicará el proceso vigente para reservar tu lugar.",
      },
      {
        question: "¿Dónde se realiza?",
        answer:
          "El taller es presencial en Cooking Gourmet, Huancayo. Admisión te compartirá la ubicación e indicaciones al confirmar tu inscripción.",
      },
    ],
    summary:
      "Aprende fast food desde la práctica con preparaciones enfocadas en Burger Party y alitas, acompañado por el equipo de Cooking Gourmet.",
    seoDescription:
      "Taller presencial de Fast Food en Cooking Gourmet Huancayo. Aprende Burger Party y alitas en una experiencia práctica de cupos limitados.",
  },
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
    "Hola, vengo de la web de Cooking Gourmet.",
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
