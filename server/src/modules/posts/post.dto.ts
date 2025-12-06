import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageURL?: string;
}

export class LikePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
