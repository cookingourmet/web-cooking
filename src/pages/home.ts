import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderHeroSlider, initHeroSlider } from "../components/hero/heroSlider";
import { renderAboutSection } from "../components/sections/about/about";
import { renderCareersSection, initCareersSection } from "../components/sections/careers/careers";
import { renderContactSection } from "../components/sections/contact/contact";
import { renderFooter } from "../components/layout/footer/footer";

export function renderHomePage() {
  return `
    <div class="site-shell">
      ${renderHeader()}
      <main class="page-home">
        ${renderHeroSlider()}
        ${renderCareersSection()}
        ${renderAboutSection()}
        ${renderContactSection()}
      </main>
      ${renderFooter()}
    </div>
  `;
}

export function initHomePage() {
  initHeader();
  initHeroSlider();
  initCareersSection();
}
