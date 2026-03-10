import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'));
    this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const username = ctx.message?.from.username;

    await ctx.replyWithHTML(`Привет, ${username}`);
  }

  @Command('sayhi')
  async sayHi(@Ctx() ctx: Context) {
    await ctx.replyWithHTML('HI HI HI');
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
