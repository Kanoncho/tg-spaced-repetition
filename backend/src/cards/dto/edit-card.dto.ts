import { IsString } from 'class-validator';

export class editCardDto {
  @IsString({ message: 'Question must be a string' })
  question: string;

  @IsString({ message: 'Answer must be a string' })
  answer: string;

  @IsString({ message: 'Card id must be a string' })
  cardId: string;
}
