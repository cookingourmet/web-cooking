import { Resend } from "resend";

const TO_EMAIL = "j.ventas@cookingourmet.edu.pe";
const FROM_EMAIL = "Cooking Gourmet Web <no-reply@cookingourmet.edu.pe>";

type CrmRelayResult = {
  configured: boolean;
  delivered: boolean;
  status?: string;
  replayed?: boolean;
  httpStatus?: number;
  chatAvailable?: boolean;
  chatToken?: string;
  chatExpiresAt?: string;
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

function cleanText(value: unknown, max = 2000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function optional(value: unknown, max = 190) {
  const text = cleanText(value, max);
  return text || undefined;
}

function normalizePhone(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (/^9\d{8}$/.test(digits)) return `51${digits}`;
  return digits;
}

function crmProgram(programLabel: unknown) {
  const raw = cleanText(programLabel, 120);
  const normalized = raw.toLocaleLowerCase("es-PE");
  return PROGRAM_MAP.get(normalized) ?? "Por definir";
}

function isCrmRequired() {
  return String(process.env.CRM_WEB_LEAD_REQUIRED ?? "false").toLowerCase() === "true";
}

async function relayWebLeadToCrm(input: {
  submissionId: string;
  name: string;
  phone: string;
  programLabel?: string;
  message?: string;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}): Promise<CrmRelayResult> {
  const endpoint = cleanText(process.env.CRM_WEB_LEAD_URL, 1000);
  const token = cleanText(process.env.CRM_WEB_LEAD_TOKEN, 500);

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
        submission_id: cleanText(input.submissionId, 80).toLowerCase(),
        name: cleanText(input.name, 150),
        phone: normalizePhone(input.phone),
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
      const message = cleanText(data?.message || `CRM respondió HTTP ${response.status}`, 400);
      throw new Error(message || "No se pudo registrar el lead en el CRM.");
    }

    return {
      configured: true,
      delivered: true,
      status: optional(data?.status, 40),
      replayed: Boolean(data?.replayed),
      httpStatus: response.status,
      chatAvailable: Boolean(data?.chat_available),
      chatToken: optional(data?.chat_token, 5000),
      chatExpiresAt: optional(data?.chat_expires_at, 100),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendNotification(input: {
  fullName: string;
  phone: string;
  programLabel: string;
  intent: string;
  pageUrl: string;
  createdAt: string;
}) {
  if (!process.env.RESEND_API_KEY) return { sent: false, skipped: true };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `Nuevo lead web - ${input.programLabel}`;
  const text = [
    "Nueva solicitud desde Cookito",
    "",
    `Programa: ${input.programLabel}`,
    `Nombre: ${input.fullName}`,
    `Celular: ${input.phone}`,
    `Interés: ${input.intent}`,
    `Página: ${input.pageUrl}`,
    `Fecha: ${input.createdAt}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#f6fbf8;padding:24px;color:#123026;">
      <div style="max-width:620px;margin:auto;background:#fff;border-radius:18px;padding:24px;border:1px solid #d8efe5;">
        <h2 style="margin:0 0 16px;color:#08764f;">Nuevo lead desde la web</h2>
        <p><strong>Programa:</strong> ${escapeHtml(input.programLabel)}</p>
        <p><strong>Nombre:</strong> ${escapeHtml(input.fullName)}</p>
        <p><strong>Celular:</strong> ${escapeHtml(input.phone)}</p>
        <p><strong>Interés:</strong> ${escapeHtml(input.intent)}</p>
        <p><strong>Página:</strong> ${escapeHtml(input.pageUrl)}</p>
        <p><strong>Fecha:</strong> ${escapeHtml(input.createdAt)}</p>
      </div>
    </div>`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject,
    text,
    html,
  });

  if (error) throw new Error("No se pudo enviar el correo de respaldo.");
  return { sent: true, skipped: false };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Método no permitido" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const submissionId = cleanText(body.submissionId, 80);
    const fullName = cleanText(body.fullName, 150);
    const phone = cleanText(body.phone, 30);
    const programLabel = cleanText(body.programLabel, 120);
    const intent = cleanText(body.intent || "Información general", 500);
    const message = cleanText(body.message || intent, 2000);
    const pageUrl = cleanText(body.pageUrl, 1000);
    const createdAt = cleanText(body.createdAt || new Date().toISOString(), 80);

    if (!submissionId || !fullName || !phone || !programLabel || !pageUrl) {
      return res.status(422).json({ ok: false, message: "Faltan datos obligatorios" });
    }

    let crm: any = null;
    let crmError: string | null = null;
    try {
      crm = await relayWebLeadToCrm({
        submissionId,
        name: fullName,
        phone,
        programLabel,
        message,
        pageUrl,
        utm_source: cleanText(body.utm_source, 150) || undefined,
        utm_medium: cleanText(body.utm_medium, 150) || undefined,
        utm_campaign: cleanText(body.utm_campaign, 190) || undefined,
        utm_content: cleanText(body.utm_content, 190) || undefined,
        utm_term: cleanText(body.utm_term, 190) || undefined,
      });
    } catch (error) {
      crmError = error instanceof Error ? error.message : "Error CRM";
    }

    let email: any = null;
    let emailError: string | null = null;
    try {
      email = await sendNotification({ fullName, phone, programLabel, intent, pageUrl, createdAt });
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Error de correo";
    }

    const crmFailed = !crm?.delivered;
    if (crmFailed && isCrmRequired()) {
      return res.status(502).json({
        ok: false,
        message: "No pudimos registrar la solicitud en el CRM. Inténtalo nuevamente o escríbenos por WhatsApp.",
        crm: { ...crm, error: crmError },
        email: { ...email, error: emailError },
      });
    }

    if (crmFailed && !email?.sent) {
      return res.status(502).json({
        ok: false,
        message: "No pudimos confirmar el envío. Inténtalo nuevamente o escríbenos por WhatsApp.",
        crm: { ...crm, error: crmError },
        email: { ...email, error: emailError },
      });
    }

    return res.status(200).json({
      ok: true,
      success: true,
      message: crm?.delivered ? "Solicitud registrada en el CRM." : "Solicitud recibida por respaldo de correo.",
      crm,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno al enviar la solicitud",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
