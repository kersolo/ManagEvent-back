import { IsEmail, IsNotEmpty, IsOptional, isEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  refreshToken?: string;
}
