import type {
  AssistantState,
  ProgramInfo,
  ProgramKey,
} from "./heroAssistantTypes";

export const SALES_EMAIL = "ventas@cookingourmet.edu.pe";
export const SALES_WHATSAPP = "51981377382";
export const SALES_PHONE_DISPLAY = "981 377 382";
export const SALES_PHONE_LINK = "+51981377382";

export const LEAD_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY =
  "c70db5c3-9654-4b15-b598-091a9ffa909a";

export const CHAT_STORAGE_KEY = "cookito_chat_state_v7_2";

export const SOUND_PATHS = {
  send: "/sounds/cookito/send.wav",
  receive: "/sounds/cookito/receive.wav",
  typing: "/sounds/cookito/typing.wav",
} as const;

export const BUBBLE_MESSAGES = [
  "¿Conversamos? 😊",
  "Consulta costos",
  "Revisa horarios",
  "Te ayudo a elegir",
];

export const PROGRAMS: Record<ProgramKey, ProgramInfo> = {
  gastronomia: {
    key: "gastronomia",
    label: "Gastronomía Profesional",
    emoji: "👨‍🍳",
    tagline: "Conviértete en el chef que siempre soñaste ser.",
    shortDescription:
      "formación práctica en gastronomía nacional e internacional junto a chefs expertos.",
    practicalBenefit:
      "En 18 meses desarrollarás técnica, creatividad y seguridad para abrirte camino profesionalmente.",
    imageUrl: "/images/portada/gastronomia.jpg",
    imageAlt: "Estudiante de Gastronomía preparando un plato",
    brochureUrl: "/brochures/gastronomia.pdf",
    pageUrl: "/programas/gastronomia",
    aliases: [
      "gastronomia",
      "gastronomía",
      "gastrnomia",
      "gastronomia profesional",
      "cocina profesional",
      "carrera de cocina",
      "chef",
    ],
    startDate: "17 de Agosto",
    duration: "18 meses",
    frequency: "Lunes a viernes",
    modality: "100% presencial",
    requirements: [
      "Certificado de secundaria",
      "Recibo de agua o luz",
      "Copia de DNI",
    ],
    schedules: [
      {
        label: "Mañana 1",
        time: "7:00 a.m. a 10:00 a.m.",
        preference: "morning",
      },
      {
        label: "Mañana 2",
        time: "10:30 a.m. a 1:30 p.m.",
        preference: "morning",
      },
      {
        label: "Noche",
        time: "5:30 p.m. a 8:30 p.m.",
        preference: "night",
      },
    ],
    included: [],
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 250,
      uniform: 180,
    },
  },
  pasteleria: {
    key: "pasteleria",
    label: "Panadería y Pastelería",
    emoji: "🎂",
    tagline: "Convierte tu creatividad en una profesión.",
    shortDescription:
      "postres, tortas, masas y técnicas modernas y tradicionales de panadería y pastelería.",
    practicalBenefit:
      "Aprenderás a crear productos con presentación profesional y potencial para trabajar o emprender.",
    imageUrl: "/images/portada/pasteleria.jpg",
    imageAlt: "Estudiante elaborando una preparación de pastelería",
    brochureUrl: "/brochures/pasteleria.pdf",
    pageUrl: "/programas/pasteleria",
    aliases: [
      "pasteleria",
      "pastelería",
      "panaderia",
      "panadería",
      "panaderia y pasteleria",
      "reposteria",
      "repostería",
      "postres",
      "tortas",
    ],
    startDate: "17 de Agosto",
    duration: "1 año",
    frequency: "Lunes a viernes",
    modality: "100% presencial",
    requirements: ["Recibo de agua o luz", "Copia de DNI"],
    schedules: [
      {
        label: "Mañana",
        time: "10:30 a.m. a 1:30 p.m.",
        preference: "morning",
      },
      {
        label: "Noche",
        time: "5:30 p.m. a 8:30 p.m.",
        preference: "night",
      },
    ],
    included: [],
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 220,
      uniform: 180,
    },
  },
  bar_profesional: {
    key: "bar_profesional",
    label: "Bar Profesional",
    emoji: "🥃",
    tagline: "Lleva tu talento en mixología al siguiente nivel.",
    shortDescription:
      "mixología clásica y moderna, coctelería, técnicas de barra y servicio profesional.",
    practicalBenefit:
      "En seis meses desarrollarás técnica, creatividad y rapidez para desenvolverte detrás de una barra.",
    imageUrl: "/images/portada/bar-profesional.jpg",
    imageAlt: "Estudiante preparando una bebida en una barra profesional",
    brochureUrl: "/brochures/bar-profesional.pdf",
    pageUrl: "/programas/bar-profesional",
    aliases: [
      "bar profesional",
      "bartender",
      "barman",
      "cocteleria",
      "coctelería",
      "mixologia",
      "mixología",
      "bar",
    ],
    startDate: "17 de agosto",
    duration: "6 meses",
    frequency: "2 veces por semana",
    modality: "100% presencial",
    requirements: [
      "Recibo de agua o luz",
      "Copia de DNI",
      "Foto tamaño carnet",
    ],
    schedules: [
      {
        label: "Mañana",
        time: "10:30 a.m. a 1:30 p.m.",
        preference: "morning",
      },
      {
        label: "Tarde",
        time: "2:00 p.m. a 5:00 p.m.",
        preference: "afternoon",
      },
    ],
    included: [],
    pricing: {
      inscription: 120,
      enrollment: 100,
      monthly: 200,
      uniform: 95,
    },
  },
  barismo: {
    key: "barismo",
    label: "Barismo Profesional",
    emoji: "☕",
    tagline: "Haz del café tu sello personal y profesional.",
    shortDescription:
      "café de especialidad, métodos de preparación, calibración y arte latte.",
    practicalBenefit:
      "En tres meses dominarás técnicas para trabajar en cafeterías o potenciar tu propio negocio.",
    imageUrl: "/images/portada/barismo.jpg",
    imageAlt: "Barista preparando café de especialidad",
    brochureUrl: "/brochures/barismo.pdf",
    pageUrl: "/programas/barismo",
    aliases: [
      "barismo",
      "barista",
      "barysta",
      "cafe profesional",
      "café profesional",
      "latte art",
      "arte latte",
      "cafe",
      "café",
    ],
    startDate: "17 de agosto",
    duration: "3 meses",
    frequency: "2 veces por semana",
    modality: "100% presencial",
    requirements: ["Copia de DNI", "Foto tamaño carnet"],
    schedules: [
      {
        label: "Mañana",
        time: "10:30 a.m. a 12:30 p.m.",
        preference: "morning",
      },
      {
        label: "Tarde",
        time: "2:00 p.m. a 4:00 p.m.",
        preference: "afternoon",
      },
    ],
    included: ["Insumos 100% incluidos"],
    pricing: {
      inscription: 120,
      enrollment: 200,
      monthly: 400,
      uniform: 95,
    },
  },
  sommelier: {
    key: "sommelier",
    label: "Sommelier Profesional",
    emoji: "🍇",
    tagline: "Convierte tu pasión por el vino en profesión.",
    shortDescription:
      "cata, maridaje, servicio y conocimiento especializado del mundo del vino.",
    practicalBenefit:
      "Aprenderás a interpretar cada copa y crear experiencias de servicio con criterio profesional.",
    imageUrl: "/images/portada/sommelier.jpg",
    imageAlt: "Profesional realizando una evaluación sensorial de vino",
    brochureUrl: "/brochures/sommelier.pdf",
    pageUrl: "/programas/sommelier",
    aliases: [
      "sommelier",
      "sommeliere",
      "somelier",
      "vino",
      "vinos",
      "cata",
      "maridaje",
    ],
    startDate: "17 de agosto",
    duration: "6 meses",
    frequency: "3 veces por semana",
    modality: "100% presencial",
    requirements: ["Copia de DNI", "Foto tamaño carnet"],
    schedules: [
      {
        label: "Mañana",
        time: "10:30 a.m. a 1:30 p.m.",
        preference: "morning",
      },
    ],
    included: ["Insumos 100% incluidos"],
    pricing: {
      inscription: 120,
      enrollment: 100,
      monthly: 550,
      uniform: 90,
    },
  },
  cocina_corta: {
    key: "cocina_corta",
    label: "Cocina Acelerada",
    emoji: "🔥",
    tagline: "De principiante a experto en medio año.",
    shortDescription:
      "formación intensiva y práctica para aprender técnicas profesionales de cocina en menos tiempo.",
    practicalBenefit:
      "Es ideal para avanzar rápido, practicar constantemente y construir una base culinaria sólida.",
    imageUrl: "/images/portada/cocina.jpg",
    imageAlt: "Estudiante practicando técnicas profesionales de cocina",
    brochureUrl: "/brochures/cocina-acelerada.pdf",
    pageUrl: "/programas/cocina-acelerada",
    aliases: [
      "cocina acelerada",
      "curso acelerado",
      "cocina intensiva",
      "curso de cocina",
      "medio año",
      "cocina corta",
      "curso corto de cocina",
    ],
    startDate: "17 de agosto",
    duration: "6 meses",
    frequency: "2 días por semana",
    modality: "100% presencial",
    requirements: [],
    schedules: [
      {
        label: "Mañana",
        time: "10:30 a.m. a 1:30 p.m.",
        preference: "morning",
      },
      {
        label: "Tarde",
        time: "2:00 p.m. a 5:00 p.m.",
        preference: "afternoon",
      },
    ],
    included: [],
    pricing: {
      inscription: 120,
      enrollment: 100,
      monthly: 150,
      uniform: 180,
    },
  },
};

export const PROGRAM_KEYS = Object.keys(PROGRAMS) as ProgramKey[];

export const FAQ_RESPONSES = {
  location:
    "Puedes llamar o escribir al 981 377 382 para recibir la ubicación exacta y una referencia para llegar.",
  certification:
    "La certificación se confirma según el programa y la convocatoria. Un asesor puede darte el detalle exacto.",
} as const;

export function createInitialAssistantState(): AssistantState {
  return {
    version: 7,
    hasWelcomed: false,
    visitorName: "",
    deferredUserMessage: "",
    selectedProgram: "",
    previousProgram: "",
    currentIntent: "unknown",
    currentCostDetail: "all",
    schedulePreference: "",
    pendingQuestion: "",
    leadStep: "idle",
    pausedLeadStep: "idle",
    messages: [],
    replyMode: "none",
    phone: "",
    email: "",
    dni: "",
    leadStatus: "idle",
    leadError: "",
    muted: false,
  };
}
