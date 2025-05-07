/* eslint-disable lingui/text-restrictions */

import { t } from "@lingui/macro";

import { DEFAULT_MAX_TOKENS } from "@/client/constants/llm";
import { useLLMStore } from "@/client/stores/llm";

import { gemini } from "./client";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Improve the writing of the following paragraph and returns in the language of the text:

Text: """{input}"""

Revised Text: """`;

export const improveWriting = async (text: string) => {
  const prompt = PROMPT.replace("{input}", text);

  const { maxTokens } = useLLMStore.getState();

  const model = gemini();
  
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: maxTokens ?? DEFAULT_MAX_TOKENS,
      temperature: 0,
      stopSequences: ['"""'],
    },
  });

  const response = result.response;
  
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error(t`Gemini did not return any choices for your text.`);
  }

  return response.candidates[0].content.parts[0].text ?? text;
};
