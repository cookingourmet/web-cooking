import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";
import "./styles/base/utilities.css";
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

import { renderHomePage, initHomePage } from "./pages/home";
import {
  renderSpecializationPage,
  initSpecializationPage,
} from "./pages/specialization";

import { renderGastronomiaPage } from "./pages/programs/gastronomia";
import { renderPasteleriaPage } from "./pages/programs/pasteleria";
import { renderBarProfesionalPage } from "./pages/programs/bar-profesional";
import { renderBarismoPage } from "./pages/programs/barismo";
import { renderSommelierPage } from "./pages/programs/sommelier";
import { renderCocinaPage } from "./pages/programs/cocina";
import { initProgramDetail } from "./pages/programs/programDetail";
import { initProgramPageEffects } from "./utils/program-effects";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app");
}

const appRoot = app;

function normalizePath(pathname: string) {
  if (!pathname) return "/";

  const cleanPath = pathname.replace(/\/+$/, "");

  return cleanPath === "" ? "/" : cleanPath;
}

function redirectTo(path: string) {
  window.history.replaceState({}, "", path);
}

function getCurrentRoutePath() {
  return normalizePath(window.location.pathname);
}

function scrollAfterRender() {
  const hash = window.location.hash;

  if (!hash) {
    window.scrollTo(0, 0);
    return;
  }

  window.requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>(hash);

    if (!target) {
      window.scrollTo(0, 0);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function renderRoute() {
  let currentPath = getCurrentRoutePath();
  let afterRender: (() => void) | null = null;

  if (currentPath === "/index.html") {
    redirectTo("/");
    currentPath = "/";
  }

  if (currentPath === "/programas/cocina") {
    redirectTo("/programas/cocina-acelerada");
    currentPath = "/programas/cocina-acelerada";
  }

  switch (currentPath) {
    case "/":
      appRoot.innerHTML = renderHomePage();
      afterRender = initHomePage;
      break;

    case "/especializacion":
      appRoot.innerHTML = renderSpecializationPage();
      afterRender = initSpecializationPage;
      break;

    case "/programas/gastronomia":
      appRoot.innerHTML = renderGastronomiaPage();
      afterRender = initProgramDetail;
      break;

    case "/programas/pasteleria":
      appRoot.innerHTML = renderPasteleriaPage();
      afterRender = initProgramDetail;
      break;

    case "/programas/bar-profesional":
      appRoot.innerHTML = renderBarProfesionalPage();
      afterRender = initProgramDetail;
      break;

    case "/programas/barismo":
      appRoot.innerHTML = renderBarismoPage();
      afterRender = initProgramDetail;
      break;

    case "/programas/sommelier":
      appRoot.innerHTML = renderSommelierPage();
      afterRender = initProgramDetail;
      break;

    case "/programas/cocina-acelerada":
      appRoot.innerHTML = renderCocinaPage();
      afterRender = initProgramDetail;
      break;

    default:
      appRoot.innerHTML = renderHomePage();
      afterRender = initHomePage;
      break;
  }

  afterRender?.();
  initProgramPageEffects();
  scrollAfterRender();
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest("a") as HTMLAnchorElement | null;

  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("https://wa.me") ||
    link.hasAttribute("target") ||
    link.hasAttribute("download")
  ) {
    return;
  }

  let targetUrl: URL;

  try {
    targetUrl = new URL(href, window.location.origin);
  } catch {
    return;
  }

  if (targetUrl.origin !== window.location.origin) return;

  let nextPath = normalizePath(targetUrl.pathname);

  if (nextPath === "/index.html") {
    nextPath = "/";
  }

  if (nextPath === "/programas/cocina") {
    nextPath = "/programas/cocina-acelerada";
  }

  const nextUrl = `${nextPath}${targetUrl.hash}`;
  const currentUrl = `${normalizePath(window.location.pathname)}${window.location.hash}`;

  event.preventDefault();

  if (nextUrl !== currentUrl) {
    window.history.pushState({}, "", nextUrl);
  }

  renderRoute();
});

window.addEventListener("popstate", renderRoute);

renderRoute();