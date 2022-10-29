import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyDto {
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
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
  beds: number;

  @IsNumber()
  @IsOptional()
  area: number;

  @IsString()
  @IsNotEmpty()
  features: string;
}
