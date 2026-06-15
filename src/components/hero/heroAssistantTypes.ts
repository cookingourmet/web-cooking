export type ProgramKey =
  | "gastronomia"
  | "pasteleria"
  | "bar_profesional"
  | "barismo"
  | "sommelier"
  | "cocina_corta";

export type ProgramPricing = {
  inscription: number | null;
  enrollment: number | null;
  monthly: number | null;
  uniform: number | null;
  note?: string;
};

export type SchedulePreference =
  | "morning"
  | "afternoon"
  | "night"
  | "weekend"
  | "";

export type ProgramSchedule = {
  label: string;
  time: string;
  preference: Exclude<SchedulePreference, "">;
};

export type ProgramInfo = {
  key: ProgramKey;
  label: string;
  emoji: string;
  tagline: string;
  shortDescription: string;
  practicalBenefit: string;
  imageUrl: string;
  imageAlt: string;
  brochureUrl: string;
  pageUrl: string;
  aliases: string[];
  startDate: string;
  duration: string;
  frequency: string;
  modality: string;
  requirements: string[];
  schedules: ProgramSchedule[];
  included: string[];
  pricing: ProgramPricing;
};

export type Intent =
  | "greeting"
  | "programs"
  | "info"
  | "costs"
  | "schedules"
  | "enrollment"
  | "brochure"
  | "advisor"
  | "duration"
  | "requirements"
  | "location"
  | "modality"
  | "certification"
  | "start_date"
  | "frequency"
  | "recommendation"
  | "compare"
  | "clarification"
  | "thanks"
  | "farewell"
  | "unknown";

export type CostDetail =
  | "inscription"
  | "enrollment"
  | "monthly"
  | "uniform"
  | "start"
  | "all";

export type LeadStep =
  | "idle"
  | "ask_visitor_name"
  | "ask_phone"
  | "ask_program"
  | "completed";

export type PendingQuestion =
  | ""
  | "choose_program"
  | "choose_schedule";

export type ReplyMode =
  | "none"
  | "main"
  | "programs"
  | "program_actions"
  | "schedule_options"
  | "recommendation"
  | "contact";

export type LeadStatus = "idle" | "sending" | "sent" | "error";

export type TextMessage = {
  id: string;
  role: "bot" | "user";
  kind: "text";
  text: string;
};

export type ProgramCardMessage = {
  id: string;
  role: "bot";
  kind: "program_card";
  programKey: ProgramKey;
};

export type InfoTableRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type InfoTableMessage = {
  id: string;
  role: "bot";
  kind: "info_table";
  variant: "costs" | "schedules" | "comparison" | "summary";
  title: string;
  subtitle?: string;
  rows: InfoTableRow[];
  footer?: string;
};

export type ChatMessage =
  | TextMessage
  | ProgramCardMessage
  | InfoTableMessage;

export type BotSequenceItem =
  | {
      kind: "text";
      text: string;
      delay?: number;
    }
  | {
      kind: "program_card";
      programKey: ProgramKey;
      delay?: number;
    }
  | {
      kind: "info_table";
      variant: InfoTableMessage["variant"];
      title: string;
      subtitle?: string;
      rows: InfoTableRow[];
      footer?: string;
      delay?: number;
    };

export type AssistantState = {
  version: 8;
  hasWelcomed: boolean;
  visitorName: string;
  deferredUserMessage: string;
  selectedProgram: ProgramKey | "";
  previousProgram: ProgramKey | "";
  currentIntent: Intent;
  currentCostDetail: CostDetail;
  schedulePreference: SchedulePreference;
  pendingQuestion: PendingQuestion;
  leadStep: LeadStep;
  messages: ChatMessage[];
  replyMode: ReplyMode;
  phone: string;
  leadStatus: LeadStatus;
  leadError: string;
  muted: boolean;
};

export type MessageAnalysis = {
  raw: string;
  normalized: string;
  intent: Intent;
  suggestedIntent: Intent;
  confidence: number;
  programs: ProgramKey[];
  costDetail: CostDetail;
  schedulePreference: SchedulePreference;
  affirmative: boolean;
  negative: boolean;
};
