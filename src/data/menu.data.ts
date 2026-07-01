export type MenuItem = {
  label: string;
  href: string;
};

export const programMenu: MenuItem[] = [
  {
    label: "Gastronomía",
    href: "/programas/gastronomia",
  },
  {
    label: "Pastelería",
    href: "/programas/pasteleria",
  },
  {
    label: "Bar Profesional",
    href: "/programas/bar-profesional",
  },
  {
    label: "Barismo",
    href: "/programas/barismo",
  },
  {
    label: "Sommelier",
    href: "/programas/sommelier",
  },
  {
    label: "Cocina Acelerada",
    href: "/programas/cocina-acelerada",
  },
];

export const mainMenu: MenuItem[] = [
  {
    label: "Nosotros",
    href: "/#nosotros",
  },
  {
    label: "Especialización",
    href: "/especializacion",
  },
  {
    label: "Bolsa laboral",
    href: "/#bolsa-laboral",
  },
  {
    label: "Contacto",
    href: "/#contacto",
  },
];