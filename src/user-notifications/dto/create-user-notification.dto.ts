import { ApiProperty } from "@nestjs/swagger"
import { UserNotificationStatusEnum } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateUserNotificationDto {


    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    notificationId: number

    @ApiProperty()
    @IsNotEmpty()
    status: UserNotificationStatusEnum
}
