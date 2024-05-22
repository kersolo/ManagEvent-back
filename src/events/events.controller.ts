import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/utils/interfaces/request.interfaces';

@ApiBearerAuth() // routes protégées
@UseGuards(AuthGuard)
@ApiTags("Authenfication")
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('create-event')
    async create(@Req() request: RequestWithUser, @Body() createEventDto: CreateEventDto): Promise<{ statusCode: number, date: string, data: Event }> {
        /* const userRole = request.user.role;
         if (userRole === 'Volunteer') {
           throw new HttpException('Unauthorized', 401);
         }*/
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

    @Patch('update-event/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser, @Body() data: UpdateEventDto):Promise<{statusCode:number, date:string, data: Event}> {

        const eventId = await this.eventsService.findOne(id)
        if (!eventId) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        /* const userRole = request.user.role;
               if (userRole === 'Volunteer') {
                   throw new HttpException('Unauthorized', 401);
                 } 
                 */
        return await this.eventsService.update(id, data);
    }

    @Delete('delete-event/:id')
    async delete(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser): Promise<{statusCode:number, date:string, data: Event, message:string}> {
        const eventId = await this.eventsService.findOne(id)
        if (!eventId) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
       /* const userRole = request.user.role;
        if (userRole === 'Volunteer') {
          throw new HttpException('Unauthorized', 401);
        } */
        return await this.eventsService.remove(id);
    }
}
