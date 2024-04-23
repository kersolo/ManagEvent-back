import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskEventDto } from './dto/create-task-event.dto';
import { UpdateTaskEventDto } from './dto/update-task-event.dto';

@Injectable()
export class TaskEventsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskEventDto: CreateTaskEventDto) {
    return 'This action adds a new taskEvent';
  }

  findAll() {
    return `This action returns all taskEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskEvent`;
  }

  update(id: number, updateTaskEventDto: UpdateTaskEventDto) {
    return `This action updates a #${id} taskEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskEvent`;
  }
}
