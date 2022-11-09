import { Optional } from '@nestjs/common';
import {
  IsBoolean,
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
  region: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @Optional()
  images: string[];

  @IsString()
  @Optional()
  video: string;

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
  rooms: number;

  @IsNumber()
  @IsNotEmpty()
  baths: number;
  @IsBoolean()
  @IsOptional()
  emergencyexit: boolean;
  @IsBoolean()
  @IsOptional()
  cctv: boolean;
  @IsBoolean()
  @IsOptional()
  internet: boolean;
  @IsBoolean()
  @IsOptional()
  parking: boolean;
  @IsBoolean()
  @IsOptional()
  airconditioning: boolean;
  @IsBoolean()
  @IsOptional()
  securityguard: boolean;
  @IsBoolean()
  @IsOptional()
  terrace: boolean;
  @IsBoolean()
  @IsOptional()
  laundry: boolean;
  @IsBoolean()
  @IsOptional()
  elevator: boolean;
  @IsBoolean()
  @IsOptional()
  balcony: boolean;
  @IsBoolean()
  @IsOptional()
  pool: boolean;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  area: string;
}
