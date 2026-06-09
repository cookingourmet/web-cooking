import {
  CHAT_STORAGE_KEY,
  createInitialAssistantState,
} from "./heroAssistantData";
import type { AssistantState } from "./heroAssistantTypes";

export function loadAssistantState(): AssistantState {
  try {
    const stored = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return createInitialAssistantState();

    const parsed = JSON.parse(stored) as Partial<AssistantState>;

    if (parsed.version !== 7) {
      return createInitialAssistantState();
    }

    return {
      ...createInitialAssistantState(),
      ...parsed,
      messages: Array.isArray(parsed.messages)
        ? parsed.messages.slice(-80)
        : [],
      leadStatus:
        parsed.leadStatus === "sending" ? "idle" : parsed.leadStatus ?? "idle",
      leadError: "",
    };
  } catch {
    return createInitialAssistantState();
  }
}

export function saveAssistantState(state: AssistantState) {
  try {
    const serializable: AssistantState = {
      ...state,
      messages: state.messages.slice(-80),
      leadStatus: state.leadStatus === "sending" ? "idle" : state.leadStatus,
      leadError: "",
    };

    window.sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(serializable)
    );
  } catch {
    // El almacenamiento es una mejora opcional.
  }
}

export function clearAssistantState() {
  try {
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
  } catch {
    // Sin acción.
  }
}
