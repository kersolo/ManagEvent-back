import { ApiProperty } from "@nestjs/swagger";
import { EventStatusEnum } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsString, isString } from "class-validator";

export class CreateEventDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    endDate: string;

   /*
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EventStatusEnum)
    status: EventStatusEnum; 
    */

}
