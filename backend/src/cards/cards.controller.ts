import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { type User } from '@telegram-apps/init-data-node';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { deleteCardDto } from 'src/dto/cards/delete-card.dto';
import { editCardDto } from 'src/dto/cards/edit-card.dto';
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

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Patch('edit')
  edit(@Body() body: editCardDto, @CurrentUser() user: User) {
    return this.cardsService.editCard(
      body.question,
      body.answer,
      body.cardId,
      user.id,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete('delete')
  delete(@Body() body: deleteCardDto, @CurrentUser() user: User) {
    return this.cardsService.deleteCard(body.cardId, user.id);
  }
}
