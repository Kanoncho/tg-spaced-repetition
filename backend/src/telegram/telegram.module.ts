import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { getTelegramConfig } from 'src/config/telegram.config';
import { TelegramProcessor } from './telegram.processor';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    BullModule.registerQueue({
      name: 'notifications-queue',
    }),
    BullBoardModule.forFeature({
      name: 'notifications-queue',
      adapter: BullMQAdapter,
    }),
  ],
  providers: [TelegramService, TelegramProcessor],
  exports: [TelegramService],
})
export class TelegramModule {}
