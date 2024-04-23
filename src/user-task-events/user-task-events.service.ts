import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserTaskEventDto } from './dto/create-user-task-event.dto';
import { UpdateUserTaskEventDto } from './dto/update-user-task-event.dto';

@Injectable()
export class UserTaskEventsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserTaskEventDto: CreateUserTaskEventDto) {
    return 'This action adds a new userTaskEvent';
  }

  findAll() {
    return `This action returns all userTaskEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTaskEvent`;
  }

  update(id: number, updateUserTaskEventDto: UpdateUserTaskEventDto) {
    return `This action updates a #${id} userTaskEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTaskEvent`;
  }
}
