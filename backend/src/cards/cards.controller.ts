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
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CardsService } from './cards.service';
import { deleteCardDto } from './dto/delete-card.dto';
import { editCardDto } from './dto/edit-card.dto';
import { evaluateCardDto } from './dto/evaluate-card.dto';

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
