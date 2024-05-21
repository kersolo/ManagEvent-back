import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserBadgeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    taskId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    level: number
}
