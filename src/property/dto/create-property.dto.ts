import { Optional } from '@nestjs/common';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum STATUS {
  'SELL',
  'RENT',
}
export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  // @IsString()
  // @IsNotEmpty()
  @Optional()
  image?: any;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  beds: number;

  @IsNumber()
  @IsNotEmpty()
  baths: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsNumber()
  @IsOptional()
  area: number;

  @IsString()
  @IsNotEmpty()
  features: string;
}
