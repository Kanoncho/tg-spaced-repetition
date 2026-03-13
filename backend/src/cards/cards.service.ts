import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class CardsService {
  constructor(@Inject('OPENAI_CLIENT') private readonly openai: OpenAI) {}

  async generateCards(note: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Ты — ассистент по обучению. Извлеки информацию из Markdown и создай карточки Вопрос-Ответ. 
          Используй ТОЛЬКО предоставленный текст. Верни JSON со следующей структурой: {cards: [{question: '...', answer: '...'}, ...]}.`,
        },
        { role: 'user', content: note },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(
      response.choices[0].message.content ?? 'Something went wrong',
    );
  }
}
