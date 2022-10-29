import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
