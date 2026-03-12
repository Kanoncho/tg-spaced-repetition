import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { CardsService } from './cards.service';

@Module({
  imports: [OpenaiModule],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
