import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';

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

    await ctx.replyWithHTML(
      `Hello, ${username}!\nReady to configure the bot?`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Configuration',
                web_app: { url: `https://tsr.kanoncho.online/configuration` },
              },
            ],
          ],
        },
      },
    );
  }

  async notifySucessfullSync(userId: number, notesAmount: number) {
    const message = `Hey, some of your notes were sucessfully synchronized! Notes synchronized: ${notesAmount} `;

    this.bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' });
  }
}
