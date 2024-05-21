import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksService.create(createTaskDto);
    }
    /**
     *  @Post()
  async create(
    @Req() request: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ):  Promise<Task> {
    const userRole = request.user.role;
    if (userRole === 'Volunteer') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.tasksService.create(createTaskDto);
  }
     */
    @Get()
    async findAll(): Promise<Task[]> {
        return await this.tasksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {

        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task> {
        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.update(+id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Task> {
        const TaskId = await this.tasksService.findOne(+id)
        if (!TaskId) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.remove(+id);
    }
}
