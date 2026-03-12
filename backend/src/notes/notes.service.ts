import { Injectable } from '@nestjs/common';
import { CardsService } from 'src/cards/cards.service';
import { NoteDto } from 'src/notes/notes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsService: CardsService,
  ) {}

  async syncAllNotes(notes: NoteDto[]) {
    const promises = notes.map((note) => this.syncOneNote(note));

    const allResults = await Promise.allSettled(promises);

    const sucessfullResults = allResults.filter(
      (result) => result.status === 'fulfilled',
    );

    return sucessfullResults;
  }

  async syncOneNote(noteDto: NoteDto) {
    const existingNote = await this.prisma.note.findUnique({
      where: { path: noteDto.path },
      select: { id: true, mtime: true, path: true },
    });

    if (existingNote && Number(existingNote.mtime) === noteDto.mtime) {
      return { status: 'skipped', message: 'No changes detected' }; // Что возвращать?
    }

    const { cards: generatedCards } = await this.cardsService.generateCards(
      noteDto.content,
    );

    const folderId = await this.ensureFolderHierarchy(noteDto.path);

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
            create: generatedCards,
          },
        },
        create: {
          path: noteDto.path,
          name: fileName,
          mtime: noteDto.mtime,
          folderId: folderId,
          cards: {
            create: generatedCards,
          },
        },
      });
    });
  }

  private async ensureFolderHierarchy(
    fullPath: string,
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
}
