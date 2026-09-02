import { ADMISSION, isAdmissionProgram } from "../data/admission.data";
import { PAGE_PATHS } from "../seo";

declare global { interface Window { dataLayer?: Array<Record<string, unknown>>; } }
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Partial<Record<typeof UTM_KEYS[number], string>> & { landing_path?: string };
const PARAMS = ["program_id", "cohort_id", "workshop_id", "schedule_id", "cta_location", "form_id", "lead_method", "error_code"] as const;
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
  const program = typeof values.program_id === "string" ? values.program_id : routeProgram;
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
  if (program) { payload.program_id = program; payload.cohort_id = isAdmissionProgram(program) ? ADMISSION.id : null; }
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}
export function trackPageView(referrer: string) {
  trackEvent("cg_page_view", { page_referrer: referrer });
  const program = safePagePath().match(/^\/programas\/(.+)$/)?.[1];
  if (program) trackEvent("view_program", { program_id: program });
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
    const params = { program_id: anchor.dataset.programId ?? anchor.closest<HTMLElement>("[data-program-id]")?.dataset.programId, schedule_id: anchor.dataset.scheduleId, cta_location: anchor.dataset.ctaLocation ?? (anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" : "content") };
    if (anchor.href.startsWith("https://wa.me/")) trackEvent("click_whatsapp", params);
    else if (anchor.href.startsWith("tel:")) trackEvent("click_phone",params);
    else if (anchor.href.startsWith("mailto:")) trackEvent("click_email",params);
    else if (/google\.[^/]+\/maps/.test(anchor.href)) trackEvent("click_map",params);
    else if (/\.pdf(?:$|[?#])/.test(anchor.href)) trackEvent("brochure_download",params);
  });
}
