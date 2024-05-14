import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEventDto {
    

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    adress : string;

    @ApiProperty()
    @IsNotEmpty()
    startDate: string;
    
    @ApiProperty()
    @IsNotEmpty()
    endDate : string;

}
