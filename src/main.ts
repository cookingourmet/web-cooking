import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";
import "./styles/base/utilities.css";
import "./styles/layout/container.css";
import "./styles/layout/spacing.css";
import "./styles/pages/home.css";

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

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app");
}

app.innerHTML = renderHomePage();
initHomePage();