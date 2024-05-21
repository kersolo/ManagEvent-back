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
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'utils/interfaces/request';

@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(
    @Req() request: RequestWithUser,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    const userRole = request.user.role;
    if (userRole === 'Volunteer') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: RequestWithUser,

    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const userRole = request.user.role;
    if (userRole === 'Volunteer') {
      throw new HttpException('Unauthorized', 401);
    }
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ): Promise<Event> {
    const userRole = request.user.role;
    if (userRole === 'Volunteer') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.eventsService.remove(+id);
  }
}
