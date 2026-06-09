import {
  FAQ_RESPONSES,
  PROGRAMS,
} from "./heroAssistantData";
import type {
  BotSequenceItem,
  CostDetail,
  ProgramInfo,
  ProgramKey,
  SchedulePreference,
} from "./heroAssistantTypes";

export function firstName(value: string) {
  return value.trim().split(/\s+/)[0] || "amigo";
}

export function money(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

function costLabel(detail: CostDetail) {
  const labels: Record<CostDetail, string> = {
    inscription: "Inscripción",
    enrollment: "Matrícula",
    monthly: "Mensualidad",
    uniform: "Uniforme",
    start: "Para iniciar",
    all: "Costos",
  };
  return labels[detail];
}

function costValue(program: ProgramInfo, detail: CostDetail) {
  const pricing = program.pricing;
  switch (detail) {
    case "inscription":
    case "start":
      return pricing.inscription;
    case "enrollment":
      return pricing.enrollment;
    case "monthly":
      return pricing.monthly;
    case "uniform":
      return pricing.uniform;
    default:
      return null;
  }
}

export function programInfoSequence(
  program: ProgramInfo,
  visitorName: string
): BotSequenceItem[] {
  return [
    {
      kind: "text",
      text: `¡Buena elección, ${firstName(visitorName)}! ${program.emoji} ${program.tagline}`,
    },
    {
      kind: "text",
      text: `${program.practicalBenefit}`,
    },
    {
      kind: "info_table",
      variant: "summary",
      title: program.label,
      subtitle: "Información principal",
      rows: [
        { label: "Inicio", value: program.startDate, highlight: true },
        { label: "Duración", value: program.duration },
        { label: "Frecuencia", value: program.frequency },
        { label: "Modalidad", value: program.modality },
        ...program.included.map((item, index) => ({
          label: `Incluye ${index + 1}`,
          value: item,
        })),
      ],
      footer: "Puedes revisar costos, horarios, requisitos o el PDF.",
    },
    {
      kind: "program_card",
      programKey: program.key,
    },
  ];
}

export function costSequence(
  program: ProgramInfo,
  detail: CostDetail,
  visitorName: string
): BotSequenceItem[] {
  const pricing = program.pricing;

  if (detail !== "all") {
    const value = costValue(program, detail);
    if (value !== null) {
      return [
        {
          kind: "text",
          text: `Claro, ${firstName(visitorName)} 😊`,
        },
        {
          kind: "info_table",
          variant: "costs",
          title: program.label,
          subtitle: "Consulta puntual",
          rows: [
            {
              label: costLabel(detail),
              value: money(value),
              highlight: true,
            },
          ],
          footer:
            detail === "start"
              ? `Puedes iniciar desde ${money(value)}.`
              : "Monto del programa informado.",
        },
      ];
    }
  }

  return [
    {
      kind: "text",
      text: `${firstName(visitorName)}, te lo ordeno para que sea fácil de revisar 😊`,
    },
    {
      kind: "info_table",
      variant: "costs",
      title: program.label,
      subtitle: "Inversión",
      rows: [
        {
          label: "Inscripción",
          value: money(pricing.inscription ?? 0),
          highlight: true,
        },
        {
          label: "Matrícula",
          value: money(pricing.enrollment ?? 0),
        },
        {
          label: "Mensualidad",
          value: money(pricing.monthly ?? 0),
        },
        {
          label: "Uniforme",
          value: money(pricing.uniform ?? 0),
        },
      ],
      footer: `Puedes iniciar desde ${money(pricing.inscription ?? 0)}.`,
    },
  ];
}

export function scheduleSequence(
  program: ProgramInfo,
  preference: SchedulePreference,
  visitorName: string
): BotSequenceItem[] {
  const matchingSchedules = preference
    ? program.schedules.filter(
        (schedule) => schedule.preference === preference
      )
    : program.schedules;

  if (!matchingSchedules.length) {
    return [
      {
        kind: "text",
        text: `${firstName(visitorName)}, por ahora no tengo un horario de ese turno para ${program.label}.`,
      },
      {
        kind: "text",
        text: "Puedes consultar otro turno o hablar con un asesor para confirmar nuevas aperturas.",
      },
    ];
  }

  return [
    {
      kind: "text",
      text: `${firstName(visitorName)}, estos son los horarios de ${program.label} 🕐`,
    },
    {
      kind: "info_table",
      variant: "schedules",
      title: program.label,
      subtitle: preference ? "Turno solicitado" : "Horarios disponibles",
      rows: matchingSchedules.map((schedule, index) => ({
        label: schedule.label,
        value: schedule.time,
        highlight: index === 0,
      })),
      footer: `Frecuencia: ${program.frequency}.`,
    },
  ];
}

export function brochureSequence(
  program: ProgramInfo,
  visitorName: string
): BotSequenceItem[] {
  return [
    {
      kind: "text",
      text: `${firstName(visitorName)}, aquí tienes el PDF de ${program.label} 📄`,
    },
    {
      kind: "program_card",
      programKey: program.key,
    },
  ];
}

export function comparisonSequence(
  programKeys: ProgramKey[],
  detail: CostDetail,
  visitorName: string
): BotSequenceItem[] {
  const effectiveDetail = detail === "all" ? "monthly" : detail;
  const rows = programKeys
    .map((key) => PROGRAMS[key])
    .map((program) => {
      const value = costValue(program, effectiveDetail);
      return value === null
        ? null
        : {
            label: `${program.emoji} ${program.label}`,
            value: money(value),
            numericValue: value,
          };
    })
    .filter(
      (
        row
      ): row is {
        label: string;
        value: string;
        numericValue: number;
      } => row !== null
    )
    .sort((left, right) => left.numericValue - right.numericValue);

  if (!rows.length) {
    return [{ kind: "text", text: "No tengo datos suficientes para comparar." }];
  }

  return [
    {
      kind: "text",
      text: `${firstName(visitorName)}, aquí tienes la comparación 😊`,
    },
    {
      kind: "info_table",
      variant: "comparison",
      title: `Comparación · ${costLabel(effectiveDetail)}`,
      subtitle: "Ordenado de menor a mayor",
      rows: rows.map((row, index) => ({
        label: row.label,
        value: row.value,
        highlight: index === 0,
      })),
      footer:
        rows.length > 1
          ? `${rows[0].label} tiene el monto más bajo.`
          : "Monto disponible.",
    },
  ];
}

export function faqSequence(
  type:
    | "duration"
    | "requirements"
    | "location"
    | "modality"
    | "certification"
    | "start_date"
    | "frequency",
  visitorName: string,
  program?: ProgramInfo
): BotSequenceItem[] {
  const name = firstName(visitorName);

  if (!program) {
    const fallback: Record<typeof type, string> = {
      duration: "Dime qué programa te interesa y te doy la duración exacta.",
      requirements: "Dime qué programa te interesa y te muestro sus requisitos.",
      location: FAQ_RESPONSES.location,
      modality: "Todos los programas registrados son 100% presenciales.",
      certification: FAQ_RESPONSES.certification,
      start_date: "Dime qué programa te interesa y te doy la fecha de inicio.",
      frequency: "Dime qué programa te interesa y te digo cuántos días se estudia.",
    };

    return [{ kind: "text", text: `${name}, ${fallback[type]}` }];
  }

  if (type === "requirements") {
    const rows = program.requirements.length
      ? program.requirements.map((requirement, index) => ({
          label: `Requisito ${index + 1}`,
          value: requirement,
          highlight: index === 0,
        }))
      : [
          {
            label: "Confirmación",
            value: "Consultar con un asesor",
            highlight: true,
          },
        ];

    return [
      { kind: "text", text: `${name}, estos son los requisitos 😊` },
      {
        kind: "info_table",
        variant: "summary",
        title: program.label,
        subtitle: "Requisitos",
        rows,
        footer: "Ten tus documentos listos para agilizar la inscripción.",
      },
    ];
  }

  const exactValues: Record<Exclude<typeof type, "requirements">, string> = {
    duration: `La duración es ${program.duration}.`,
    location: FAQ_RESPONSES.location,
    modality: `La modalidad es ${program.modality}.`,
    certification: FAQ_RESPONSES.certification,
    start_date: `El inicio informado es el ${program.startDate}.`,
    frequency: `La frecuencia es ${program.frequency}.`,
  };

  return [
    {
      kind: "text",
      text: `${name}, ${exactValues[type as Exclude<typeof type, "requirements">]}`,
    },
  ];
}
