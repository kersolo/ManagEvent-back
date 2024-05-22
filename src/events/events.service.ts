import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
@Injectable()
export class EventsService {

    readonly includeDefault = {
        taskEvent: {
            select: {
                taskId: true,
                volunteerNumber: true,
                needValidation: true,
            }
        },
        userTaskEvent: {
            select: {
                userId: true,
                status: true,
            }
        }
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createEventDto: CreateEventDto): Promise< { statusCode:number, date: string, data: Event }> {
        const createData = await this.prismaService.event.create({
            data: createEventDto
        });
        return {
            statusCode: 200,
            date: new Date().toISOString(),
            data: createData 
        }
    }

    async findAll(): Promise<Event[]> {
        return await this.prismaService.event.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault
        });
    }

    async findOne(id: number): Promise<Event> {
        return await this.prismaService.event.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

    async update(id: number, updateEventDto: UpdateEventDto){
        const editData = await this.prismaService.event.update({
            where: { id },
            data: { ...updateEventDto }
        });
        return  {
            statusCode: 200,
            date: new Date().toISOString(),
            data: editData
        }
    }

    async remove(id: number){
        const deleteTask = await this.prismaService.event.delete({
            where: { id }
        });
        return {
            statusCode: 200,
            date: new Date().toISOString(),
            data: deleteTask,
            message: `Success delete ${id}`,
        }
    }
}
