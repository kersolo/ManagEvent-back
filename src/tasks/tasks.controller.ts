import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksService.create(createTaskDto);
    }

    @Get()
    async findAll(): Promise<Task[]>  {
        return await this.tasksService.findAll();
    }

    @Get(':id')
   async findOne(@Param('id') id: string): Promise<Task | { message: string }> {

        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            return { message: "Cette tâche n'existe pas" }
        }
        return this.tasksService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task | { message: string }> {

        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            return { message: "Cette tâche n'existe pas" }
        }
        return await this.tasksService.update(+id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        
        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            return { message: "Cette tâche n'existe pas" }
        }
        await this.tasksService.remove(+id);
        return { message: "Tâche supprimée" }
    }
}
