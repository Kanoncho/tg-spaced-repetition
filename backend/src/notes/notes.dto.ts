import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  content: string;

  @IsNumber()
  mtime: number;
}

export class NotesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];
}
