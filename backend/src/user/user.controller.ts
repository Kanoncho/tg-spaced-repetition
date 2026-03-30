import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { type User } from 'generated/prisma/client';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @Post('token')
  createToken(@CurrentUser() user: User): Promise<{ token: string }> {
    return this.userService.createToken(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('token')
  getToken(@CurrentUser() user: User): { token: string | null } {
    return { token: user.token };
  }
}
