import { ApiProperty } from "@nestjs/swagger";
import { UserTaskEventStatusEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserTaskEventDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    taskId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserTaskEventStatusEnum)
    status: UserTaskEventStatusEnum;
}
