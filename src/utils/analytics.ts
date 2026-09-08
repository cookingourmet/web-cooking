import { ADMISSION, isAdmissionProgram } from "../data/admission.data";
import { PAGE_PATHS } from "../seo";

declare global { interface Window { dataLayer?: Array<Record<string, unknown>>; } }
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Partial<Record<typeof UTM_KEYS[number], string>> & { landing_path?: string };
const PARAMS = ["program_id", "cohort_id", "workshop_id", "schedule_id", "cta_location", "form_id", "lead_method", "error_code"] as const;
const PROGRAMS = ["gastronomia", "pasteleria", "bar-profesional", "barismo", "sommelier", "cocina-acelerada"];
const WORKSHOPS = ["cocina-peruana", "pasteleria-comercial", "petit-four", "fast-food", "limonadas-y-triples", "pasteleria-boutique"];
let installed = false;

function campaignValue(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length > 100 || !/^[a-zA-Z0-9_ -]+$/.test(value) || /\d{8,}/.test(value)) return undefined;
  return value.trim() || undefined;
}
export function safePagePath(path = window.location.pathname) {
  const normalized = path.replace(/\/+$/, "") || "/";
  return PAGE_PATHS.includes(normalized) ? normalized : "/404";
}
export function pageLocation() { return `${window.location.origin}${safePagePath()}`; }
export function readAttribution(): Attribution {
  try {
    const raw = JSON.parse(window.sessionStorage.getItem("cg_attribution") ?? "{}");
    const result: Attribution = {};
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
    for (const key of UTM_KEYS) { const value = campaignValue(raw[key]); if (value) result[key] = value; }
    if (typeof raw.landing_path === "string" && PAGE_PATHS.includes(raw.landing_path)) result.landing_path = raw.landing_path;
    return result;
  } catch { return {}; }
}
export function captureAttribution() {
  const previous = readAttribution();
  const query = new URLSearchParams(window.location.search);
  const campaign: Attribution = {};
  for (const key of UTM_KEYS) { const value = campaignValue(query.get(key)); if (value) campaign[key] = value; }
  const incoming = Boolean(campaign.utm_source || campaign.utm_medium || campaign.utm_campaign);
  const next = incoming ? { ...campaign, landing_path: safePagePath() } : { ...previous, landing_path: previous.landing_path ?? safePagePath() };
  try {
    window.sessionStorage.setItem("cg_attribution", JSON.stringify(next));
    if (!window.sessionStorage.getItem("cg_first_attribution")) window.sessionStorage.setItem("cg_first_attribution",JSON.stringify(next));
  } catch { /* Navigation and contact remain available without storage. */ }
  return next;
}
export function appendLeadAttribution(formData: FormData) {
  const attribution = readAttribution();
  for (const [key, value] of Object.entries(attribution)) if (value) formData.append(key, value);
}
export function trackEvent(event: string, values: Record<string, unknown> = {}) {
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(event)) return;
  const path = safePagePath();
  const routeProgram = path.startsWith("/programas/") ? path.split("/").pop() : undefined;
  const routeWorkshop = path.startsWith("/talleres/") ? path.split("/").pop() : undefined;
  const workshop = values.workshop_id ?? routeWorkshop;
  const candidate = values.program_id ?? (workshop ? undefined : routeProgram);
  const program = candidate === "cocina" ? "cocina-acelerada" : candidate;
  const payload: Record<string, unknown> = { event, page_location: pageLocation(), page_path: path, ...readAttribution() };
  if (event === "cg_page_view") {
    payload.page_title = document.title;
    try {
      const referrer = new URL(String(values.page_referrer ?? ""));
      payload.page_referrer = referrer.origin + (referrer.origin === window.location.origin ? safePagePath(referrer.pathname) : "");
    } catch { payload.page_referrer = ""; }
  }
  for (const key of PARAMS) payload[key] = null;
  for (const key of PARAMS) {
    const value = values[key];
    if (typeof value === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) payload[key] = value;
  }
  payload.program_id = typeof program === "string" && PROGRAMS.includes(program) ? program : null;
  payload.workshop_id = typeof workshop === "string" && WORKSHOPS.includes(workshop) ? workshop : null;
  payload.cohort_id = typeof payload.program_id === "string" && isAdmissionProgram(payload.program_id) ? ADMISSION.id : null;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}
export function trackPageView(referrer: string) {
  trackEvent("cg_page_view", { page_referrer: referrer });
  const program = safePagePath().match(/^\/programas\/(.+)$/)?.[1];
  if (program) trackEvent("view_program", { program_id: program });
  const workshop = safePagePath().match(/^\/talleres\/(.+)$/)?.[1];
  if (workshop) trackEvent("view_workshop", { workshop_id: workshop });
}
// Use explicit element context before the SPA replaces the clicked page.
export function elementContext(element: HTMLElement) {
  const owner = element.closest<HTMLElement>("[data-program-id], [data-career]");
  const workshop = element.closest<HTMLElement>("[data-workshop-id], [data-track-workshop]");
  const location = element.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation
    ?? (element.closest(".cg-hero") ? "hero" : element.closest("[data-assistant-window]") ? "cookito"
      : element.closest("#talleres") ? "workshops" : element.closest(".cg-careers") ? "programs"
      : element.closest("header") ? "header" : element.closest("footer") ? "footer" : "content");
  return { program_id: owner?.dataset.programId ?? owner?.dataset.career,
    workshop_id: workshop?.dataset.workshopId ?? workshop?.dataset.trackWorkshop,
    schedule_id: element.closest<HTMLElement>("[data-schedule-id]")?.dataset.scheduleId,
    cta_location: location, form_id: location === "cookito" ? "cookito" : undefined };
}
export function initAnalytics() {
  if (installed) return;
  installed = true;
  captureAttribution();
  // Private review URLs and localhost must never pollute the production property.
  if (["www.cookingourmet.edu.pe", "cookingourmet.edu.pe"].includes(window.location.hostname)) {
    window.dataLayer ??= [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    if (!document.getElementById("cg-gtm")) {
      const script = document.createElement("script"); script.id = "cg-gtm"; script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-T8T5TV37";
      document.head.appendChild(script);
    }
  }
  document.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;
    const params = elementContext(anchor);
    if (anchor.href.startsWith("https://wa.me/")) trackEvent("click_whatsapp", params);
    else if (anchor.href.startsWith("tel:")) trackEvent("click_phone",params);
    else if (anchor.href.startsWith("mailto:")) trackEvent("click_email",params);
    else if (/google\.[^/]+\/maps/.test(anchor.href)) trackEvent("click_map",params);
    else if (/\.pdf(?:$|[?#])/.test(anchor.href)) trackEvent("brochure_download",params);
    else {
      const url = new URL(anchor.href);
      const program = url.origin === window.location.origin && url.pathname.match(/^\/programas\/([^/]+)\/?$/)?.[1];
      const workshop = url.origin === window.location.origin && url.pathname.match(/^\/talleres\/([^/]+)\/?$/)?.[1];
      if (program) trackEvent("select_program", { ...params, program_id: program });
      else if (workshop) trackEvent("select_workshop", { ...params, workshop_id: workshop });
      else if (anchor.classList.contains("topbar__virtual")) trackEvent("click_virtual_classroom", params);
    }
  }, { capture: true });
}
