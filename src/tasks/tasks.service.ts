import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {

    readonly includeDefault = {
        taskEvent: true,
        userTaskEvent: true,
        userBadge: true,
        user: true
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        return await this.prismaService.task.create({
            data: {
                ...createTaskDto,
                userId: userId
            }
        });
    }
    
    async findAll(): Promise<Task[]> {
        return await this.prismaService.task.findMany({
            orderBy: { createdAt: "desc" },
           // include: this.includeDefault
        });
    }

    async findOneByName(name: string): Promise<Task> {
        return await this.prismaService.task.findUnique({
            where: { name },
            include: this.includeDefault
        });
    }

    async findOne(id: number): Promise<Task> {
        return await this.prismaService.task.findUnique({
            where: { id },
           // include: this.includeDefault
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return await this.prismaService.task.update({
            where: { id },
            data: { ...updateTaskDto }
        });
    }

    async remove(id: number): Promise<Task> {
        return await this.prismaService.task.delete({
            where: { id }
        });
    }
}
