import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderHeroSlider, initHeroSlider } from "../components/hero/heroSlider";
import { renderAboutSection } from "../components/sections/about/about";
import { renderCareersSection } from "../components/sections/careers/careers";
import { renderEventsSection } from "../components/sections/events/events";
import { renderStudentsSection } from "../components/sections/students/students";
import { renderTestimonialsSection } from "../components/sections/testimonials/testimonials";
import { renderContactSection } from "../components/sections/contact/contact";
import { renderFooter } from "../components/layout/footer/footer";

export function renderHomePage() {
  return `
    <div class="site-shell">
      ${renderHeader()}

      <main class="page-home">
        ${renderHeroSlider()}
        ${renderAboutSection()}
        ${renderCareersSection()}
        ${renderEventsSection()}
        ${renderStudentsSection()}
        ${renderTestimonialsSection()}
        ${renderContactSection()}
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initHomePage() {
  initHeader();
  initHeroSlider();
}