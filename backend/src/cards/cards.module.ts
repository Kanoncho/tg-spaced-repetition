import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [OpenaiModule, TelegramModule],
  providers: [CardsService],
  exports: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
