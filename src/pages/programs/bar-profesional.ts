import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderBarProfesionalPage() {
  return renderProgramDetail(programsData["bar-profesional"]);
}