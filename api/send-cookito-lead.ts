import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "ventas@cookingourmet.edu.pe";
const FROM_EMAIL = "Cooking Gourmet Web <no-reply@cookingourmet.edu.pe>";

function cleanText(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Método no permitido",
    });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        ok: false,
        message: "Falta configurar RESEND_API_KEY en Vercel",
      });
    }

    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    const fullName = cleanText(body.fullName);
    const phone = cleanText(body.phone);
    const email = cleanText(body.email);
    const dni = cleanText(body.dni || "No compartido");
    const programLabel = cleanText(body.programLabel || "-");
    const intent = cleanText(body.intent || "-");
    const source = cleanText(body.source || "cookito_web_chat");
    const pageUrl = cleanText(body.pageUrl || "-");
    const createdAt = cleanText(body.createdAt || new Date().toISOString());

    if (!fullName || !phone || !email || programLabel === "-") {
      return res.status(422).json({
        ok: false,
        message: "Faltan datos obligatorios",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(422).json({
        ok: false,
        message: "Correo inválido",
      });
    }

    const subject = `Nuevo lead Cookito - ${programLabel}`;

    const text = `
Nueva solicitud desde Cookito

Programa: ${programLabel}
Nombre: ${fullName}
Celular: ${phone}
Correo: ${email}
DNI: ${dni}
Interés: ${intent}
Origen: ${source}
Página: ${pageUrl}
Fecha: ${createdAt}
`.trim();

    const html = `
      <div style="font-family:Arial,sans-serif;background:#f6fbf8;padding:24px;color:#123026;">
        <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #d8efe5;">
          <h2 style="margin:0 0 12px;color:#08764f;">Nueva solicitud desde Cookito</h2>
          <p style="margin:0 0 20px;color:#5b7368;">Un visitante dejó sus datos desde el asistente virtual.</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Programa</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(programLabel)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Nombre</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Celular</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Correo</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>DNI</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(dni)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Interés</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(intent)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Origen</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(source)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;"><strong>Página</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef5f1;">${escapeHtml(pageUrl)}</td>
            </tr>
            <tr>
              <td style="padding:10px;"><strong>Fecha</strong></td>
              <td style="padding:10px;">${escapeHtml(createdAt)}</td>
            </tr>
          </table>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "No se pudo enviar el correo",
        error,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Solicitud enviada correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno al enviar la solicitud",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}