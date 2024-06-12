import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserTaskEventsService } from './user-task-events.service';
import { CreateUserTaskEventDto } from './dto/create-user-task-event.dto';
import { UpdateUserTaskEventDto } from './dto/update-user-task-event.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user-task-events')
export class UserTaskEventsController {
  constructor(private readonly userTaskEventsService: UserTaskEventsService) {}

  @Post()
  async create(@Body() createUserTaskEventDto: CreateUserTaskEventDto) {
    return await this.userTaskEventsService.create(createUserTaskEventDto);
  }

  @Get()
  findAll() {
    return this.userTaskEventsService.findAll();
  }

  @Get()
  findOne(id: string) {
    return this.userTaskEventsService.findOne(+id);
  }

  @Patch()
  async update(
    @Param() userId: string,
    taskId: number,
    eventId: number,
    @Body() updateUserTaskEventDto: UpdateUserTaskEventDto,
  ) {
    return await this.userTaskEventsService.update(
      userId,
      taskId,
      eventId,
      updateUserTaskEventDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') eventId: number,
    @Req() request: any,
    taskId: number,
  ) {
    return await this.userTaskEventsService.remove(
      request.user.id,
      taskId,
      eventId,
    );
  }
}
