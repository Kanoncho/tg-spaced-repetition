import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { type User } from 'generated/prisma/client';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ObsidianAuth } from 'src/common/decorators/obsidian-auth.decorator';
import { NotesDto } from 'src/notes/dto/notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @HttpCode(HttpStatus.CREATED)
  @ObsidianAuth()
  @Post('sync')
  createMany(@CurrentUser() user: User, @Body() body: NotesDto) {
    return this.notesService.syncAllNotes(body.notes, user.id);
  }

  @Auth()
  @Get('folder')
  getFolder(@CurrentUser() user: User, @Query('folderId') folderId: string) {
    return this.notesService.getFolderContent(folderId, user.id);
  }

  @Auth()
  @Get('cards')
  getNoteCards(@CurrentUser() user: User, @Query('noteId') noteId: string) {
    return this.notesService.getNoteCards(noteId, user.id);
  }
}
