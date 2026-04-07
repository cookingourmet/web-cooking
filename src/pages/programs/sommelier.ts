import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderSommelierPage() {
  return renderProgramDetail(programsData.sommelier);
}