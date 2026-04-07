import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderBarismoPage() {
  return renderProgramDetail(programsData.barismo);
}