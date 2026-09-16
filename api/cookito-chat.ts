function cleanText(value: unknown, max = 2000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function chatEndpoint() {
  const explicit = cleanText(process.env.CRM_WEB_CHAT_URL, 1000);
  if (explicit) return explicit;

  const leads = cleanText(process.env.CRM_WEB_LEAD_URL, 1000).replace(/\/+$/, "");
  if (!leads) return "";
  return leads.replace(/\/leads$/, "/chat");
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Método no permitido" });
  }

  try {
    const endpoint = chatEndpoint();
    const integrationToken = cleanText(process.env.CRM_WEB_LEAD_TOKEN, 500);

    if (!endpoint || !integrationToken) {
      return res.status(503).json({
        ok: false,
        message: "El chat con admisión aún no está disponible.",
      });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const chatToken = cleanText(body.chatToken, 5000);
    const messageId = cleanText(body.messageId, 80).toLowerCase();
    const message = cleanText(body.message, 2000);

    if (!chatToken || !messageId || !message) {
      return res.status(422).json({ ok: false, message: "Faltan datos del chat." });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${integrationToken}`,
        },
        body: JSON.stringify({
          chat_token: chatToken,
          message_id: messageId,
          message,
        }),
        signal: controller.signal,
      });

      const data: any = await response.json().catch(() => ({}));

      if (response.status === 419) {
        return res.status(419).json({
          ok: false,
          code: "chat_expired",
          message: "La sesión de Cookito expiró. Vuelve a iniciar la conversación para continuar.",
        });
      }

      if (!response.ok) {
        return res.status(502).json({
          ok: false,
          code: "crm_chat_error",
          message: "No pudimos obtener respuesta de admisión en este momento.",
        });
      }

      return res.status(200).json(data);
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      code: "chat_runtime_error",
      message: error instanceof Error && error.name === "AbortError"
        ? "La respuesta está tardando demasiado. Inténtalo nuevamente."
        : "No pudimos continuar el chat en este momento.",
    });
  }
}
