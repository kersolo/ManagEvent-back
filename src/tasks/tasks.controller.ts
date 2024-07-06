import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/utils/interfaces/request.interfaces';

//@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Req() request: RequestWithUser): Promise<Task> {

        const { name } = createTaskDto
        const userRole = request.user.role
        const userId = request.user.id

        if (!userId) {
            throw new HttpException("Utilisateur introuvable", HttpStatus.NOT_FOUND);
        }

        if (userRole === 'Volunteer') {
            throw new HttpException("Vous n'avez pas les droits", HttpStatus.UNAUTHORIZED);
        }
        
        const existingTask = await this.tasksService.findOneByName(name)

        if (existingTask) {
            throw new HttpException("La Tâche existe déja ", HttpStatus.CONFLICT);
        }
        return await this.tasksService.create(createTaskDto, userId);
    }
  
    @Get()
    async findAll(): Promise<Task[]> {
        return await this.tasksService.findAll();
    }

    @Get('find-by-name/:name')
    async findOneByName(@Param('name') name: string): Promise<Task> {

        const existingTask = await this.tasksService.findOneByName(name)
        if (!existingTask) {
            throw new HttpException("La Tâche est introuvable ", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.findOneByName(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {

        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("La Tâche est introuvable ", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("La Tâche est introuvable", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.update(+id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Task> {
        const existingTask = await this.tasksService.findOne(+id)
        if (!existingTask) {
            throw new HttpException("TLa Tâche est introuvable", HttpStatus.NOT_FOUND);
        }
        return await this.tasksService.remove(+id);
    }
}
