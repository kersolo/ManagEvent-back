import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserBadgeDto {
    
    @ApiProperty()
    @IsNotEmpty()
    userId: string
    
    @ApiProperty()
    @IsNotEmpty()
    taskId: number
    
    @ApiProperty()
    @IsNotEmpty()
    level: number
}
