import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum Agent {
  'MALE',
  'FEMALE',
}

export class UpdateAgentDto {
  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Agent)
  @IsString()
  @IsOptional()
  gender: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  youtube: string;

  @IsOptional()
  @IsString()
  facebook: string;

  @IsOptional()
  @IsString()
  linkedin: string;

  @IsOptional()
  @IsString()
  instagram: string;
}
