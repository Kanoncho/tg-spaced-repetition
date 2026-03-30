import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export function getOpenaiConfig(configService: ConfigService) {
  return new OpenAI({
    apiKey: configService.getOrThrow<string>('OPENAI_API_KEY'),
  });
}
