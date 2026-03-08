import { applyDecorators, UseGuards } from '@nestjs/common';
import { TelegramAuthGuard } from 'src/guards/telegram-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(TelegramAuthGuard));
}
