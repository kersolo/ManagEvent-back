import { ApiProperty } from '@nestjs/swagger';
import { UserStatusEnum } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    refreshToken?: string;

    /*@ApiProperty()
    @IsOptional()
    status: UserStatusEnum*/
}
