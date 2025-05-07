export const DEFAULT_MODEL = "gemini-flash-2.0";
export const DEFAULT_MAX_TOKENS = 1024;
export const DEFAULT_TEMPERATURE = 0.3;

export const GEMINI_MODELS = ["gemini-flash-2.0", "gemini-pro", "gemini-ultra"];

export const LLM_PROVIDERS = ["gemini"] as const;
export type LLMProvider = (typeof LLM_PROVIDERS)[number];
