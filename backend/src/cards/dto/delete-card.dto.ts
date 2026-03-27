import { IsString } from 'class-validator';

export class deleteCardDto {
  @IsString({ message: 'Card id must be a string' })
  cardId: string;
}
