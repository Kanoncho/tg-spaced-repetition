import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { type User } from '@telegram-apps/init-data-node';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { evaluateCardDto } from 'src/dto/cards/evaluate-card.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('due')
  getCardsDue(@CurrentUser() user: User) {
    return this.cardsService.getCardsDue(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Patch('evaluate')
  evaluateCard(@Body() body: evaluateCardDto, @CurrentUser() user: User) {
    return this.cardsService.evaluateCard(body.mark, body.cardId, user.id);
  }
}
