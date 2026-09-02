export const ADMISSION = {
  id: "admision_2026_11_16",
  date: "2026-11-16",
  label: "16 de noviembre de 2026",
  shortLabel: "16 de noviembre",
  programs: ["gastronomia", "pasteleria", "bar-profesional"],
} as const;

export function isAdmissionProgram(slug: string) {
  return (ADMISSION.programs as readonly string[]).includes(slug);
}

export const INQUIRY_SHIFTS = [
  { id: "morning", label: "Mañana" },
  { id: "afternoon", label: "Tarde" },
  { id: "night", label: "Noche" },
  { id: "weekend", label: "Fin de semana" },
] as const;
