import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { request } from 'http';
import { RequestWithUser } from 'src/utils/interfaces/request.interfaces';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService, private readonly userService: UsersService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Req() request: RequestWithUser): Promise<Task> {

        const { name } = createTaskDto
        const userRole = request.user.role
        const userId = request.user.id
        //  console.log("🚀 ~ TasksController ~ create ~ userid:", userId)
        if (!userId) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        if (userRole === 'Volunteer') {
            throw new HttpException("Vous n'avez pas les droits", HttpStatus.UNAUTHORIZED);
        }
        
        const existingTask = await this.tasksService.findOneByTitle(name)

        if (existingTask) {
            throw new HttpException("Task already exist", HttpStatus.CONFLICT);
        }
        return await this.tasksService.create(createTaskDto, userId);
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

    @Get('find-by-name/:name')
    async findOneByTitle(@Param('name') name: string): Promise<Task> {

        const existingTask = await this.tasksService.findOneByTitle(name)
        if (!existingTask) {
            throw new HttpException("Task not found ", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.findOneByTitle(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {

        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.update(+id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Task> {
        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.remove(+id);
    }
}
