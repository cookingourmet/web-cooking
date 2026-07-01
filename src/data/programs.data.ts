export type ProgramKey =
  | "gastronomia"
  | "pasteleria"
  | "bar-profesional"
  | "barismo"
  | "sommelier"
  | "cocina";

export type ProgramModule = {
  title: string;
  items: string[];
};

export type ProgramSchedule = {
  code: string;
  label: string;
  time: string;
};

export type ProgramInvestment = {
  inscription: string;
  enrollment: string;
  monthly: string;
  uniform: string;
  supplies?: string;
};

export type ProgramStat = {
  value: string;
  label: string;
};

export type ProgramFaq = {
  question: string;
  answer: string;
};

export type ProgramData = {
  slug: ProgramKey;
  title: string;
  subtitle: string;
  duration: string;
  modality: string;
  schedule: string;
  startDate?: string;
  frequency?: string;
  location?: string;
  path?: string;
  seoTitle?: string;
  seoDescription?: string;
  image: string;
  brochure?: string;
  brochureLabel?: string;
  price?: string;
  enrollment?: string;
  heroBadge?: string;
  description: string;
  methodology?: string;
  audience?: string;
  benefits: string[];
  modules: string[] | ProgramModule[];
  profile: string[];
  opportunities: string[];
  whatsappMessage: string;
  whatsappNumber?: string;
  contactPhone?: string;
  stats?: ProgramStat[];
  investment?: ProgramInvestment;
  requirements?: string[];
  uniform?: string[];
  schedules?: ProgramSchedule[];
  campuses?: string[];
  faqs?: ProgramFaq[];
};

export const programsData: Record<ProgramKey, ProgramData> = {
  gastronomia: {
    slug: "gastronomia",
    title: "Gastronomía Profesional",
    subtitle:
      "Transforma tu pasión por la cocina en una carrera de alto nivel, con enfoque práctico, proyección laboral y formación culinaria de excelencia.",
    duration: "18 meses",
    modality: "100% presencial",
    schedule: "mañana, media mañana y noche",
    startDate: "16 de marzo",
    frequency: "Lunes a viernes",
    location: "Huancayo, Junín",
    path: "/programas/gastronomia",
    seoTitle: "Gastronomía Profesional en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Gastronomía Profesional en Huancayo. Formación presencial de 18 meses, clases prácticas, chefs expertos y horarios de mañana y noche.",
    image: "/images/portada/gastronomia.jpg",
    brochure: "/pdf/programas/gastronomia.pdf",
    brochureLabel: "Explorar brochure",
    price: "Inscripción S/180 · Matrícula S/120 · Mensualidad S/250",
    enrollment: "Matrícula abierta",
    heroBadge: "80% práctica · 20% teoría",
    description:
      "El programa de Gastronomía está diseñado para formar profesionales competitivos en cocina peruana e internacional, combinando técnica, creatividad, disciplina y visión de emprendimiento. La formación se desarrolla con sesiones presenciales, práctica intensiva y acompañamiento de chefs instructores.",
    methodology:
      "Nuestra metodología combina fundamentos clásicos, técnicas contemporáneas y práctica aplicada en escenarios reales para desarrollar criterio culinario, velocidad operativa y presentación profesional.",
    audience:
      "Dirigido a jóvenes, emprendedores, trabajadores del rubro gastronómico y público en general que buscan una formación sólida, moderna y con salida laboral real.",
    benefits: [
      "Certificación con enfoque internacional",
      "Maestros con experiencia real en cocina profesional",
      "Formación intensiva con alta carga práctica",
      "Desarrollo de habilidades para restaurantes, hoteles, catering y negocio propio",
      "Prácticas preprofesionales y profesionales",
      "Orientación al emprendimiento y gestión gastronómica",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Reconocimiento de mercadería y materias primas",
          "Buenas prácticas de manipulación de alimentos",
          "Técnicas y bases de la pastelería",
          "Técnicas de Cocina I",
          "Habilidades comunicativas",
        ],
      },
      {
        title: "Módulo 2",
        items: [
          "Técnicas de bar y coctelería",
          "Cocina Peruana I",
          "Técnicas de Cocina II",
          "Técnicas de comedor y servicio",
          "Gestión administrativa",
        ],
      },
      {
        title: "Módulo 3",
        items: [
          "Cocina Peruana II",
          "Gestión de restaurantes y emprendimiento",
          "Cocina italiana",
          "Pescados y mariscos",
          "Técnicas de Cocina III",
        ],
      },
      {
        title: "Módulo 4",
        items: [
          "Gestión del talento humano",
          "Cocina regional",
          "Cocina china",
          "Postres peruanos",
          "Industrialización de alimentos",
        ],
      },
      {
        title: "Módulo 5",
        items: [
          "Cocina latinoamericana",
          "Parrillas y carbones",
          "Cata de vinos y maridaje",
          "Técnicas y bases de la panadería",
          "Prácticas preprofesionales",
        ],
      },
      {
        title: "Módulo 6",
        items: [
          "Cocina asiática",
          "Cocina de vanguardia y autor",
          "Cocina saludable y hospitalaria",
          "Prácticas profesionales",
        ],
      },
    ],
    profile: [
      "Personas apasionadas por la cocina y la creación culinaria",
      "Jóvenes que buscan una carrera técnica práctica y moderna",
      "Emprendedores que desean abrir o fortalecer su negocio gastronómico",
      "Trabajadores del rubro que buscan profesionalizarse",
      "Público en general interesado en crecer profesionalmente en el arte culinario",
    ],
    opportunities: [
      "Restaurantes",
      "Hoteles",
      "Catering",
      "Negocio propio",
      "Cruceros",
      "Cocinas industriales",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información completa del programa de Gastronomía Profesional: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    contactPhone: "(064) 659923",
    stats: [
      { value: "+11,200", label: "egresados exitosos" },
      { value: "25+", label: "convenios globales" },
      { value: "100%", label: "prácticas reales" },
      { value: "150+", label: "instructores expertos" },
    ],
    investment: {
      inscription: "S/ 180.00",
      enrollment: "S/ 120.00",
      monthly: "S/ 250.00",
      uniform: "S/ 180.00",
    },
    requirements: [
      "Certificado de secundaria",
      "Copia de DNI",
      "Recibo de agua o luz",
    ],
    uniform: [
      "01 chaqueta",
      "01 pantalón",
      "01 mandilón",
      "01 gorro de chef",
      "01 crocs",
    ],
    schedules: [
      { code: "M", label: "Turno mañana", time: "7:00 a.m. - 10:00 a.m." },
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 1:30 p.m." },
      { code: "N", label: "Turno noche", time: "5:30 p.m. - 8:30 p.m." },
    ],
    campuses: [
      "Sede central: Av. Ferrocarril 587 - Huancayo",
      "Sucursal: Los Andes N° 376, Psje. Manchego Muñoz - El Tambo",
    ],
    faqs: [
      {
        question: "¿Cuánto dura Gastronomía Profesional?",
        answer:
          "El programa tiene una duración de 18 meses y se desarrolla de lunes a viernes.",
      },
      {
        question: "¿Cuánto cuesta estudiar Gastronomía?",
        answer:
          "La inscripción cuesta S/ 180, la matrícula S/ 120, la mensualidad S/ 250 y el uniforme S/ 180.",
      },
      {
        question: "¿Qué horarios tiene Gastronomía?",
        answer:
          "Los horarios disponibles son de 7:00 a.m. a 10:00 a.m., de 10:30 a.m. a 1:30 p.m. y de 5:30 p.m. a 8:30 p.m.",
      },
      {
        question: "¿Las clases son presenciales?",
        answer:
          "Sí. El programa se desarrolla de forma 100% presencial en Cooking Gourmet, Huancayo.",
      },
    ],
  },

  pasteleria: {
    slug: "pasteleria",
    title: "Pastelería",
    subtitle:
      "Emprende tu camino con una formación práctica y creativa en pastelería, panadería y decoración profesional.",
    duration: "1 año",
    modality: "100% presencial",
    schedule: "media mañana y noche",
    startDate: "16 de marzo",
    frequency: "Lunes a viernes",
    location: "Huancayo, Junín",
    path: "/programas/pasteleria",
    seoTitle: "Pastelería Profesional en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Panadería y Pastelería Profesional en Huancayo. Formación presencial de un año, clases prácticas y horarios de media mañana y noche.",
    image: "/images/portada/pasteleria.jpg",
    brochure: "/pdf/programas/pasteleria.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/180 · Matrícula S/120 · Mensualidad S/220",
    enrollment: "Inscripciones abiertas",
    heroBadge: "80% práctica · 20% teoría",
    description:
      "El programa de Pastelería está diseñado para formar profesionales con dominio técnico, creatividad y precisión en repostería, panadería, chocolatería, decoración y producción comercial, con una visión clara de emprendimiento.",
    methodology:
      "Aprendizaje 80% práctico orientado a la elaboración, decoración, presentación y producción profesional.",
    audience:
      "Dirigido a estudiantes, emprendedores del rubro pastelero, conocedores, panaderos, cocineros pasteleros y público en general que desean perfeccionar su técnica y ampliar su crecimiento profesional.",
    benefits: [
      "Clases 100% presenciales",
      "Instructores chefs de alto prestigio",
      "Prácticas profesionales con empresas reconocidas",
      "Aprendizaje práctico con enfoque emprendedor",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Técnicas de Pastelería",
          "Buenas Prácticas de Manipulación",
          "Pastelería Básica",
          "Smoothies",
        ],
      },
      {
        title: "Módulo 2",
        items: [
          "Pastelería Avanzada",
          "Panadería Comercial",
          "Técnicas y Decoración en Chantilly",
          "Gestión y Emprendimiento Innovador",
        ],
      },
      {
        title: "Módulo 3",
        items: [
          "Panadería Avanzada y Masas Laminadas",
          "Pastelería Saludable",
          "Petit fours y Chocolatería",
          "Prácticas Profesionales",
        ],
      },
      {
        title: "Módulo 4",
        items: [
          "Diseño y Estructura de Postres Gourmet",
          "Panadería Artesanal",
          "Técnicas y Decoración en Masa Elástica",
          "Prácticas Profesionales",
        ],
      },
    ],
    profile: [
      "Personas creativas interesadas en repostería profesional",
      "Emprendedores del rubro pastelero y panadero",
      "Público en general que desea perfeccionarse y crear su propio negocio",
    ],
    opportunities: [
      "Pastelerías",
      "Panaderías",
      "Cafeterías",
      "Empresas gastronómicas",
      "Emprendimiento propio",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información del programa de Pastelería: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    stats: [
      { value: "+11,200", label: "estudiantes egresados" },
      { value: "+600", label: "estudiantes en el extranjero" },
      { value: "+2,000", label: "estudiantes como jefe de cocina" },
    ],
    investment: {
      inscription: "S/ 180.00",
      enrollment: "S/ 120.00",
      monthly: "S/ 220.00",
      uniform: "S/ 180.00",
    },
    requirements: ["Fotocopia de DNI", "Recibo de agua o luz"],
    uniform: [
      "01 chaqueta",
      "01 pantalón",
      "01 mandilón",
      "01 gorro de chef",
      "01 crocs",
    ],
    schedules: [
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 1:30 p.m." },
      { code: "N", label: "Turno noche", time: "5:30 p.m. - 8:30 p.m." },
    ],
  },

  "bar-profesional": {
    slug: "bar-profesional",
    title: "Bar Profesional",
    subtitle:
      "Aprende coctelería, técnicas de barra y servicio profesional con una formación intensiva y práctica.",
    duration: "6 meses",
    modality: "100% presencial",
    schedule: "media mañana y tarde",
    startDate: "17 de agosto",
    frequency: "2 veces por semana",
    location: "Huancayo, Junín",
    path: "/programas/bar-profesional",
    seoTitle: "Bar Profesional en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Bar Profesional en Huancayo. Formación presencial de 6 meses en coctelería, mixología, destilados y servicio profesional de barra.",
    image: "/images/portada/bar-profesional.jpg",
    brochure: "/pdf/programas/bar-profesional.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/120 · Matrícula S/100 · Mensualidad S/200",
    enrollment: "Vacantes disponibles",
    heroBadge: "80% práctica · 20% teoría",
    description:
      "El programa de Bar Profesional forma bartenders creativos, dinámicos y competitivos, con dominio en coctelería básica, avanzada, mixología y gestión rentable de barra.",
    methodology:
      "Aprendizaje práctico orientado a la preparación de cócteles, atención al cliente, servicio y operación profesional de barra.",
    audience:
      "Dirigido a estudiantes, bartenders, emprendedores del rubro y público interesado en desarrollarse en el mundo del bar y la coctelería.",
    benefits: [
      "Clases 100% presenciales",
      "Instructores de alto nivel",
      "Prácticas profesionales",
      "Formación intensiva orientada al mercado",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Bebidas espirituosas",
          "Origen y cata de destilados",
          "Coctelería básica",
          "Técnicas, origen, bartender",
        ],
      },
      {
        title: "Módulo 2",
        items: [
          "Coctelería avanzada",
          "Bitters, marcas, tipos",
          "Enología y cata de vinos",
          "Clasificación, aromas, filoxera",
        ],
      },
      {
        title: "Módulo 3",
        items: [
          "Coctelería tiki y mixología",
          "Syrup, hielo, bitter, perfumes",
          "Gestión de bar y costo",
          "Productos, merma, rentabilidad",
        ],
      },
    ],
    profile: [
      "Estudiantes y jóvenes interesados en la coctelería",
      "Trabajadores del rubro hotelero y gastronómico",
      "Emprendedores que desean especializarse en barras y bebidas",
    ],
    opportunities: [
      "Bares",
      "Restaurantes",
      "Hoteles",
      "Eventos",
      "Emprendimiento propio",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información del programa de Bar Profesional: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    stats: [
      { value: "+11,200", label: "estudiantes egresados" },
      { value: "+600", label: "estudiantes en el extranjero" },
      { value: "+2,000", label: "estudiantes como jefe de cocina" },
    ],
    investment: {
      inscription: "S/ 120.00",
      enrollment: "S/ 100.00",
      monthly: "S/ 200.00",
      uniform: "S/ 95.00",
    },
    requirements: [
      "Copia de DNI",
      "Recibo de agua o luz",
      "Foto tamaño carnet",
    ],
    uniform: ["01 polo camisa", "01 delantal"],
    schedules: [
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 1:30 p.m." },
      { code: "T", label: "Turno tarde", time: "2:00 p.m. - 5:00 p.m." },
    ],
  },

  barismo: {
    slug: "barismo",
    title: "Barismo",
    subtitle:
      "Especialízate en café, extracción, cata, latte art y operación de cafetería con enfoque técnico y práctico.",
    duration: "3 meses",
    modality: "100% presencial",
    schedule: "media mañana y tarde",
    startDate: "17 de agosto",
    frequency: "2 veces por semana",
    location: "Huancayo, Junín",
    path: "/programas/barismo",
    seoTitle: "Barismo Profesional en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Barismo Profesional en Huancayo. Formación presencial de 3 meses en café, extracción, cata, latte art y operación de cafetería.",
    image: "/images/portada/barismo.jpg",
    brochure: "/pdf/programas/barismo.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/120 · Matrícula S/200 · Mensualidad S/400",
    enrollment: "Matrícula abierta",
    heroBadge: "Especialización en café",
    description:
      "El programa de Barismo está orientado a formar especialistas en café con dominio técnico en extracción, preparación, análisis sensorial, texturización de leche, latte art y operación profesional de cafetería.",
    methodology:
      "Aprendizaje práctico con equipos reales, técnicas de extracción, preparación de bebidas y dominio integral del café.",
    audience:
      "Dirigido a amantes del café, futuros baristas, emprendedores de cafetería y personas que desean especializarse profesionalmente en el mundo del café.",
    benefits: [
      "Uso de máquinas y herramientas reales",
      "Formación en espresso, cata y latte art",
      "Métodos alternativos de preparación",
      "Enfoque técnico y práctico",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Introducción al café",
          "Procesos de cultivo",
          "Tostado",
          "Preparación del café",
          "Métodos alternativos de preparación",
          "Mantenimiento y limpieza del equipo",
          "Frappes y bebidas frías",
          "Orígenes del café peruano",
          "El espresso",
          "Leche y espuma",
          "Cata de café",
          "Latte art",
          "Sourcing coffee: modelos de negocio",
          "Tueste avanzado",
          "Competencia exclusiva de barismo",
        ],
      },
    ],
    profile: [
      "Amantes del café",
      "Futuros baristas",
      "Emprendedores de cafetería",
    ],
    opportunities: [
      "Cafeterías",
      "Coffee shops",
      "Restaurantes",
      "Emprendimiento propio",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información del programa de Barismo: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    investment: {
      inscription: "S/ 120.00",
      enrollment: "S/ 200.00",
      monthly: "S/ 400.00",
      uniform: "S/ 95.00",
      supplies: "100% incluidos",
    },
    requirements: ["Copia de DNI", "Foto tamaño carnet"],
    uniform: ["01 camisa", "01 delantal"],
    schedules: [
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 12:30 p.m." },
      { code: "T", label: "Turno tarde", time: "2:00 p.m. - 4:00 p.m." },
    ],
  },

  sommelier: {
    slug: "sommelier",
    title: "Sommelier",
    subtitle:
      "Descubre el arte del vino, la cata, el maridaje y el servicio especializado con enfoque técnico y sensorial.",
    duration: "6 meses",
    modality: "100% presencial",
    schedule: "media mañana",
    startDate: "17 de agosto",
    frequency: "3 veces por semana",
    location: "Huancayo, Junín",
    path: "/programas/sommelier",
    seoTitle: "Sommelier Profesional en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Sommelier Profesional en Huancayo. Formación presencial de 6 meses en cata, maridaje, servicio del vino y cultura vitivinícola.",
    image: "/images/portada/sommelier.jpg",
    brochure: "/pdf/programas/sommelier.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/120 · Matrícula S/100 · Mensualidad S/550",
    enrollment: "Inscripciones abiertas",
    heroBadge: "80% práctica · 20% teoría",
    description:
      "El programa de Sommelier está diseñado para desarrollar sensibilidad sensorial, criterio técnico y dominio del vino, integrando cata, servicio, maridaje y cultura vitivinícola.",
    methodology:
      "Aprendizaje técnico y sensorial con enfoque práctico en degustación, análisis, servicio del vino y armonización gastronómica.",
    audience:
      "Dirigido a estudiantes, emprendedores del sector vitivinícola, amantes del vino, personal de restaurantes y hoteles, y público interesado en especializarse.",
    benefits: [
      "Clases 100% presenciales",
      "Instructor sommelier certificado",
      "Prácticas profesionales",
      "Formación especializada en vino y maridaje",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Viticultura",
          "Cata de vinos patrimoniales",
          "Análisis sensorial y cata de vinos",
          "Minicultura",
          "Vinos del viejo mundo",
        ],
      },
      {
        title: "Módulo 2",
        items: [
          "Servicio del vino",
          "Pisco",
          "Técnicas de maridaje",
          "Administración de cava",
          "Técnicas de cata deductiva",
          "Vinos del nuevo mundo",
        ],
      },
    ],
    profile: [
      "Amantes del vino que desean profesionalizarse",
      "Personal de restaurantes, hoteles y barras",
      "Emprendedores e interesados en servicio, cata y maridaje",
    ],
    opportunities: [
      "Restaurantes",
      "Hoteles",
      "Cavas",
      "Distribución especializada",
      "Asesoría en vinos",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información del programa de Sommelier: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    stats: [
      { value: "+11,200", label: "estudiantes egresados" },
      { value: "+600", label: "estudiantes en el extranjero" },
      { value: "+2,000", label: "estudiantes como jefe de cocina" },
    ],
    investment: {
      inscription: "S/ 120.00",
      enrollment: "S/ 100.00",
      monthly: "S/ 550.00",
      uniform: "S/ 90.00",
      supplies: "100% incluidos",
    },
    requirements: ["Copia de DNI", "Foto tamaño carnet"],
    uniform: ["01 camisa blanca", "01 uniforme institucional"],
    schedules: [
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 1:30 p.m." },
    ],
  },

  cocina: {
    slug: "cocina",
    title: "Cocina Acelerada",
    subtitle:
      "De principiante a experto con una formación práctica, intensiva y orientada al trabajo real.",
    duration: "6 meses",
    modality: "100% presencial",
    schedule: "media mañana y tarde",
    startDate: "17 de agosto",
    frequency: "2 días por semana",
    location: "Huancayo, Junín",
    path: "/programas/cocina-acelerada",
    seoTitle: "Cocina Acelerada en Huancayo | Cooking Gourmet",
    seoDescription:
      "Estudia Cocina Acelerada en Huancayo. Aprende técnicas culinarias profesionales en 6 meses mediante formación práctica e intensiva.",
    image: "/images/portada/cocina.jpg",
    brochure: "/pdf/programas/cocina.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/120 · Matrícula S/100 · Mensualidad S/150",
    enrollment: "Vacantes abiertas",
    heroBadge: "Formación acelerada · práctica intensiva",
    description:
      "El programa de Cocina Acelerada está diseñado para que aprendas técnicas profesionales en poco tiempo, con práctica constante, bases culinarias sólidas y preparación para desenvolverte en cocinas reales.",
    methodology:
      "Aprendizaje práctico con bases sólidas de cocina, técnicas de producción y preparación para trabajo real.",
    audience:
      "Dirigido a personas que desean iniciarse en cocina, estudiantes técnicos y emprendedores gastronómicos.",
    benefits: [
      "Aprendizaje práctico",
      "Bases sólidas de cocina",
      "Preparación para trabajo real",
      "Docentes especializados",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: ["Introducción a cocina"],
      },
      {
        title: "Módulo 2",
        items: ["Cortes y técnicas"],
      },
      {
        title: "Módulo 3",
        items: ["Fondos y salsas"],
      },
      {
        title: "Módulo 4",
        items: ["Cocina caliente"],
      },
      {
        title: "Módulo 5",
        items: ["Cocina fría"],
      },
      {
        title: "Módulo 6",
        items: ["Higiene y manipulación"],
      },
    ],
    profile: [
      "Personas que desean empezar en cocina",
      "Estudiantes técnicos",
      "Emprendedores gastronómicos",
    ],
    opportunities: [
      "Restaurantes",
      "Cocinas de producción",
      "Hoteles",
      "Negocio propio",
    ],
    whatsappMessage:
      "Hola, vengo de la web de Cooking Gourmet. Quiero información del programa de Cocina Acelerada: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    investment: {
      inscription: "S/ 120.00",
      enrollment: "S/ 100.00",
      monthly: "S/ 150.00",
      uniform: "S/ 180.00",
    },
    schedules: [
      { code: "MM", label: "Media mañana", time: "10:30 a.m. - 1:30 p.m." },
      { code: "T", label: "Turno tarde", time: "2:00 p.m. - 5:00 p.m." },
    ],
  },
};