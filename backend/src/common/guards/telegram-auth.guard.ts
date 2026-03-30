import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parse, validate } from '@telegram-apps/init-data-node';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  private readonly botToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.botToken = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const [type, data] = (request.headers.authorization ?? '').split(' ');

    if (type !== 'tma' || !data) {
      throw new UnauthorizedException('Missing initData');
    }

    try {
      validate(data, this.botToken);

      const tgUser = parse(data).user;

      if (!tgUser) {
        throw new UnauthorizedException('User data is missing in initData');
      }

      let user = await this.prisma.user.findUnique({
        where: {
          id: tgUser.id,
        },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            id: tgUser.id,
          },
        });
      }

      request.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid initData');
    }
  }
}
