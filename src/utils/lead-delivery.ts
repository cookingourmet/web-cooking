export class LeadDeliveryError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

type JsonLeadBody = Record<string, unknown>;

export async function deliverLead(
  endpoint: string,
  body: FormData | JsonLeadBody
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const isFormData = body instanceof FormData;
    const response = await fetch(endpoint, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      signal: controller.signal,
    });

    const data: unknown = await response.json().catch(() => null);
    const acknowledged =
      data &&
      typeof data === "object" &&
      (("success" in data && data.success === true) ||
        ("ok" in data && data.ok === true));

    if (!response.ok) {
      throw new LeadDeliveryError(
        "delivery_error",
        "No se pudo enviar la solicitud. Inténtalo nuevamente o escríbenos por WhatsApp."
      );
    }

    if (!acknowledged) {
      throw new LeadDeliveryError(
        "invalid_response",
        "No pudimos confirmar el envío. Inténtalo nuevamente o escríbenos por WhatsApp."
      );
    }

    return data;
  } catch (error) {
    if (error instanceof LeadDeliveryError) throw error;
    throw new LeadDeliveryError(
      controller.signal.aborted ? "timeout" : "network_error",
      "No pudimos conectar con admisión. Inténtalo nuevamente o escríbenos por WhatsApp."
    );
  } finally {
    clearTimeout(timeout);
  }
}
