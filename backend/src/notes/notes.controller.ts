import { Body, Controller, Post } from '@nestjs/common';
import { NotesDto } from 'src/notes/notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/sync')
  createMany(@Body() body: NotesDto) {
    return this.notesService.syncAllNotes(body.notes);
  }
}
