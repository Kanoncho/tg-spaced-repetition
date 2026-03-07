import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string;

  constructor(private readonly configService: ConfigService) {
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
}
