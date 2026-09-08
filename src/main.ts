import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";
import "./styles/base/utilities.css";
import "./styles/base/motion.css";
import "./styles/layout/container.css";
import "./styles/layout/spacing.css";
import "./styles/pages/home.css";
import "./styles/pages/program-detail.css";
import "./styles/pages/specialization.css";

import "./components/layout/header/header.css";
import "./components/layout/footer/footer.css";
import "./components/hero/heroSlider.css";

import "./components/sections/about/about.css";
import "./components/sections/careers/careers.css";
import "./components/sections/events/events.css";
import "./components/sections/students/students.css";
import "./components/sections/contact/contact.css";
import "./components/sections/testimonials/testimonials.css";
import "./components/ui/button/button.css";

import "./styles/pages/admission.css";
import { routePage } from "./routes";
import { applyPageSeo } from "./seo";
import { initAnalytics, captureAttribution, pageLocation, trackPageView } from "./utils/analytics";
import { initEngagementTracking } from "./utils/page-motion";
import { mountAssistantWindow } from "./components/hero/heroAssistantPanel";
import { normalizeWhatsAppLinks } from "./utils/whatsapp";

const appRoot = document.querySelector<HTMLDivElement>("#app");
if (!appRoot) throw new Error("No se encontró #app");
let lastPage = "";
const initialReferrer = (() => { try { return document.referrer ? new URL(document.referrer).origin : ""; } catch { return ""; } })();

function normalizePath(path: string) { return path.replace(/\/+$/, "") || "/"; }
function scrollToCurrentHash() {
  let id = "";
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (!id) { window.scrollTo(0,0); return; }
  window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
}
function renderRoute() {
  let path = normalizePath(window.location.pathname);
  const aliases: Record<string,string> = { "/index.html": "/", "/programas/cocina": "/programas/cocina-acelerada", "/nosotros": "/#nosotros", "/contacto": "/#contacto" };
  if (aliases[path]) {
    const url = new URL(aliases[path], window.location.origin);
    url.search = window.location.search;
    if (!url.hash) url.hash = window.location.hash;
    window.history.replaceState({},"", url.pathname + url.search + url.hash);
    path = normalizePath(url.pathname);
  }
  const referrer = lastPage || initialReferrer;
  const page = routePage(path);
  appRoot!.innerHTML = page.html;
  applyPageSeo(path);
  page.init();
  mountAssistantWindow();
  normalizeWhatsAppLinks(appRoot!);
  window.dispatchEvent(new Event("cg:route-change"));
  scrollToCurrentHash();
  initEngagementTracking();
  trackPageView(referrer);
  lastPage = pageLocation();
}

document.addEventListener("click", event => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest<HTMLAnchorElement>("a[href]");
  if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return;
  if (/\.[a-z0-9]+$/i.test(url.pathname) && url.pathname !== "/index.html") return;
  event.preventDefault();
  const samePage = normalizePath(url.pathname) === normalizePath(window.location.pathname) && url.search === window.location.search;
  if (url.href === window.location.href) { scrollToCurrentHash(); return; }
  window.history.pushState({}, "", url.pathname + url.search + url.hash);
  if (samePage) { scrollToCurrentHash(); return; }
  captureAttribution();
  renderRoute();
});
window.addEventListener("popstate", () => {
  if (lastPage === pageLocation()) { scrollToCurrentHash(); return; }
  captureAttribution(); renderRoute();
});
initAnalytics();
renderRoute();
