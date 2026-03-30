import { BadRequestException, Injectable } from '@nestjs/common'
import { CardsService } from 'src/cards/cards.service'
import { NoteDto } from 'src/notes/dto/notes.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class NotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsService: CardsService,
    private readonly telegramService: TelegramService,
  ) {}

  async syncAllNotes(notes: NoteDto[], userId: number) {
    const promises = notes.map((note) => this.syncOneNote(note, userId));

    const allResults = await Promise.allSettled(promises);

    const successfulResults = allResults.filter(
      (result) => result.status === 'fulfilled',
    );

    await this.telegramService.notifySuccessfulSync(
      userId,
      successfulResults.length,
    );

    return successfulResults;
  }

  async syncOneNote(noteDto: NoteDto, userId: number) {
    const existingNote = await this.prisma.note.findUnique({
      where: { path: noteDto.path },
      select: { id: true, mtime: true, path: true },
    });

    if (existingNote && Number(existingNote.mtime) === noteDto.mtime) {
      return { status: 'skipped', message: 'No changes detected' };
    }

    let { cards } = await this.cardsService.generateCards(noteDto.content);

    cards = cards.map((card) => ({ ...card, userId: userId }));

    const folderId = await this.ensureFolderHierarchy(noteDto.path, userId);

    const fileName = this.extractFileName(noteDto.path);

    return this.prisma.$transaction(async (tx) => {
      if (existingNote) {
        await tx.card.deleteMany({
          where: { noteId: existingNote.id },
        });
      }

      return tx.note.upsert({
        where: { path: noteDto.path },
        update: {
          name: fileName,
          mtime: noteDto.mtime,
          folderId: folderId,
          cards: {
            create: cards,
          },
        },
        create: {
          path: noteDto.path,
          name: fileName,
          mtime: noteDto.mtime,
          userId: userId,
          folderId: folderId,
          cards: { create: cards },
        },
        select: {
          cards: true,
        },
      });
    });
  }

  private async ensureFolderHierarchy(
    fullPath: string,
    userId: number,
  ): Promise<string | null> {
    const segments = fullPath.split('/').slice(0, -1);
    if (segments.length === 0) return null;

    let parentId: string | null = null;
    let currentPath = '';

    for (const segment of segments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      const folder = await this.prisma.folder.upsert({
        where: { path: currentPath },
        update: {},
        create: {
          name: segment,
          path: currentPath,
          userId: userId,
          parentId: parentId,
        },
      });

      parentId = folder.id;
    }

    return parentId;
  }

  private extractFileName(path: string): string {
    return path.split('/').pop()?.replace('.md', '') || 'Untitled';
  }

  async getFolderContent(folderId: string, userId: number) {
    const folders = await this.prisma.folder.findMany({
      where: {
        parentId: folderId ?? null,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    const notes = await this.prisma.note.findMany({
      where: {
        folderId: folderId ?? null,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    return { id: folderId, folders, notes };
  }

  async getNoteCards(noteId: string, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
      select: {
        id: true,
        name: true,
        cards: {
          select: {
            id: true,
            question: true,
            answer: true,
            noteId: true,
          },
        },
        userId: true,
      },
    });

    if (!note || note.userId !== userId) {
      throw new BadRequestException(
        'Note does not belong to user or does not exist',
      );
    }

    return note;
  }
}
