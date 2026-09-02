import { renderHomePage, initHomePage } from "./pages/home";
import { renderSpecializationPage, initSpecializationPage } from "./pages/especializacion";
import { renderProgramDetail, initProgramDetail } from "./pages/programs/programDetail";
import { renderWorkshopDetailPage, initWorkshopDetailPage } from "./pages/workshops/workshopDetail";
import { renderHeader, initHeader } from "./components/layout/header/header";
import { renderFooter } from "./components/layout/footer/footer";
import { programsData } from "./data/programs.data";

export function routePage(path: string): { html: string; init: () => void } {
  if (path === "/") return { html: renderHomePage(), init: initHomePage };
  if (path === "/especializacion") return { html: renderSpecializationPage(), init: initSpecializationPage };
  const program = Object.values(programsData).find(p => p.path === path);
  if (program) return { html: renderProgramDetail(program), init: initProgramDetail };
  const slug = path.match(/^\/talleres\/([^/]+)$/)?.[1];
  const workshop = slug ? renderWorkshopDetailPage(slug) : null;
  if (workshop && slug) return { html: workshop, init: () => initWorkshopDetailPage(slug) };
  return { html: `${renderHeader()}<main class="admission-not-found"><div class="container"><p class="admission-kicker">Cooking Gourmet</p><h1>Página no encontrada</h1><p>Puedes conocer nuestros programas o consultar con admisión.</p><a class="admission-button" href="/#programas">Ver programas</a></div></main>${renderFooter()}`, init: initHeader };
}
