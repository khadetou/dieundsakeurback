import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthUpdateCredentialsDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsOptional()
  @IsString()
  agencename: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  role: string;
}
