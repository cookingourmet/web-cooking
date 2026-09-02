const available = import.meta.glob("/public/**/*.pdf", { eager: true, query: "?url", import: "default" });

export function brochureLink(path: string | undefined, title: string) {
  const exists = Boolean(path && Object.hasOwn(available, `/public${path}`));
  return {
    exists,
    href: exists ? path! : `https://wa.me/51981377382?text=${encodeURIComponent(`Hola, quisiera recibir el brochure y la malla de ${title} de Cooking Gourmet.`)}`,
    label: exists ? "Descargar brochure" : "Solicitar brochure",
  };
}
