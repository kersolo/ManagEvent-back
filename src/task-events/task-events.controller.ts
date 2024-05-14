import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskEventsService } from './task-events.service';
import { CreateTaskEventDto } from './dto/create-task-event.dto';
import { UpdateTaskEventDto } from './dto/update-task-event.dto';
import { TaskEvent } from '@prisma/client';

@Controller('task-events')
export class TaskEventsController {
    constructor(private readonly taskEventsService: TaskEventsService) { }

    @Post()
    async create(@Body() createTaskEventDto: CreateTaskEventDto): Promise<TaskEvent> {
        return await this.taskEventsService.create(createTaskEventDto);
    }

    @Get()
    async findAll(): Promise<TaskEvent[]> {
        return await this.taskEventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEvent> {
        return await this.taskEventsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskEventDto: UpdateTaskEventDto): Promise<TaskEvent | { message: string }> {

        const TaskEventId = await this.taskEventsService.findOne(id)
        if (!TaskEventId) {
            return { message: "Cette mission ne peut être modifiée car elle n'existe pas" }
        }
        return await this.taskEventsService.update(id, updateTaskEventDto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        await this.taskEventsService.remove(id)
        return { message: "Mission supprimée" }
    }
}
