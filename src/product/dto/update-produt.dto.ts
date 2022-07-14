import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  @Optional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  countInStock: number;
}
