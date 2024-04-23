import { PartialType } from '@nestjs/swagger';
import { CreateUserTaskEventDto } from './create-user-task-event.dto';

export class UpdateUserTaskEventDto extends PartialType(CreateUserTaskEventDto) {}
