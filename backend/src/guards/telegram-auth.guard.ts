import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from '@telegram-apps/init-data-node';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  private readonly botToken: string;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const [type, data] = (request.headers.authorization ?? '').split(' ');

    if (type !== 'tma' || !data) {
      throw new UnauthorizedException('Missing initData');
    }

    try {
      validate(data, this.botToken);

      const urlParams = new URLSearchParams(data);
      const userRaw = urlParams.get('user');

      if (!userRaw) {
        throw new UnauthorizedException('User data is missing in initData');
      }

      request.user = JSON.parse(userRaw);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid initData');
    }
  }
}
