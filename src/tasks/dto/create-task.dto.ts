import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    skillName?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    skillBadgePath?: string;
}
