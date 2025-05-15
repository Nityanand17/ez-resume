/* eslint-disable lingui/text-restrictions */

import { t } from '@/client/libs/i18n';

import { DEFAULT_MAX_TOKENS } from "@/client/constants/llm";
import { useLLMStore } from "@/client/stores/llm";

import { gemini } from "./client";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Change the tone of the following paragraph to be {mood} and returns in the language of the text:

Text: """{input}"""

Revised Text: """`;

type Mood = "casual" | "professional" | "confident" | "friendly";

export const changeTone = async (text: string, mood: Mood) => {
  const prompt = PROMPT.replace("{mood}", mood).replace("{input}", text);

  const { maxTokens } = useLLMStore.getState();

  const model = gemini();
  
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: maxTokens ?? DEFAULT_MAX_TOKENS,
      temperature: 0.5,
      stopSequences: ['"""'],
    },
  });

  const response = result.response;
  
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error(t`Gemini did not return any choices for your text.`);
  }

  return response.candidates[0].content.parts[0].text ?? text;
};
