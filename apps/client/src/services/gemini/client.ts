import { t } from "@lingui/macro";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useLLMStore } from "@/client/stores/llm";

export const gemini = () => {
  const { apiKey, model } = useLLMStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your Gemini API Key has not been set yet. Please go to your account settings to enable Gemini Integration.`,
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: model || "gemini-flash-2.0",
  });
};
