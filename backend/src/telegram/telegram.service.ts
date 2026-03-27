import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';

@Update()
@Injectable()
export class TelegramService {
  private readonly _token: string;

  constructor(
    @InjectQueue('notifications-queue')
    private readonly notificationsQueue: Queue,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {
    this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const username = ctx.message?.from.username;
    const userId = ctx.message?.from.id;

    await this.notificationsQueue.upsertJobScheduler(
      `notification-scheduler-${userId}`,
      { pattern: '11 14 * * *' },
      {
        name: 'notification-job',
        data: { userId: userId },
        opts: {
          backoff: 3,
          attempts: 5,
          removeOnFail: 1000,
        },
      },
    );

    await ctx.replyWithHTML(`Привет, ${username}`);
  }

  @Action(/^answer:(.+)$/)
  async showAnswer(@Ctx() ctx: Context) {
    ctx.answerCbQuery();
    const callbackData = (ctx.callbackQuery as any).data;
    const cardId = callbackData.split(':')[1];

    const card = await this.prisma.card.findUnique({ where: { id: cardId } });

    if (!card) {
      return ctx.editMessageText('Card was not found');
    }

    await ctx.editMessageText(
      `Вопрос: ${card.question}\n\n<b>Ответ:</b> ${card.answer}`,
      { parse_mode: 'HTML' },
    );
  }

  async notifySucessfullSync(userId: number, notesAmount: number) {
    const message = `Hey, some of your notes were sucessfully synchronized! Notes synchronized: ${notesAmount} `;

    this.bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' });
  }

  async createToken(userId: number) {
    const token = uuidv4();

    const result = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: token,
      },
      select: {
        token: true,
      },
    });

    return { token: result.token! };
  }

  async getToken(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        token: true,
      },
    });
  }
}
