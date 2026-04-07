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
};

export type ProgramStat = {
  value: string;
  label: string;
};

export type ProgramData = {
  slug: ProgramKey;
  title: string;
  subtitle: string;
  duration: string;
  modality: string;
  schedule: string;
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
};

export const programsData: Record<ProgramKey, ProgramData> = {
  gastronomia: {
    slug: "gastronomia",
    title: "Gastronomía Profesional",
    subtitle:
      "Convierte tu pasión por la cocina en una carrera de alto nivel con formación presencial, enfoque intensivo y proyección laboral real en el sector gastronómico.",
    duration: "6 módulos académicos",
    modality: "100% presencial",
    schedule: "Mañana, media mañana, tarde y noche",
    image: "/images/portada/gastronomia.jpg",
    brochure: "/pdf/programas/gastronomia.pdf",
    brochureLabel: "Ver brochure",
    price: "Inscripción S/180 · Matrícula S/120 · Mensualidad S/250",
    enrollment: "Matrícula abierta",
    heroBadge: "80% práctica · 20% teoría",
    description:
      "El programa de Gastronomía está diseñado para formar profesionales competitivos en cocina peruana e internacional, combinando técnica, creatividad, disciplina y visión de emprendimiento. La formación se desarrolla con metodología intensiva, sesiones presenciales y una experiencia práctica orientada al trabajo real en cocina profesional. El estudiante fortalece sus capacidades en producción, manipulación de alimentos, servicio, gestión gastronómica, cocina de autor y especialidades culinarias con acompañamiento de chefs instructores y preparación para integrarse al mercado laboral o emprender su propio negocio.",
    methodology:
      "La formación se desarrolla con un enfoque 80% práctico y 20% teórico, clases 100% presenciales, acompañamiento de chefs instructores y preparación orientada a experiencias reales de cocina, servicio y gestión gastronómica.",
    audience:
      "Dirigido a jóvenes, emprendedores, trabajadores del rubro gastronómico y público en general que buscan una formación sólida, moderna y con salida laboral real en cocina profesional.",
    benefits: [
      "Formación 100% presencial con acompañamiento directo del chef instructor",
      "Metodología 80% práctica y 20% teórica",
      "Aprendizaje en cocina peruana, internacional, regional y de autor",
      "Desarrollo de habilidades para restaurantes, hoteles, catering y negocio propio",
      "Preparación en técnicas de cocina, bar, servicio y gestión gastronómica",
      "Prácticas preprofesionales y profesionales",
      "Docentes con experiencia real en el sector gastronómico",
      "Orientación al emprendimiento y gestión de restaurantes",
      "Más de 11,200 estudiantes egresados como respaldo institucional",
      "Convenios y presencia en más de 500 empresas de prestigio en Huancayo",
    ],
    modules: [
      {
        title: "Módulo 1",
        items: [
          "Reconocimiento de mercadería y materias primas",
          "Buenas prácticas de manipulación de alimentos",
          "Técnicas y bases de la pastelería",
          "Técnicas de cocina I",
          "Habilidades comunicativas",
        ],
      },
      {
        title: "Módulo 2",
        items: [
          "Técnicas de bar y coctelería",
          "Cocina peruana I",
          "Técnicas de cocina II",
          "Técnicas de comedor y servicio",
          "Gestión administrativa",
        ],
      },
      {
        title: "Módulo 3",
        items: [
          "Cocina peruana II",
          "Gestión de restaurantes y emprendimiento",
          "Cocina italiana",
          "Pescados y mariscos",
          "Técnicas de cocina III",
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
          "Cocina de vanguardia y de autor",
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
      "Estudiantes que desean proyectarse como chef, jefe de cocina o especialista culinario",
      "Público en general interesado en crecer profesionalmente en el arte culinario",
    ],
    opportunities: [
      "Restaurantes",
      "Hoteles",
      "Catering",
      "Cruceros y cadenas gastronómicas",
      "Cocinas industriales",
      "Emprendimiento propio",
      "Jefe de cocina",
      "Asistente de cocina profesional",
      "Producción gastronómica",
      "Servicios de alimentación",
    ],
    whatsappMessage:
      "Hola, quiero información completa del programa de Gastronomía Profesional: horarios, matrícula, mensualidad e inicio de clases.",
    whatsappNumber: "51981377382",
    contactPhone: "(064) 659923",
    stats: [
      { value: "+11,200", label: "Estudiantes egresados" },
      { value: "+600", label: "Estudiantes en el extranjero" },
      { value: "+2,000", label: "Estudiantes como jefe de cocina" },
      { value: "+500", label: "Empresas de prestigio en Huancayo" },
    ],
    investment: {
      inscription: "S/ 180.00",
      enrollment: "S/ 120.00",
      monthly: "S/ 250.00",
      uniform: "S/ 180.00",
    },
    requirements: [
      "Certificado de 1ro a 5to de secundaria",
      "Fotocopia de DNI",
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
      { code: "T", label: "Turno tarde", time: "2:00 p.m. - 5:00 p.m." },
      { code: "N", label: "Turno noche", time: "5:30 p.m. - 8:30 p.m." },
    ],
    campuses: [
      "Sede central: Av. Ferrocarril 587 - Huancayo",
      "Sucursal: Los Andes N° 376, Psje. Manchego Muñoz - El Tambo",
    ],
  },

  pasteleria: {
    slug: "pasteleria",
    title: "Pastelería",
    subtitle:
      "Domina técnicas de repostería, decoración y producción de postres de alto nivel.",
    duration: "10 meses",
    modality: "Presencial",
    schedule: "Turnos flexibles",
    image: "/images/portada/pasteleria.jpg",
    brochure: "/pdf/programas/pasteleria.pdf",
    brochureLabel: "Ver brochure",
    price: "Consulta por promoción",
    enrollment: "Inscripciones abiertas",
    heroBadge: "Creatividad + técnica",
    description:
      "El programa de Pastelería está diseñado para desarrollar habilidades en elaboración de postres, masas, tortas y decoración profesional, combinando técnica, creatividad y presentación.",
    methodology:
      "Formación práctica con enfoque en elaboración, decoración, presentación y producción comercial.",
    audience:
      "Dirigido a personas creativas, emprendedores del rubro dulce y estudiantes con interés en repostería profesional.",
    benefits: [
      "Aprendizaje práctico",
      "Decoración y acabado profesional",
      "Recetas comerciales y modernas",
      "Formación ideal para emprendimiento",
    ],
    modules: [
      "Bases de repostería",
      "Masas y horneado",
      "Postres clásicos",
      "Tortas y decoración",
      "Pastelería comercial",
      "Costeo y producción",
    ],
    profile: [
      "Personas creativas",
      "Emprendedores del rubro dulce",
      "Estudiantes con interés en repostería profesional",
    ],
    opportunities: ["Pastelerías", "Panaderías", "Cafeterías", "Negocio propio"],
    whatsappMessage: "Hola, quiero información del programa de Pastelería",
    whatsappNumber: "51981377382",
  },

  "bar-profesional": {
    slug: "bar-profesional",
    title: "Bar Profesional",
    subtitle: "Aprende coctelería, técnicas de barra y servicio profesional.",
    duration: "6 meses",
    modality: "Presencial",
    schedule: "Tarde y noche",
    image: "/images/portada/bar-profesional.jpg",
    brochure: "/pdf/programas/bar-profesional.pdf",
    brochureLabel: "Ver brochure",
    price: "Consulta por promoción",
    enrollment: "Vacantes disponibles",
    heroBadge: "Técnica + servicio",
    description:
      "Formación especializada en preparación de cócteles, atención en barra, manejo de insumos y servicio, para desenvolverte en bares, restaurantes y eventos.",
    methodology:
      "Aprendizaje aplicado en coctelería, atención al cliente, mise en place y operación profesional de barra.",
    audience:
      "Dirigido a jóvenes con interés en el mundo del bar, trabajadores del rubro hotelero y emprendedores.",
    benefits: [
      "Prácticas reales de barra",
      "Coctelería clásica y moderna",
      "Técnicas de atención al cliente",
      "Preparación para trabajar o emprender",
    ],
    modules: [
      "Fundamentos de bar",
      "Coctelería clásica",
      "Coctelería moderna",
      "Mise en place y servicio",
      "Control de insumos",
      "Atención al cliente",
    ],
    profile: [
      "Jóvenes con interés en el mundo del bar",
      "Trabajadores del rubro hotelero y gastronómico",
      "Emprendedores",
    ],
    opportunities: [
      "Bares",
      "Restaurantes",
      "Eventos",
      "Discotecas",
      "Servicios independientes",
    ],
    whatsappMessage: "Hola, quiero información del programa de Bar Profesional",
    whatsappNumber: "51981377382",
  },

  barismo: {
    slug: "barismo",
    title: "Barismo",
    subtitle:
      "Especialízate en café, extracción, latte art y operación de cafetería.",
    duration: "5 meses",
    modality: "Presencial",
    schedule: "Turnos disponibles",
    image: "/images/portada/barismo.jpg",
    brochure: "/pdf/programas/barismo.pdf",
    brochureLabel: "Ver brochure",
    price: "Consulta por promoción",
    enrollment: "Matrícula abierta",
    heroBadge: "Cultura del café",
    description:
      "Aprende desde la selección del grano hasta la preparación profesional de bebidas a base de café, técnicas de extracción y presentación.",
    methodology:
      "Formación práctica con uso de equipos reales, preparación de bebidas y dominio de técnicas de extracción.",
    audience:
      "Dirigido a amantes del café, futuros baristas y emprendedores de cafetería.",
    benefits: [
      "Uso de máquinas y herramientas reales",
      "Latte art y bebidas especiales",
      "Técnicas de extracción",
      "Enfoque práctico",
    ],
    modules: [
      "Introducción al café",
      "Métodos de extracción",
      "Espresso y bebidas derivadas",
      "Latte art",
      "Atención en cafetería",
      "Mantenimiento básico de equipos",
    ],
    profile: ["Amantes del café", "Futuros baristas", "Emprendedores de cafetería"],
    opportunities: ["Cafeterías", "Coffee shops", "Restaurantes", "Negocio propio"],
    whatsappMessage: "Hola, quiero información del programa de Barismo",
    whatsappNumber: "51981377382",
  },

  sommelier: {
    slug: "sommelier",
    title: "Sommelier",
    subtitle: "Descubre el arte del vino, maridaje y servicio especializado.",
    duration: "6 meses",
    modality: "Presencial",
    schedule: "Tarde y noche",
    image: "/images/portada/sommelier.jpg",
    brochure: "/pdf/programas/sommelier.pdf",
    brochureLabel: "Ver brochure",
    price: "Consulta por promoción",
    enrollment: "Inscripciones abiertas",
    heroBadge: "Especialización gourmet",
    description:
      "Programa dirigido a quienes desean especializarse en vinos, cata, servicio y armonización gastronómica con un enfoque técnico y sensorial.",
    methodology:
      "Enfoque técnico y sensorial con formación en cata, maridaje, servicio y gestión de carta.",
    audience:
      "Dirigido a interesados en vinos y servicio, así como a trabajadores de restaurantes y hoteles.",
    benefits: [
      "Formación en vinos y cata",
      "Maridaje gastronómico",
      "Servicio profesional",
      "Ideal para hotelería y restaurantes",
    ],
    modules: [
      "Fundamentos del vino",
      "Cata y análisis sensorial",
      "Regiones vitivinícolas",
      "Servicio y protocolo",
      "Maridaje",
      "Gestión de carta",
    ],
    profile: [
      "Interesados en vinos y servicio",
      "Trabajadores de restaurantes y hoteles",
      "Especialistas gourmet",
    ],
    opportunities: ["Restaurantes", "Hoteles", "Cavas", "Distribución especializada"],
    whatsappMessage: "Hola, quiero información del programa de Sommelier",
    whatsappNumber: "51981377382",
  },

  cocina: {
    slug: "cocina",
    title: "Cocina",
    subtitle:
      "Formación práctica para dominar bases culinarias y producción gastronómica.",
    duration: "8 meses",
    modality: "Presencial",
    schedule: "Horarios flexibles",
    image: "/images/portada/cocina.jpg",
    brochure: "/pdf/programas/cocina.pdf",
    brochureLabel: "Ver brochure",
    price: "Consulta por promoción",
    enrollment: "Vacantes abiertas",
    heroBadge: "Formación intensiva",
    description:
      "El programa de Cocina brinda una formación sólida en preparación de alimentos, técnicas base, organización de cocina y producción culinaria.",
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
      "Introducción a cocina",
      "Cortes y técnicas",
      "Fondos y salsas",
      "Cocina caliente",
      "Cocina fría",
      "Higiene y manipulación",
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
    whatsappMessage: "Hola, quiero información del programa de Cocina",
    whatsappNumber: "51981377382",
  },
};