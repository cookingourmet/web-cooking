import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderCocinaPage() {
  return renderProgramDetail(programsData.cocina);
}