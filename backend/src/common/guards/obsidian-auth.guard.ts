import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ObsidianAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const [type, obsidianToken] = (request.headers.authorization ?? '').split(
      ' ',
    );
    if (type !== 'obsidian' || !obsidianToken) {
      throw new UnauthorizedException('Missing token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        token: obsidianToken,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Provided token does not exist');
    }

    request.user = user;

    return true;
  }
}
