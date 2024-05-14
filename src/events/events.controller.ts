import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Authenfication")
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return await this.eventsService.create(createEventDto);
    }

    @Get()
    async findAll(): Promise<Event[]> {
        return await this.eventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Event | { message: string }> {

        const eventId = await this.eventsService.findOne(+id)
        if (!eventId) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        return await this.eventsService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEventDto): Promise<Event | { message: string }> {

        const eventId = await this.eventsService.findOne(id)
        if (!eventId) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        await this.eventsService.update(id, data);
        return { message: 'Evènement' + ' ' + id + ' modifiée' }
        
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {

        const eventId = await this.eventsService.findOne(id)
        if (!eventId) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        await this.eventsService.remove(id);
        return { message: 'Evènement' + ' ' + ' supprimé' };
    }
}
