export type CookitoCrmReply = {
  ok: boolean;
  success: boolean;
  replayed: boolean;
  reply: string | null;
  mode: "ai" | "human" | string;
  handoff: boolean;
  score: number;
  temperature: string;
  conversation_status: string;
};

export class CookitoCrmChatError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export async function sendCookitoCrmMessage(
  chatToken: string,
  message: string,
): Promise<CookitoCrmReply> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("/api/cookito-chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatToken,
        messageId: crypto.randomUUID(),
        message,
      }),
      signal: controller.signal,
    });

    const data: any = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new CookitoCrmChatError(
        String(data?.code || (response.status === 419 ? "chat_expired" : "chat_error")),
        String(data?.message || "No pudimos continuar el chat en este momento."),
      );
    }

    if (!data || data.ok !== true || data.success !== true) {
      throw new CookitoCrmChatError(
        "invalid_response",
        "No pudimos confirmar la respuesta del asesor virtual.",
      );
    }

    return data as CookitoCrmReply;
  } catch (error) {
    if (error instanceof CookitoCrmChatError) throw error;
    throw new CookitoCrmChatError(
      controller.signal.aborted ? "timeout" : "network_error",
      controller.signal.aborted
        ? "La respuesta está tardando demasiado. Inténtalo nuevamente."
        : "No pudimos conectar con el asesor virtual. Inténtalo nuevamente.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
