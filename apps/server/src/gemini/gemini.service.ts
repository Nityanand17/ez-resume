import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly apiKey: string;
  private readonly apiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models";
  private readonly model = "gemini-pro";

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>("GEMINI_API_KEY") || "";
  }

  async checkSpelling(text: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.apiEndpoint}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Please check the following text for spelling errors and return the corrected version. Only fix spelling mistakes, don't change the meaning or style: "${text}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          },
        },
      );

      return response.data.candidates[0].content.parts[0].text || text;
    } catch (error) {
      this.logger.error(`Error checking spelling: ${error.message}`);
      return text; // Return original text if there's an error
    }
  }

  async generateSummary(text: string, maxLength: number = 150): Promise<string> {
    try {
      const response = await axios.post(
        `${this.apiEndpoint}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Please summarize the following text in a professional manner, keeping it concise (maximum ${maxLength} characters) and highlighting key points: "${text}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        },
      );

      return response.data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      this.logger.error(`Error generating summary: ${error.message}`);
      return ""; // Return empty string if there's an error
    }
  }
}
