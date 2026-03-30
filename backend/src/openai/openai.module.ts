import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getOpenaiConfig } from 'src/config/openai.config';

@Module({
  providers: [
    {
      provide: 'OPENAI_CLIENT',
      useFactory: getOpenaiConfig,
      inject: [ConfigService],
    },
  ],
  exports: ['OPENAI_CLIENT'],
})
export class OpenaiModule {}
