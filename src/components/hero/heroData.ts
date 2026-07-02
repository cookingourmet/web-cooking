export type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeroStartDate = {
  label: string;
  day: string;
  month: string;
};

export type HeroSingleSlide = {
  id: string;
  layout: "single";
  shortLabel: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  mediaSide?: "left" | "right";
  objectPosition?: string;
  mobileObjectPosition?: string;
  imageScale?: number;
  startDate?: HeroStartDate;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
};

export type HeroWorkshopCard = {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  href: string;
};

export type HeroCardsSlide = {
  id: string;
  layout: "cards";
  shortLabel: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryAction?: HeroAction;
  cards: [HeroWorkshopCard, HeroWorkshopCard, HeroWorkshopCard];
};

export type HeroSlide = HeroSingleSlide | HeroCardsSlide;

const WHATSAPP_NUMBER = "51981377382";

function informationWhatsAppUrl(programName: string, description: string) {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    `Necesito información sobre ${programName}.`,
    description,
    "¿Podrían ayudarme, por favor?",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function workshopWhatsAppUrl(workshopName: string) {
  const message = [
    "Hola, vengo de la web de Cooking Gourmet.",
    `Necesito información sobre el taller de ${workshopName}.`,
    "Deseo conocer horarios, inversión e inicio de clases.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "talleres-julio-agosto",
    layout: "cards",
    shortLabel: "Talleres",
    eyebrow: "Julio y agosto · Huancayo",
    title: "Talleres gastronómicos",
    subtitle:
      "Aprende nuevas técnicas culinarias en talleres prácticos, intensivos y guiados por profesionales de Cooking Gourmet en Huancayo.",
    primaryAction: {
      label: "Consultar talleres",
      href: workshopWhatsAppUrl("temporada julio y agosto"),
      external: true,
    },
    cards: [
      {
        id: "pokes-saludables",
        day: "23",
        month: "Julio",
        title: "Pokes saludables",
        subtitle: "Fresco, nutritivo y delicioso",
        image: "/images/portada/talleres/pokes-saludables.png",
        imageAlt:
          "Taller de pokes saludables en Huancayo con salmón, mango, pepino, edamame y quinoa",
        href: workshopWhatsAppUrl("Pokes saludables"),
      },
      {
        id: "pasteleria-saludable",
        day: "21",
        month: "Julio",
        title: "Pastelería saludable",
        subtitle: "Postres nutritivos",
        image: "/images/portada/talleres/pasteleria-saludable.png",
        imageAlt:
          "Taller de pastelería saludable en Huancayo con torta, cookies, tartas y crema",
        href: workshopWhatsAppUrl("Pastelería saludable"),
      },
      {
        id: "pasteleria-chifa",
        day: "04",
        month: "Agosto",
        title: "Pastelería y chifa",
        subtitle: "Vacacional · 4 clases",
        image: "/images/portada/talleres/pasteleria-chifa.png",
        imageAlt:
          "Taller vacacional de pastelería y chifa en Huancayo con postres y platos orientales",
        href: workshopWhatsAppUrl("Pastelería y chifa"),
      },
    ],
  },
  {
    id: "gastronomia",
    layout: "single",
    shortLabel: "Gastronomía",
    eyebrow: "Huancayo · Junín",
    title: "Escuela de Gastronomía",
    subtitle:
      "Estudia Gastronomía Profesional, Pastelería, Barismo, Bar Profesional y Sommelier en Cooking Gourmet. Formación presencial, práctica y orientada al mundo gastronómico.",
    image: "/images/portada/gastronomia.jpg",
    mobileImage: "/images/portada/gastronomia2.jpg",
    imageAlt:
      "Estudiante de Gastronomía Profesional en Cooking Gourmet Huancayo",
    mediaSide: "right",
    objectPosition: "62% center",
    mobileObjectPosition: "56% center",
    imageScale: 1.02,
    startDate: {
      label: "Próximo inicio",
      day: "17",
      month: "Agosto",
    },
    primaryAction: {
      label: "Ver programas",
      href: "#programas",
    },
    secondaryAction: {
      label: "Consultar por WhatsApp",
      href: informationWhatsAppUrl(
        "Gastronomía Profesional",
        "Quiero información completa sobre horarios, matrícula, mensualidad, requisitos e inicio de clases."
      ),
      external: true,
    },
  },
  {
    id: "pasteleria",
    layout: "single",
    shortLabel: "Pastelería",
    eyebrow: "Clases prácticas presenciales",
    title: "Pastelería Profesional",
    subtitle:
      "Aprende técnicas de pastelería, panadería, decoración, postres comerciales y producción profesional con metodología práctica en Huancayo.",
    image: "/images/portada/pasteleria.jpg",
    mobileImage: "/images/portada/pasteleria2.jpg",
    imageAlt:
      "Estudiante de Pastelería Profesional decorando una preparación en Cooking Gourmet",
    mediaSide: "left",
    objectPosition: "46% center",
    mobileObjectPosition: "50% center",
    imageScale: 1.03,
    startDate: {
      label: "Próximo inicio",
      day: "17",
      month: "Agosto",
    },
    primaryAction: {
      label: "Conoce Pastelería",
      href: "/programas/pasteleria",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: informationWhatsAppUrl(
        "Pastelería Profesional",
        "Quiero conocer horarios, matrícula, mensualidad, duración, requisitos y fecha de inicio."
      ),
      external: true,
    },
  },
  {
    id: "bar-profesional",
    layout: "single",
    shortLabel: "Bar",
    eyebrow: "Coctelería · mixología · servicio",
    title: "Bar Profesional",
    subtitle:
      "Entrena técnicas de barra, coctelería clásica y moderna, mixología, atención al cliente y operación profesional para bares, restaurantes, hoteles y eventos.",
    image: "/images/portada/bar-profesional.jpg",
    mobileImage: "/images/portada/bar-profesional2.jpg",
    imageAlt:
      "Estudiante de Bar Profesional preparando una bebida en Cooking Gourmet Huancayo",
    mediaSide: "right",
    objectPosition: "67% center",
    mobileObjectPosition: "58% center",
    imageScale: 1.02,
    startDate: {
      label: "Próximo inicio",
      day: "17",
      month: "Agosto",
    },
    primaryAction: {
      label: "Conoce Bar Profesional",
      href: "/programas/bar-profesional",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: informationWhatsAppUrl(
        "Bar Profesional",
        "Quiero conocer horarios, matrícula, mensualidad, duración, requisitos y fecha de inicio."
      ),
      external: true,
    },
  },
  {
    id: "barismo",
    layout: "single",
    shortLabel: "Barismo",
    eyebrow: "Café de especialidad",
    title: "Barismo Profesional",
    subtitle:
      "Especialízate en café, espresso, métodos de extracción, cata, texturización de leche, latte art y operación profesional de cafetería.",
    image: "/images/portada/barismo.jpg",
    mobileImage: "/images/portada/barismo2.jpg",
    imageAlt:
      "Barista preparando café de especialidad en Cooking Gourmet Huancayo",
    mediaSide: "left",
    objectPosition: "45% center",
    mobileObjectPosition: "50% center",
    imageScale: 1.03,
    startDate: {
      label: "Próximo inicio",
      day: "17",
      month: "Agosto",
    },
    primaryAction: {
      label: "Conoce Barismo",
      href: "/programas/barismo",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: informationWhatsAppUrl(
        "Barismo Profesional",
        "Quiero conocer horarios, matrícula, mensualidad, duración, requisitos y fecha de inicio."
      ),
      external: true,
    },
  },
  {
    id: "sommelier",
    layout: "single",
    shortLabel: "Sommelier",
    eyebrow: "Cata · maridaje · servicio",
    title: "Sommelier Profesional",
    subtitle:
      "Desarrolla criterio sensorial, cultura del vino, técnicas de cata, maridaje y servicio especializado con una formación elegante y práctica.",
    image: "/images/portada/sommelier.jpg",
    mobileImage: "/images/portada/sommelier2.jpg",
    imageAlt:
      "Profesional realizando una evaluación de vino en programa Sommelier de Cooking Gourmet",
    mediaSide: "right",
    objectPosition: "61% center",
    mobileObjectPosition: "55% center",
    imageScale: 1.02,
    startDate: {
      label: "Próximo inicio",
      day: "17",
      month: "Agosto",
    },
    primaryAction: {
      label: "Conoce Sommelier",
      href: "/programas/sommelier",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: informationWhatsAppUrl(
        "Sommelier Profesional",
        "Quiero conocer horarios, matrícula, mensualidad, duración, requisitos y fecha de inicio."
      ),
      external: true,
    },
  },
];