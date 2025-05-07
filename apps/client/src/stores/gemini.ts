import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL, DEFAULT_TEMPERATURE } from "../constants/llm";

type GeminiStore = {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
  model: string | null;
  setModel: (model: string | null) => void;
  maxTokens: number | null;
  setMaxTokens: (maxTokens: number | null) => void;
  temperature: number | null;
  setTemperature: (temperature: number | null) => void;
};

export const useGeminiStore = create<GeminiStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (apiKey: string | null) => {
        set({ apiKey });
      },
      model: DEFAULT_MODEL,
      setModel: (model: string | null) => {
        set({ model });
      },
      maxTokens: DEFAULT_MAX_TOKENS,
      setMaxTokens: (maxTokens: number | null) => {
        set({ maxTokens });
      },
      temperature: DEFAULT_TEMPERATURE,
      setTemperature: (temperature: number | null) => {
        set({ temperature });
      },
    }),
    { name: "gemini" },
  ),
);
