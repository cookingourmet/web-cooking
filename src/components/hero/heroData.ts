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
  cards: [
    HeroWorkshopCard,
    HeroWorkshopCard,
    HeroWorkshopCard
  ];
};

export type HeroSlide = HeroSingleSlide | HeroCardsSlide;

export const heroSlides: HeroSlide[] = [
  {
    id: "gastronomia",
    layout: "single",
    shortLabel: "Gastronomía",
    eyebrow: "17 años formando profesionales",
    title: "Somos pioneros en toda la región",
    subtitle:
      "Convierte tu pasión por la cocina en una profesión con formación práctica desde el primer día.",
    image: "/images/portada/gastronomia.jpg",
    mobileImage: "/images/portada/gastronomia2.jpg",
    imageAlt: "Estudiante de Gastronomía preparando un plato",
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
      label: "Conoce Gastronomía",
      href: "#programas",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: "https://wa.me/51981377382",
      external: true,
    },
  },
  {
    id: "pasteleria",
    layout: "single",
    shortLabel: "Pastelería",
    eyebrow: "Creatividad que se convierte en profesión",
    title: "Domina el arte de la pastelería",
    subtitle:
      "Aprende técnicas profesionales, decoración y producción con una metodología práctica y moderna.",
    image: "/images/portada/pasteleria.jpg",
    mobileImage: "/images/portada/pasteleria2.jpg",
    imageAlt: "Estudiante decorando una preparación de pastelería",
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
      href: "#programas",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: "https://wa.me/51981377382",
      external: true,
    },
  },
  {
    id: "bar-profesional",
    layout: "single",
    shortLabel: "Bar",
    eyebrow: "Formación práctica",
    title: "Haz de la coctelería tu especialidad",
    subtitle:
      "Entrena técnica, servicio y creatividad para desenvolverte profesionalmente detrás de la barra.",
    image: "/images/portada/bar-profesional.jpg",
    mobileImage: "/images/portada/bar-profesional2.jpg",
    imageAlt: "Estudiante preparando una bebida en una barra profesional",
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
      href: "#programas",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: "https://wa.me/51981377382",
      external: true,
    },
  },
  {
    id: "barismo",
    layout: "single",
    shortLabel: "Barismo",
    eyebrow: "Técnica, precisión y servicio",
    title: "Descubre el mundo del café profesional",
    subtitle:
      "Domina extracción, métodos, latte art y presentación con formación enfocada en la práctica.",
    image: "/images/portada/barismo.jpg",
    mobileImage: "/images/portada/barismo2.jpg",
    imageAlt: "Barista preparando café de especialidad",
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
      href: "#programas",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: "https://wa.me/51981377382",
      external: true,
    },
  },
  {
    id: "sommelier",
    layout: "single",
    shortLabel: "Sommelier",
    eyebrow: "Una formación especializada",
    title: "Aprende a interpretar y servir el vino",
    subtitle:
      "Desarrolla criterio sensorial, maridaje y servicio para destacar con una preparación elegante y profesional.",
    image: "/images/portada/sommelier.jpg",
    mobileImage: "/images/portada/sommelier2.jpg",
    imageAlt: "Profesional realizando una evaluación de vino",
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
      href: "#programas",
    },
    secondaryAction: {
      label: "Solicitar información",
      href: "https://wa.me/51981377382",
      external: true,
    },
  },
  {
    id: "talleres-practicos",
    layout: "cards",
    shortLabel: "Talleres",
    eyebrow: "17 años contigo",
    title: "Talleres prácticos",
    subtitle:
      "Aprende una habilidad concreta con clases dinámicas, grupos prácticos y resultados desde la primera sesión.",
    primaryAction: {
      label: "Ver todos los talleres",
      href: "#talleres",
    },
    cards: [
      {
        id: "petit-four",
        day: "08",
        month: "Junio",
        title: "Petit Four",
        subtitle: "Bocaditos salados y dulces",
        image: "/images/portada/talleres/petit-four.jpg",
        imageAlt: "Selección de petit fours dulces y salados",
        href: "#talleres",
      },
      {
        id: "panes-comerciales",
        day: "17",
        month: "Junio",
        title: "Panes comerciales",
        subtitle: "Preparaciones rentables",
        image: "/images/portada/talleres/panes-comerciales.jpg",
        imageAlt: "Panes comerciales recién horneados",
        href: "#talleres",
      },
      {
        id: "cocina-peruana",
        day: "22",
        month: "Junio",
        title: "Cocina peruana",
        subtitle: "Sabor y técnica",
        image: "/images/portada/talleres/cocina-peruana.jpg",
        imageAlt: "Plato representativo de la cocina peruana",
        href: "#talleres",
      },
    ],
  },
];
