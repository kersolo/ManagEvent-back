import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(RoleEnum)
    role?: RoleEnum;

}
