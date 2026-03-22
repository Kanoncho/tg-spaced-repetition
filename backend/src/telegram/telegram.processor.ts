import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';

@Processor('notifications-queue')
export class TelegramProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {
    super();
  }

  async process(job: Job<any, any, string>) {
    const { userId } = job.data;

    const card = await this.prisma.card.findFirst({
      where: {
        userId: Number(userId),
        nextReview: {
          lte: new Date(),
        },
      },
    });

    if (!card) return;

    const question =
      card.question.charAt(0).toLowerCase() + card.question.slice(1);
    const message = `Hey there!\nDo you remember ${question}`;

    this.bot.telegram.sendMessage(userId, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Answer',
              web_app: { url: `https://tsr.kanoncho.online/repeat` },
            },
          ],
        ],
      },
    });
  }
}
