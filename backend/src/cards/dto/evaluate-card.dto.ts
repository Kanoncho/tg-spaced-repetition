import { IsInt, IsString, Max, Min } from 'class-validator';

export class evaluateCardDto {
  @IsInt()
  @Min(0)
  @Max(5)
  mark: number;

  @IsString()
  cardId: string;
}
