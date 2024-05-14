import { ApiProperty } from "@nestjs/swagger";
import { UserTaskEventStatusEnum } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateUserTaskEventDto {

    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    taskId: number;

    @ApiProperty()
    @IsNotEmpty()
    eventId: number;

    @ApiProperty()
    @IsNotEmpty()
    status: UserTaskEventStatusEnum;
}
