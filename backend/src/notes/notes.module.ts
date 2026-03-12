import { Module } from '@nestjs/common';
import { CardsModule } from 'src/cards/cards.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [CardsModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
