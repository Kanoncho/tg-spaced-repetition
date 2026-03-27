import { ConfigService } from '@nestjs/config';

export function getOpenaiConfig(configService: ConfigService) {
  return {
    token: configService.getOrThrow<string>('OPENAI_API_KEY'),
  };
}
