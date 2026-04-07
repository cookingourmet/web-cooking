import { programsData } from "../../data/programs.data";
import { renderProgramDetail } from "./programDetail";

export function renderPasteleriaPage() {
  return renderProgramDetail(programsData.pasteleria);
}