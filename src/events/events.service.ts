import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
@Injectable()
export class EventsService {

    readonly includeDefault = {
        taskEvent: true,
        userTaskEvent: true
    }
    
    constructor(private readonly prismaService: PrismaService) { }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        return await this.prismaService.event.create({
            data: createEventDto
        });
    }

    async findAll(): Promise<Event[]> {
        return await this.prismaService.event.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault,

        });
    }

    async findOneByTitle(title: string): Promise<Event> {
        return await this.prismaService.event.findUnique({
            where: { title },
            include: this.includeDefault
        });
    }

    async findOne(id: number): Promise<Event> {
        return await this.prismaService.event.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

    async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
        return await this.prismaService.event.update({
            where: { id },
            data: { ...updateEventDto }
        });
        /*{
            statusCode: 200,
            date: new Date().toISOString(),
            message: `Success update ${id}`,
            data: editData

        }*/
    }

    async remove(id: number): Promise<Event> {
        return await this.prismaService.event.delete({
            where: { id }
        });
    }
}