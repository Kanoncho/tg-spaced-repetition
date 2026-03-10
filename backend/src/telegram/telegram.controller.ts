import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { type User } from 'generated/prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TelegramService } from './telegram.service';

@Controller('/telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @Post('/token')
  createToken(@CurrentUser() user: User): Promise<string> {
    return this.telegramService.createToken(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('/token')
  getToken(@CurrentUser() user: User): string | null {
    return user.token;
  }
}
