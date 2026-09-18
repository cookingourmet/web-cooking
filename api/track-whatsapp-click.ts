function cleanText(value: unknown, max = 2000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function endpoint() {
  const explicit = cleanText(process.env.CRM_WEB_WHATSAPP_CLICK_URL, 1000);
  if (explicit) return explicit;
  const leads = cleanText(process.env.CRM_WEB_LEAD_URL, 1000).replace(/\/+$/, "");
  if (!leads) return "";
  return leads.replace(/\/leads$/, "/whatsapp-click");
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Método no permitido" });

  const crmEndpoint = endpoint();
  const token = cleanText(process.env.CRM_WEB_LEAD_TOKEN, 500);
  if (!crmEndpoint || !token) return res.status(503).json({ ok: false, message: "CRM web no configurado" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const payload = {
      event_id: cleanText(body.eventId, 80).toLowerCase(),
      tracking_code: cleanText(body.trackingCode, 40).toUpperCase(),
      phone_hint: cleanText(body.phoneHint, 30) || undefined,
      name_hint: cleanText(body.nameHint, 150) || undefined,
      program: cleanText(body.program, 80) || undefined,
      page_url: cleanText(body.pageUrl, 1000) || undefined,
      utm_source: cleanText(body.utm_source, 150) || undefined,
      utm_medium: cleanText(body.utm_medium, 150) || undefined,
      utm_campaign: cleanText(body.utm_campaign, 190) || undefined,
      utm_content: cleanText(body.utm_content, 190) || undefined,
      utm_term: cleanText(body.utm_term, 190) || undefined,
      cta_location: cleanText(body.ctaLocation, 80) || undefined,
      message: cleanText(body.message, 2000) || undefined,
    };

    if (!payload.event_id || !payload.tracking_code) {
      return res.status(422).json({ ok: false, message: "Faltan datos del evento" });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(crmEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data: any = await response.json().catch(() => ({}));
      return res.status(response.ok ? 200 : response.status).json(response.ok ? { ok: true, ...data } : { ok: false, message: "CRM no aceptó el evento" });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error instanceof Error ? error.message : "Error interno" });
  }
}
