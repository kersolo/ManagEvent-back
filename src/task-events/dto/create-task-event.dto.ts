import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTaskEventDto {

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
    @IsNumber()
    volunteerNumber: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    needValidation: boolean;
}
