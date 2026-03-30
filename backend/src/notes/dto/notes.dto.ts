import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class NoteDto {
  @IsString({ message: 'Path must be a string' })
  @IsNotEmpty({ message: 'Path is required' })
  path: string;

  @IsString({ message: 'Content must be a string' })
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
