/*import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserTaskEventDto } from './dto/create-user-task-event.dto';
import { UpdateUserTaskEventDto } from './dto/update-user-task-event.dto';
import { UserTaskEvent } from '@prisma/client';

@Injectable()
export class UserTaskEventsService {

    readonly includeDefault = {
        user: true,
        task: true,
        event: true
    
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserTaskEventDto: CreateUserTaskEventDto): Promise<UserTaskEvent> {
        return await this.prismaService.userTaskEvent.create({
            data: createUserTaskEventDto
        });
    }

    async findAll(): Promise<UserTaskEvent[]> {
        return await this.prismaService.userTaskEvent.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault
        });
    }

   async findOne(id: number): Promise<UserTaskEvent> {
       return this.prismaService.userTaskEvent.findUnique({
           where: { id },
           include: this.includeDefault
        });
    }

  async update(id: number, updateUserTaskEventDto: UpdateUserTaskEventDto): Promise<UserTaskEvent> {
      return await this.prismaService.userTaskEvent.update({
          where: { id },
          data: { ...updateUserTaskEventDto}
        });
    }

  async remove(id: number): Promise<UserTaskEvent> {
    return await this.prismaService.userTaskEvent.delete({
          where: {id }
      });
    }
}*/
