import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskEventsService } from './task-events.service';
import { CreateTaskEventDto } from './dto/create-task-event.dto';
import { UpdateTaskEventDto } from './dto/update-task-event.dto';

@Controller('task-events')
export class TaskEventsController {
  constructor(private readonly taskEventsService: TaskEventsService) {}

  @Post()
  create(@Body() createTaskEventDto: CreateTaskEventDto) {
    return this.taskEventsService.create(createTaskEventDto);
  }

  @Get()
  findAll() {
    return this.taskEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskEventDto: UpdateTaskEventDto) {
    return this.taskEventsService.update(+id, updateTaskEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskEventsService.remove(+id);
  }
}
