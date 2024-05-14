import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserTaskEventsService } from './user-task-events.service';
import { CreateUserTaskEventDto } from './dto/create-user-task-event.dto';
import { UpdateUserTaskEventDto } from './dto/update-user-task-event.dto';
import { UserTaskEvent } from '@prisma/client';
@Controller('user-task-events')
export class UserTaskEventsController {
    constructor(private readonly userTaskEventsService: UserTaskEventsService) { }

    @Post()
    async create(@Body() createUserTaskEventDto: CreateUserTaskEventDto): Promise<UserTaskEvent> {
        return await this.userTaskEventsService.create(createUserTaskEventDto);
    }

    @Get()
    async findAll(): Promise<UserTaskEvent[]> {
        return await this.userTaskEventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserTaskEvent | { message: string }> {

        const UserTaskEventId = await this.userTaskEventsService.findOne(+id)
        if (!UserTaskEventId) {
            throw new HttpException("UserTaskEventnot found", HttpStatus.NOT_FOUND);
        }
        return await this.userTaskEventsService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserTaskEventDto: UpdateUserTaskEventDto): Promise<UserTaskEvent | { message: string }> {

        const UserTaskEventId = await this.userTaskEventsService.findOne(+id)
        if (!UserTaskEventId) {
            throw new HttpException("UserTaskEventnot found", HttpStatus.NOT_FOUND);
        }
        return this.userTaskEventsService.update(+id, updateUserTaskEventDto);
    }

    @Delete(':id')
     async delete (@Param('id') id: string): Promise<UserTaskEvent | { message: string }>  {

        const UserTaskEventId = await this.userTaskEventsService.findOne(+id)
        if (!UserTaskEventId) {
            throw new HttpException("UserTaskEventnot found", HttpStatus.NOT_FOUND);
        }
        await this.userTaskEventsService.remove(+id);
        return {message:"UserTaskEvent deleted"}
    }
}
