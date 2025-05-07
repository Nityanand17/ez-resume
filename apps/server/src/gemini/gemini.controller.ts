import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { GeminiService } from './gemini.service';

class SpellCheckDto {
  text: string;
}

class SummaryDto {
  text: string;
  maxLength?: number;
}

@ApiTags('Gemini')
@Controller('gemini')
@UseGuards(JwtGuard)
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('spell-check')
  async checkSpelling(@Body() { text }: SpellCheckDto) {
    const correctedText = await this.geminiService.checkSpelling(text);
    return { text: correctedText };
  }

  @Post('summary')
  async generateSummary(@Body() { text, maxLength }: SummaryDto) {
    const summary = await this.geminiService.generateSummary(text, maxLength);
    return { summary };
  }
}
