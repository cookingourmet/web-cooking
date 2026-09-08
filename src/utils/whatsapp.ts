const WEB_ORIGIN_MESSAGE = "Hola, vengo de la página web de Cooking Gourmet.";

export function normalizeWhatsAppLinks(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me/"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href);
      const currentMessage = url.searchParams.get("text")?.trim() ?? "";
      if (currentMessage.startsWith(WEB_ORIGIN_MESSAGE)) return;

      const cleanedMessage = currentMessage
        .replace(/^Hola,\s*vengo\s+(?:desde|de)\s+la\s+(?:página\s+)?web\s+de\s+Cooking\s+Gourmet\.\s*/i, "")
        .replace(/^Hola,\s*/i, "")
        .trim();

      url.searchParams.set(
        "text",
        [WEB_ORIGIN_MESSAGE, cleanedMessage].filter(Boolean).join("\n")
      );
      anchor.href = url.toString();
    } catch {
      // El enlace original sigue disponible si el navegador no puede normalizarlo.
    }
  });
}
