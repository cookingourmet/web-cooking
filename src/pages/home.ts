import { renderHeader, initHeader } from "../components/layout/header/header";
import { renderHeroSlider, initHeroSlider } from "../components/hero/heroSlider";
import { renderAboutSection } from "../components/sections/about/about";
import { renderFooter } from "../components/layout/footer/footer";

export function renderHomePage() {
  return `
    <div class="site-shell">
      ${renderHeader()}

      <main class="page-home">
        ${renderHeroSlider()}
        ${renderAboutSection()}
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function initHomePage() {
  initHeader();
  initHeroSlider();
}