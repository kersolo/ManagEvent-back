import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTaskEventsService } from './user-task-events.service';
import { CreateUserTaskEventDto } from './dto/create-user-task-event.dto';
import { UpdateUserTaskEventDto } from './dto/update-user-task-event.dto';

@Controller('user-task-events')
export class UserTaskEventsController {
  constructor(private readonly userTaskEventsService: UserTaskEventsService) {}

  @Post()
  create(@Body() createUserTaskEventDto: CreateUserTaskEventDto) {
    return this.userTaskEventsService.create(createUserTaskEventDto);
  }

  @Get()
  findAll() {
    return this.userTaskEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTaskEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTaskEventDto: UpdateUserTaskEventDto) {
    return this.userTaskEventsService.update(+id, updateUserTaskEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTaskEventsService.remove(+id);
  }
}
