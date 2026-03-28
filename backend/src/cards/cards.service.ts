import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(
    @Inject('OPENAI_CLIENT') private readonly openai: OpenAI,
    private readonly prisma: PrismaService,
  ) {}

  async generateCards(note: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Ты — ассистент по обучению. Извлеки информацию из Markdown и создай карточки Вопрос-Ответ. 
          Используй ТОЛЬКО предоставленный текст. Сделай карточки на том языке, на котором написан контент в Markdown, а не на том на котором написан промпт. Верни JSON со следующей структурой: {cards: [{question: '...', answer: '...'}, ...]}.`,
        },
        { role: 'user', content: note },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(
      response.choices[0].message.content ?? 'Something went wrong',
    );
  }

  getCardsDue(userId: number) {
    return this.prisma.card.findMany({
      where: {
        userId: userId,
        nextReview: {
          lte: new Date(),
        },
      },
    });
  }

  async evaluateCard(mark: number, cardId: string, userId: number) {
    let newInterval: number;
    let newReps: number;
    let newEasiness: number;

    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      throw new BadRequestException('Card does not exist');
    }

    if (card.userId !== userId) {
      throw new BadRequestException('Card does not belong to user');
    }

    if (mark >= 3) {
      if (card.reps === 0) {
        newInterval = 1;
      } else if (card.reps === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(card.interval * card.easiness);
      }
      newReps = card.reps + 1;
    } else {
      newReps = 0;
      newInterval = 1;
    }

    newEasiness =
      card.easiness + (0.1 - (5 - mark) * (0.08 + (5 - mark) * 0.02));

    if (newEasiness < 1.3) {
      newEasiness = 1.3;
    }

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return this.prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        reps: newReps,
        interval: newInterval,
        easiness: newEasiness,
        nextReview: nextReview,
      },
    });
  }

  async deleteCard(cardId: string, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    if (!card) {
      throw new BadRequestException('Card does not exist');
    }

    if (card.userId !== userId) {
      throw new BadRequestException('Card does not belong to user');
    }

    return this.prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }

  async editCard(
    question: string,
    answer: string,
    cardId: string,
    userId: number,
  ) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    if (!card) {
      throw new BadRequestException('Card does not exist');
    }

    if (card.userId !== userId) {
      throw new BadRequestException('Card does not belong to user');
    }

    return this.prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        question: question,
        answer: answer,
      },
    });
  }
}
