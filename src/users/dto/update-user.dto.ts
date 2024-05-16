import { RoleEnum } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsNotEmpty()
  @IsOptional()
  password?: string;
  @IsOptional()
  refreshToken?: string;
  @IsOptional()
  role?: RoleEnum;
  @IsOptional()
  resetPassToken?: string;
}
