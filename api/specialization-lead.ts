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

function parseTopics(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(item)).filter(Boolean);
  }

  const text = cleanText(value);

  if (!text) {
    return ["Masas madre", "Croissant", "Panes sin gluten"];
  }

  return text
    .split(",")
    .map((item) => cleanText(item))
    .filter(Boolean);
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
    const email = cleanText(body.email || "No compartido");
    const preferredTime = cleanText(body.preferredTime || "No especificado");
    const message = cleanText(
      body.message || "Deseo información sobre horarios, inversión y vacantes."
    );
    const programLabel = cleanText(body.program || "Master Class 2026");
    const chef = cleanText(body.chef || "Ayrton Casas");
    const source = cleanText(body.source || "landing_especializacion");
    const pageUrl = cleanText(body.pageUrl || "-");
    const createdAt = cleanText(body.createdAt || new Date().toISOString());
    const topics = parseTopics(body.topics);

    if (!fullName || !phone) {
      return res.status(422).json({
        ok: false,
        message: "Faltan datos obligatorios",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasRealEmail = email !== "No compartido";

    if (hasRealEmail && !emailRegex.test(email)) {
      return res.status(422).json({
        ok: false,
        message: "Correo inválido",
      });
    }

    const topicsText = topics.join(", ");

    const subject = `Nuevo lead Master Class 2026 - ${fullName}`;

    const text = `
Nueva solicitud desde la landing de Especialización

Programa: ${programLabel}
Chef: ${chef}
Nombre: ${fullName}
Celular: ${phone}
Correo: ${email}
Horario preferido: ${preferredTime}
Temas de interés: ${topicsText}
Mensaje: ${message}
Origen: ${source}
Página: ${pageUrl}
Fecha: ${createdAt}
`.trim();

    const html = `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:24px;color:#171717;">
        <div style="max-width:660px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #eeeeee;">
          <div style="background:#080808;padding:24px 26px;color:#ffffff;">
            <p style="margin:0 0 8px;color:#ff6f8c;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:700;">
              Nuevo lead web
            </p>

            <h2 style="margin:0;color:#ffffff;font-size:26px;line-height:1.15;">
              Master Class 2026
            </h2>

            <p style="margin:8px 0 0;color:#cfcfcf;font-size:14px;line-height:1.5;">
              Solicitud enviada desde la landing de especialización.
            </p>
          </div>

          <div style="padding:26px;">
            <h3 style="margin:0 0 16px;color:#111111;font-size:18px;">
              Datos del interesado
            </h3>

            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;width:190px;color:#666666;">
                  <strong>Programa</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(programLabel)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Chef</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(chef)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Nombre</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;font-weight:700;">
                  ${escapeHtml(fullName)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Celular</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;font-weight:700;">
                  ${escapeHtml(phone)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Correo</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(email)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Horario preferido</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(preferredTime)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Temas</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(topicsText)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Origen</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(source)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#666666;">
                  <strong>Página</strong>
                </td>
                <td style="padding:11px 10px;border-bottom:1px solid #eeeeee;color:#111111;">
                  ${escapeHtml(pageUrl)}
                </td>
              </tr>

              <tr>
                <td style="padding:11px 10px;color:#666666;">
                  <strong>Fecha</strong>
                </td>
                <td style="padding:11px 10px;color:#111111;">
                  ${escapeHtml(createdAt)}
                </td>
              </tr>
            </table>

            <div style="margin-top:22px;padding:18px;border-radius:14px;background:#fff5f7;border:1px solid #ffd5df;">
              <h3 style="margin:0 0 10px;color:#b8002d;font-size:16px;">
                Mensaje
              </h3>

              <p style="margin:0;color:#333333;line-height:1.65;font-size:14px;">
                ${escapeHtml(message)}
              </p>
            </div>

            <div style="margin-top:22px;padding:16px;border-radius:14px;background:#f8f8f8;border:1px solid #eeeeee;">
              <p style="margin:0;color:#666666;font-size:13px;line-height:1.6;">
                Responder directamente al interesado por WhatsApp:
                <strong style="color:#111111;">${escapeHtml(phone)}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: hasRealEmail ? email : undefined,
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