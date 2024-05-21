import { ApiProperty } from "@nestjs/swagger"
import { UserNotificationStatusEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserNotificationDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    notificationId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserNotificationStatusEnum)
    status: UserNotificationStatusEnum;
}
