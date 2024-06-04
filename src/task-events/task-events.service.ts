/*import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskEventDto } from './dto/create-task-event.dto';
import { UpdateTaskEventDto } from './dto/update-task-event.dto';
import { TaskEvent } from '@prisma/client';

@Injectable()
export class TaskEventsService {
     
    readonly includeDefault = {
        task: true,
        event: true
    }

    constructor(private readonly prismaService: PrismaService) { }

  async  create(createTaskEventDto: CreateTaskEventDto): Promise<TaskEvent> {
      return await this.prismaService.taskEvent.create({
            data: createTaskEventDto
        });
    }

   async  findAll(): Promise<TaskEvent[]> {
        return await this.prismaService.taskEvent.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault
        });
    }

  async findOne(id: number): Promise<TaskEvent> {
        return  await this.prismaService.taskEvent.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

   async update(id: number, updateTaskEventDto: UpdateTaskEventDto): Promise<TaskEvent> {
       return await this.prismaService.taskEvent.update({
           where: { id },
           data: { ...updateTaskEventDto}
        });
    }

   async remove(id: number): Promise<TaskEvent> {
       return await this.prismaService.taskEvent.delete({
            where: {id}
        });
    }
}*/
