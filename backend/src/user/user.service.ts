import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
