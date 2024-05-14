import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto  extends PartialType (CreateTaskDto) {

}
