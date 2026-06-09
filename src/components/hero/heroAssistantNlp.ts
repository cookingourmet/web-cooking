import {
  PROGRAM_KEYS,
  PROGRAMS,
} from "./heroAssistantData";
import type {
  CostDetail,
  Intent,
  MessageAnalysis,
  ProgramKey,
  SchedulePreference,
} from "./heroAssistantTypes";

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function editDistance(left: string, right: string) {
  const rows = left.length + 1;
  const columns = right.length + 1;
  const matrix = Array.from({ length: rows }, () =>
    Array<number>(columns).fill(0)
  );

  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let column = 0; column < columns; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[left.length][right.length];
}

function allowedDistance(term: string) {
  if (term.length >= 11) return 3;
  if (term.length >= 7) return 2;
  if (term.length >= 5) return 1;
  return 0;
}

function wordLooksLike(word: string, target: string) {
  if (word === target) return true;
  const allowed = allowedDistance(target);
  return allowed > 0 && editDistance(word, target) <= allowed;
}

export function textHasTerm(rawText: string, rawTerm: string) {
  const text = normalizeText(rawText);
  const term = normalizeText(rawTerm);

  if (!text || !term) return false;
  if (text.includes(term)) return true;

  const textWords = text.split(" ");
  const termWords = term.split(" ");

  if (termWords.length === 1) {
    return textWords.some((word) => wordLooksLike(word, term));
  }

  return termWords.every((termWord) =>
    textWords.some((word) => wordLooksLike(word, termWord))
  );
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => textHasTerm(text, term));
}

export function detectPrograms(rawValue: string): ProgramKey[] {
  const normalized = normalizeText(rawValue);
  const detected: ProgramKey[] = [];

  for (const programKey of PROGRAM_KEYS) {
    const program = PROGRAMS[programKey];
    const matches = program.aliases.some((alias) => {
      const normalizedAlias = normalizeText(alias);
      if (normalizedAlias.length <= 3) {
        return normalized.split(" ").includes(normalizedAlias);
      }
      return textHasTerm(normalized, normalizedAlias);
    });

    if (matches) detected.push(programKey);
  }

  return detected;
}

export function detectProgramFromPath(
  pathname = window.location.pathname
): ProgramKey | null {
  const normalizedPath = pathname.toLowerCase();

  return (
    PROGRAM_KEYS.find((key) => {
      const pageUrl = PROGRAMS[key].pageUrl.split("#")[0];
      return pageUrl !== "/" && normalizedPath.includes(pageUrl);
    }) ?? null
  );
}

function detectCostDetail(normalized: string): CostDetail {
  if (
    hasAny(normalized, [
      "para iniciar",
      "para comenzar",
      "pago inicial",
      "cuanto necesito",
      "con cuanto empiezo",
      "desde cuanto",
    ])
  ) {
    return "start";
  }

  if (hasAny(normalized, ["mensualidad", "mensual", "pension"])) {
    return "monthly";
  }

  if (hasAny(normalized, ["uniforme", "mandil", "ropa"])) {
    return "uniform";
  }

  if (hasAny(normalized, ["inscripcion"])) return "inscription";

  if (
    hasAny(normalized, ["matricula"]) &&
    !hasAny(normalized, ["matricularme", "quiero matricular"])
  ) {
    return "enrollment";
  }

  return "all";
}

function detectSchedulePreference(
  normalized: string
): SchedulePreference {
  if (hasAny(normalized, ["fin de semana", "sabado", "domingo"])) {
    return "weekend";
  }
  if (hasAny(normalized, ["mañana", "manana", "temprano"])) {
    return "morning";
  }
  if (hasAny(normalized, ["tarde"])) return "afternoon";
  if (hasAny(normalized, ["noche", "nocturno"])) return "night";
  return "";
}

function scoreIntent(normalized: string) {
  const scores = new Map<Intent, number>();
  const add = (intent: Intent, terms: string[], weight: number) => {
    for (const term of terms) {
      if (textHasTerm(normalized, term)) {
        scores.set(intent, (scores.get(intent) ?? 0) + weight);
      }
    }
  };

  add(
    "clarification",
    [
      "no me entendiste",
      "no entendiste",
      "no me entiendes",
      "no entiendes nada",
      "eso no pregunte",
      "te pregunte otra cosa",
      "hice otra pregunta",
      "no era eso",
      "otra cosa te dije",
    ],
    7
  );

  add(
    "greeting",
    [
      "hola",
      "ola",
      "holaa",
      "holi",
      "buenas",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
    ],
    4
  );

  add(
    "costs",
    [
      "cuanto cuesta",
      "cuanto vale",
      "precio",
      "precios",
      "costo",
      "costos",
      "inversion",
      "mensualidad",
      "uniforme",
      "pension",
      "pago",
      "desde cuanto",
    ],
    3
  );

  add(
    "enrollment",
    [
      "quiero matricularme",
      "deseo matricularme",
      "quiero inscribirme",
      "inscribirme",
      "matricularme",
      "reservar vacante",
      "separar vacante",
      "quiero estudiar",
      "como me inscribo",
    ],
    4
  );

  add(
    "schedules",
    [
      "horario",
      "horarios",
      "turno",
      "turnos",
      "hora de clase",
      "mañana",
      "manana",
      "tarde",
      "noche",
      "fin de semana",
    ],
    3
  );

  add(
    "brochure",
    [
      "pdf",
      "brochure",
      "brochur",
      "folleto",
      "malla curricular",
      "plan de estudios",
      "temario",
    ],
    4
  );

  add(
    "compare",
    [
      "compara",
      "comparar",
      "diferencia",
      "mas barato",
      "cual cuesta menos",
      "cual conviene",
    ],
    4
  );

  add(
    "recommendation",
    [
      "recomiendame",
      "recomienda",
      "que carrera me conviene",
      "no se que estudiar",
      "ayudame a elegir",
      "cual elijo",
      "que me recomiendas",
    ],
    5
  );

  add(
    "programs",
    [
      "carrera",
      "carreras",
      "programa",
      "programas",
      "programa de estudio",
      "programas de estudio",
      "programa de estudios",
      "programas de estudios",
      "carrera profesional",
      "carreras profesionales",
      "que carreras tienen",
      "que programas tienen",
      "que carrera brindan",
      "que carreras brindan",
      "que programa brindan",
      "que programas brindan",
      "carreras disponibles",
      "programas disponibles",
      "estudios disponibles",
      "que puedo estudiar",
      "que puedo estudias",
      "que puedo aprender",
      "que enseñan",
      "que ensenan",
      "que ofrecen",
      "oferta academica",
      "oferta educativa",
      "opciones de estudio",
      "opciones para estudiar",
      "quiero ver las carreras",
      "quiero ver los programas",
      "otra carrera",
      "otro programa",
      "cambiar carrera",
      "cambiar programa",
    ],
    4
  );

  add(
    "info",
    [
      "informacion",
      "informaicon",
      "informes",
      "quiero saber",
      "mas detalles",
      "de que trata",
      "cuentame",
    ],
    3
  );

  add(
    "advisor",
    [
      "asesor",
      "asesora",
      "hablar con alguien",
      "persona",
      "whatsapp",
      "wsp",
      "llamada",
      "llamar",
      "telefono",
      "numero de telefono",
      "numero de contacto",
      "contacto",
    ],
    4
  );

  add("duration", ["duracion", "cuanto dura", "tiempo de estudio"], 3);
  add("requirements", ["requisitos", "que necesito", "documentos"], 3);
  add("location", ["direccion", "ubicacion", "donde queda", "como llego"], 3);
  add("modality", ["modalidad", "presencial", "virtual", "semipresencial"], 3);
  add("certification", ["certificado", "certificacion", "titulo", "diploma"], 3);
  add(
    "start_date",
    [
      "cuando inicia",
      "cuando empieza",
      "fecha de inicio",
      "inicio de clases",
      "que dia inicia",
      "proximo inicio",
      "inicio",
    ],
    4
  );
  add(
    "frequency",
    [
      "frecuencia",
      "cuantos dias",
      "dias de clase",
      "veces por semana",
      "que dias estudian",
      "lunes a viernes",
    ],
    4
  );
  add("thanks", ["gracias", "muchas gracias", "te agradezco"], 3);
  add("farewell", ["adios", "chau", "chao", "hasta luego", "nos vemos"], 3);

  return scores;
}

function detectAffirmative(normalized: string) {
  return hasAny(normalized, [
    "si",
    "claro",
    "de acuerdo",
    "ok",
    "dale",
    "correcto",
  ]);
}

function detectNegative(normalized: string) {
  return hasAny(normalized, [
    "no",
    "todavia no",
    "aun no",
    "despues",
    "cancelar",
    "mejor no",
  ]);
}

export function analyzeMessage(rawValue: string): MessageAnalysis {
  const normalized = normalizeText(rawValue);
  const programs = detectPrograms(rawValue);
  const costDetail = detectCostDetail(normalized);
  const schedulePreference = detectSchedulePreference(normalized);
  const scores = scoreIntent(normalized);

  if (costDetail !== "all") {
    scores.set("costs", (scores.get("costs") ?? 0) + 2);
  }

  const sorted = [...scores.entries()].sort(
    (left, right) => right[1] - left[1]
  );
  const [bestIntent = "unknown", bestScore = 0] = sorted[0] ?? [];
  const secondScore = sorted[1]?.[1] ?? 0;

  let intent: Intent = bestIntent;
  let suggestedIntent: Intent = bestIntent;

  if (bestScore === 0) {
    intent = "unknown";
    suggestedIntent = "unknown";
  } else if (bestScore < 3 || bestScore - secondScore < 1) {
    intent = "unknown";
  }

  const confidence =
    bestScore === 0
      ? 0
      : Math.min(
          0.99,
          Math.max(0.35, bestScore / (bestScore + secondScore + 1))
        );

  return {
    raw: rawValue,
    normalized,
    intent,
    suggestedIntent,
    confidence,
    programs,
    costDetail,
    schedulePreference,
    affirmative: detectAffirmative(normalized),
    negative: detectNegative(normalized),
  };
}
