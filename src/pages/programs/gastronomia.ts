import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderGastronomiaPage() {
  return renderProgramDetail(programsData.gastronomia);
}