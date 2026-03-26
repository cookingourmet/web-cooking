export type MenuLink = {
  label: string;
  href: string;
};

export type MenuGroup = {
  label: string;
  children: MenuLink[];
};

export const programMenu: MenuLink[] = [
  { label: "Gastronomía", href: "#gastronomia" },
  { label: "Pastelería", href: "#pasteleria" },
  { label: "Bar Profesional", href: "#bar-profesional" },
  { label: "Barismo", href: "#barismo" },
  { label: "Sommelier", href: "#sommelier" },
  { label: "Cocina", href: "#cocina" },
];

export const mainMenu: MenuLink[] = [
  { label: "Eventos", href: "#eventos" },
  { label: "Estudiantes", href: "#estudiantes" },
  { label: "Rutas", href: "#rutas" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Bolsa laboral", href: "#bolsa-laboral" },
];