import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNotificationDto {

    @ApiProperty()
    @IsNotEmpty()
    content: string
    
}
