export type ProgramKey =
  | "gastronomia"
  | "pasteleria"
  | "bar_profesional"
  | "barismo"
  | "sommelier"
  | "cocina_corta";

export type ProgramPricing = {
  inscription: number | null;
  enrollment: number | null;
  monthly: number | null;
  uniform: number | null;
  note?: string;
};

export type ProgramInfo = {
  key: ProgramKey;
  label: string;
  emoji: string;
  shortDescription: string;
  practicalBenefit: string;
  imageUrl: string;
  imageAlt: string;
  brochureUrl: string;
  pageUrl: string;
  aliases: string[];
  pricing: ProgramPricing;
};

export const SALES_EMAIL = "ventas@cookingourmet.edu.pe";
export const SALES_WHATSAPP = "51981377382";

export const LEAD_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "c70db5c3-9654-4b15-b598-091a9ffa909a";

/* =====================================================
   CONTENIDO, IMÁGENES, PDF Y COSTOS DE COOKITO

   Aquí puedes cambiar fácilmente:
   - imageUrl: imagen que Cookito mostrará en el chat.
   - brochureUrl: PDF que Cookito ofrecerá.
   - pageUrl: página interna del programa.
   - pricing: costos del programa.
===================================================== */
export const PROGRAMS: Record<ProgramKey, ProgramInfo> = {
  gastronomia: {
    key: "gastronomia",
    label: "Gastronomía Profesional",
    emoji: "🍳",
    shortDescription:
      "te forma en cocina nacional e internacional, técnicas culinarias y producción gastronómica.",
    practicalBenefit:
      "Aprenderás con un enfoque práctico para desarrollar seguridad, técnica y criterio profesional desde las primeras clases.",
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
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 250,
      uniform: 180,
    },
  },

  pasteleria: {
    key: "pasteleria",
    label: "Pastelería Profesional",
    emoji: "🎂",
    shortDescription:
      "te enseña postres, tortas, masas, decoración y producción de repostería profesional.",
    practicalBenefit:
      "Podrás desarrollar productos con buena presentación, técnica y potencial para trabajar o emprender.",
    imageUrl: "/images/portada/pasteleria.jpg",
    imageAlt: "Estudiante elaborando una preparación de pastelería",
    brochureUrl: "/brochures/pasteleria.pdf",
    pageUrl: "/programas/pasteleria",
    aliases: [
      "pasteleria",
      "pastelería",
      "pasteleria profesional",
      "reposteria",
      "repostería",
      "postres",
      "tortas",
    ],
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 200,
      uniform: 180,
    },
  },

  bar_profesional: {
    key: "bar_profesional",
    label: "Bar Profesional",
    emoji: "🍹",
    shortDescription:
      "te prepara en coctelería, mixología, servicio de barra y atención profesional.",
    practicalBenefit:
      "Desarrollarás técnica, rapidez, presentación y seguridad para desenvolverte detrás de una barra.",
    imageUrl: "/images/portada/bar-profesional.jpg",
    imageAlt: "Estudiante preparando una bebida en una barra profesional",
    brochureUrl: "/brochures/bar-profesional.pdf",
    pageUrl: "/programas/bar-profesional",
    aliases: [
      "bar profesional",
      "bar",
      "bartender",
      "barman",
      "cocteleria",
      "coctelería",
      "mixologia",
      "mixología",
    ],
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 200,
      uniform: 95,
    },
  },

  barismo: {
    key: "barismo",
    label: "Barismo Profesional",
    emoji: "☕",
    shortDescription:
      "te introduce al café de especialidad, métodos de extracción, calibración y latte art.",
    practicalBenefit:
      "Aprenderás a preparar bebidas consistentes y a brindar una experiencia profesional de servicio.",
    imageUrl: "/images/portada/barismo.jpg",
    imageAlt: "Barista preparando café de especialidad",
    brochureUrl: "/brochures/barismo.pdf",
    pageUrl: "/programas/barismo",
    aliases: [
      "barismo",
      "barista",
      "barysta",
      "cafe",
      "café",
      "cafe profesional",
      "latte art",
    ],
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 500,
      uniform: 180,
    },
  },

  sommelier: {
    key: "sommelier",
    label: "Sommelier",
    emoji: "🍷",
    shortDescription:
      "te forma en vinos, cata, maridaje, conservación y servicio especializado.",
    practicalBenefit:
      "Desarrollarás criterio sensorial y conocimientos para recomendar, servir y acompañar distintas experiencias gastronómicas.",
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
    pricing: {
      inscription: 180,
      enrollment: 120,
      monthly: 450,
      uniform: 180,
    },
  },

  cocina_corta: {
    key: "cocina_corta",
    label: "Cursos y Talleres Cortos",
    emoji: "🧁",
    shortDescription:
      "te permite aprender una habilidad concreta mediante sesiones prácticas y dinámicas.",
    practicalBenefit:
      "Es una buena opción para capacitarte rápidamente, reforzar una técnica o probar una nueva especialidad.",
    imageUrl: "/images/portada/talleres/cocina-peruana.jpg",
    imageAlt: "Preparación realizada en un taller práctico",
    brochureUrl: "/brochures/cursos-cortos.pdf",
    pageUrl: "/#talleres",
    aliases: [
      "curso corto",
      "cursos cortos",
      "taller",
      "talleres",
      "curso rapido",
      "curso rápido",
      "cocina corta",
    ],
    pricing: {
      inscription: null,
      enrollment: null,
      monthly: null,
      uniform: null,
      note:
        "El precio cambia según el taller, la fecha, la duración y los materiales incluidos.",
    },
  },
};

export const PROGRAM_KEYS = Object.keys(PROGRAMS) as ProgramKey[];
