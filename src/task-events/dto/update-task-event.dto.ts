import { PartialType } from '@nestjs/swagger';
import { CreateTaskEventDto } from './create-task-event.dto';

export class UpdateTaskEventDto extends PartialType(CreateTaskEventDto) {}
