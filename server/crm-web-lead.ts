type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export type CrmWebLead = Attribution & {
  submissionId: string;
  name: string;
  phone: string;
  email?: string;
  programLabel?: string;
  message?: string;
  pageUrl?: string;
};

type CrmRelayResult = {
  configured: boolean;
  delivered: boolean;
  status?: string;
  replayed?: boolean;
  httpStatus?: number;
};

const PROGRAM_MAP = new Map<string, string>([
  ["gastronomía profesional", "Gastronomía"],
  ["gastronomia profesional", "Gastronomía"],
  ["gastronomía", "Gastronomía"],
  ["gastronomia", "Gastronomía"],
  ["panadería y pastelería", "Pastelería"],
  ["panaderia y pasteleria", "Pastelería"],
  ["pastelería", "Pastelería"],
  ["pasteleria", "Pastelería"],
  ["bar profesional", "Bar Profesional"],
  ["barismo profesional", "Barismo"],
  ["barismo", "Barismo"],
  ["sommelier profesional", "Sommelier"],
  ["sommelier", "Sommelier"],
  ["cocina acelerada", "Cocina Corta"],
  ["cocina corta", "Cocina Corta"],
  ["programa de capacitación en inocuidad alimentaria", "Especialización"],
  ["programa de capacitacion en inocuidad alimentaria", "Especialización"],
  ["especialización", "Especialización"],
  ["especializacion", "Especialización"],
]);

function clean(value: unknown, max = 2000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function optional(value: unknown, max = 190) {
  const text = clean(value, max);
  return text || undefined;
}

function normalizePhone(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (/^9\d{8}$/.test(digits)) return `51${digits}`;
  return digits.replace(/^\+/, "");
}

export function crmProgram(programLabel: unknown) {
  const raw = clean(programLabel, 120);
  const normalized = raw.toLocaleLowerCase("es-PE");
  return PROGRAM_MAP.get(normalized) ?? "Por definir";
}

export function isCrmRequired() {
  return String(process.env.CRM_WEB_LEAD_REQUIRED ?? "false").toLowerCase() === "true";
}

export async function relayWebLeadToCrm(input: CrmWebLead): Promise<CrmRelayResult> {
  const endpoint = clean(process.env.CRM_WEB_LEAD_URL, 1000);
  const token = clean(process.env.CRM_WEB_LEAD_TOKEN, 500);

  if (!endpoint || !token) {
    return { configured: false, delivered: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        submission_id: clean(input.submissionId, 80).toLowerCase(),
        name: clean(input.name, 150),
        phone: normalizePhone(input.phone),
        email: optional(input.email, 255),
        program: crmProgram(input.programLabel),
        message: optional(input.message, 2000),
        page_url: optional(input.pageUrl, 1000),
        utm_source: optional(input.utm_source, 150),
        utm_medium: optional(input.utm_medium, 150),
        utm_campaign: optional(input.utm_campaign, 190),
        utm_content: optional(input.utm_content, 190),
        utm_term: optional(input.utm_term, 190),
      }),
      signal: controller.signal,
    });

    const data: any = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = clean(data?.message || `CRM respondió HTTP ${response.status}`, 400);
      throw new Error(message || "No se pudo registrar el lead en el CRM.");
    }

    return {
      configured: true,
      delivered: true,
      status: optional(data?.status, 40),
      replayed: Boolean(data?.replayed),
      httpStatus: response.status,
    };
  } finally {
    clearTimeout(timeout);
  }
}
