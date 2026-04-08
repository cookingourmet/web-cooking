import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";
import "./styles/base/utilities.css";
import "./styles/layout/container.css";
import "./styles/layout/spacing.css";
import "./styles/pages/home.css";
import "./styles/pages/program-detail.css";

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
import { renderGastronomiaPage } from "./pages/programs/gastronomia";
import { renderPasteleriaPage } from "./pages/programs/pasteleria";
import { renderBarProfesionalPage } from "./pages/programs/bar-profesional";
import { renderBarismoPage } from "./pages/programs/barismo";
import { renderSommelierPage } from "./pages/programs/sommelier";
import { renderCocinaPage } from "./pages/programs/cocina";
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

function renderRoute() {
  const currentPath = normalizePath(window.location.pathname);

  switch (currentPath) {
    case "/":
      appRoot.innerHTML = renderHomePage();
      initHomePage();
      break;

    case "/programas/gastronomia":
      appRoot.innerHTML = renderGastronomiaPage();
      break;

    case "/programas/pasteleria":
      appRoot.innerHTML = renderPasteleriaPage();
      break;

    case "/programas/bar-profesional":
      appRoot.innerHTML = renderBarProfesionalPage();
      break;

    case "/programas/barismo":
      appRoot.innerHTML = renderBarismoPage();
      break;

    case "/programas/sommelier":
      appRoot.innerHTML = renderSommelierPage();
      break;

    case "/programas/cocina":
      appRoot.innerHTML = renderCocinaPage();
      break;

    default:
      appRoot.innerHTML = renderHomePage();
      initHomePage();
      break;
  }

  initProgramPageEffects();
  window.scrollTo(0, 0);
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest("a") as HTMLAnchorElement | null;

  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  const isInternalLink =
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !link.hasAttribute("target") &&
    !link.hasAttribute("download");

  if (!isInternalLink) return;

  event.preventDefault();

  const nextPath = normalizePath(href);

  if (nextPath !== normalizePath(window.location.pathname)) {
    window.history.pushState({}, "", nextPath);
  }

  renderRoute();
});

window.addEventListener("popstate", renderRoute);

renderRoute();