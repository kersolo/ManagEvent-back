import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordRequest {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
