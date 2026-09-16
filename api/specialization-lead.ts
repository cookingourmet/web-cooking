import { Resend } from "resend";
import { isCrmRequired, relayWebLeadToCrm } from "../server/crm-web-lead";

const TO_EMAIL = "j.ventas@cookingourmet.edu.pe";
const FROM_EMAIL = "Cooking Gourmet Web <no-reply@cookingourmet.edu.pe>";

function cleanText(value: unknown, max = 2000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseTopics(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => cleanText(item, 180)).filter(Boolean);
  const text = cleanText(value, 1500);
  return text ? text.split(",").map((item) => cleanText(item, 180)).filter(Boolean) : [];
}

async function sendNotification(input: {
  fullName: string;
  phone: string;
  email?: string;
  program: string;
  message: string;
  pageUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) return { sent: false, skipped: true };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:24px;color:#171717;">
      <div style="max-width:660px;margin:auto;background:#fff;border-radius:18px;padding:26px;border:1px solid #eee;">
        <h2 style="margin:0 0 16px;color:#b8002d;">Nuevo lead de Especialización</h2>
        <p><strong>Programa:</strong> ${escapeHtml(input.program)}</p>
        <p><strong>Nombre:</strong> ${escapeHtml(input.fullName)}</p>
        <p><strong>Celular:</strong> ${escapeHtml(input.phone)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(input.email || "No compartido")}</p>
        <p><strong>Mensaje:</strong> ${escapeHtml(input.message)}</p>
        <p><strong>Página:</strong> ${escapeHtml(input.pageUrl)}</p>
      </div>
    </div>`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: input.email || undefined,
    subject: `Nuevo lead Especialización - ${input.fullName}`,
    text: `${input.program}\n${input.fullName}\n${input.phone}\n${input.message}\n${input.pageUrl}`,
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
    const email = cleanText(body.email, 255);
    const program = cleanText(body.program || "Programa de Capacitación en Inocuidad Alimentaria", 180);
    const message = cleanText(body.message || "Deseo información sobre horarios, inversión y vacantes.", 2000);
    const pageUrl = cleanText(body.pageUrl, 1000);
    const topics = parseTopics(body.topics);
    const instructor = cleanText(body.instructor || body.chef, 150);

    if (!submissionId || !fullName || !phone || !pageUrl) {
      return res.status(422).json({ ok: false, message: "Faltan datos obligatorios" });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ ok: false, message: "Correo inválido" });
    }

    const crmMessage = [
      message,
      instructor ? `Instructor: ${instructor}` : "",
      topics.length ? `Temas: ${topics.join(", ")}` : "",
    ].filter(Boolean).join("\n");

    let crm: any = null;
    let crmError: string | null = null;
    try {
      crm = await relayWebLeadToCrm({
        submissionId,
        name: fullName,
        phone,
        email: email || undefined,
        programLabel: program,
        message: crmMessage,
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

    let emailResult: any = null;
    let emailError: string | null = null;
    try {
      emailResult = await sendNotification({ fullName, phone, email: email || undefined, program, message, pageUrl });
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Error de correo";
    }

    const crmFailed = !crm?.delivered;
    if (crmFailed && isCrmRequired()) {
      return res.status(502).json({ ok: false, message: "No pudimos registrar la solicitud en el CRM.", crm: { ...crm, error: crmError }, email: { ...emailResult, error: emailError } });
    }
    if (crmFailed && !emailResult?.sent) {
      return res.status(502).json({ ok: false, message: "No pudimos confirmar el envío.", crm: { ...crm, error: crmError }, email: { ...emailResult, error: emailError } });
    }

    return res.status(200).json({ ok: true, success: true, crm, email: emailResult });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Error interno al enviar la solicitud", error: error instanceof Error ? error.message : "Error desconocido" });
  }
}
