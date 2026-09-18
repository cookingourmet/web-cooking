import { elementContext, pageLocation, readAttribution } from "./analytics";

const WEB_ORIGIN_MESSAGE = "Hola, vengo de la página web de Cooking Gourmet.";
const COOKITO_STORAGE_KEY = "cookito_chat_state_v8_0";
const TRACK_ENDPOINT = "/api/track-whatsapp-click";

const PROGRAM_MAP: Record<string, string> = {
  gastronomia: "Gastronomía",
  pasteleria: "Pastelería",
  "bar-profesional": "Bar Profesional",
  barismo: "Barismo",
  sommelier: "Sommelier",
  "cocina-acelerada": "Cocina Corta",
  "cocina-corta": "Cocina Corta",
};

function cleanCurrentMessage(value: string) {
  return value
    .replace(/\s*(?:Ref\.?\s*web|CG-WEB)\s*:\s*[A-Z0-9-]{6,40}\s*/gi, "\n")
    .replace(/^Hola,\s*vengo\s+(?:desde|de)\s+la\s+(?:página\s+)?web\s+de\s+Cooking\s+Gourmet\.\s*/i, "")
    .replace(/^Hola,\s*/i, "")
    .trim();
}

function cookitoIdentity() {
  try {
    const raw = JSON.parse(window.sessionStorage.getItem(COOKITO_STORAGE_KEY) ?? "{}");
    if (!raw || typeof raw !== "object") return {};
    return {
      phoneHint: typeof raw.phone === "string" ? raw.phone.replace(/\D/g, "") : "",
      nameHint: typeof raw.visitorName === "string" ? raw.visitorName.trim().slice(0, 150) : "",
      selectedProgram: typeof raw.selectedProgram === "string" ? raw.selectedProgram : "",
    };
  } catch {
    return {};
  }
}

function programFor(anchor: HTMLAnchorElement) {
  const context = elementContext(anchor);
  const slug = String(context.program_id ?? "");
  if (PROGRAM_MAP[slug]) return PROGRAM_MAP[slug];
  const path = window.location.pathname.replace(/\/+$/, "");
  const routeSlug = path.match(/^\/programas\/([^/]+)$/)?.[1] ?? "";
  if (PROGRAM_MAP[routeSlug]) return PROGRAM_MAP[routeSlug];
  if (path.startsWith("/talleres/")) return "Taller";
  if (path.startsWith("/especializacion")) return "Especialización";
  const identity = cookitoIdentity();
  return PROGRAM_MAP[String(identity.selectedProgram ?? "").replaceAll("_", "-")] ?? "Por definir";
}

function trackingCode() {
  const uuid = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  return `CGW-${uuid.slice(0, 12)}`;
}

function registerClick(anchor: HTMLAnchorElement, code: string, message: string) {
  const identity = cookitoIdentity();
  const context = elementContext(anchor);
  const attribution = readAttribution();
  const payload = {
    eventId: crypto.randomUUID(),
    trackingCode: code,
    phoneHint: identity.phoneHint || undefined,
    nameHint: identity.nameHint || undefined,
    program: programFor(anchor),
    pageUrl: pageLocation(),
    ctaLocation: context.cta_location || "content",
    message,
    ...attribution,
  };

  void fetch(TRACK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // El clic nunca se bloquea aunque el registro CRM falle temporalmente.
  });
}

export function normalizeWhatsAppLinks(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me/"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href);
      const currentMessage = cleanCurrentMessage(url.searchParams.get("text")?.trim() ?? "");
      url.searchParams.set("text", [WEB_ORIGIN_MESSAGE, currentMessage].filter(Boolean).join("\n"));
      anchor.href = url.toString();
    } catch {
      return;
    }

    if (anchor.dataset.crmWhatsappBound === "1") return;
    anchor.dataset.crmWhatsappBound = "1";

    anchor.addEventListener("click", () => {
      try {
        const url = new URL(anchor.href);
        const baseMessage = cleanCurrentMessage(url.searchParams.get("text")?.trim() ?? "");
        const code = trackingCode();
        const finalMessage = [WEB_ORIGIN_MESSAGE, baseMessage, `Ref. web: ${code}`].filter(Boolean).join("\n");
        url.searchParams.set("text", finalMessage);
        anchor.href = url.toString();
        registerClick(anchor, code, finalMessage);
      } catch {
        // Se conserva el enlace original si no puede instrumentarse.
      }
    }, { capture: true });
  });
}
