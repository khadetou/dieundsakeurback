import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePropertyDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsOptional()
  images: string[];

  @IsString()
  @IsOptional()
  video: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsNumber()
  @IsOptional()
  beds: number;

  @IsNumber()
  @IsOptional()
  rooms: number;

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
  @IsNumber()
  @IsOptional()
  baths: number;

  @IsString()
  @IsOptional()
  area: string;
}
