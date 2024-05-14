import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from '@prisma/client';
@Injectable()
export class NotificationsService {

    readonly includeDefault = {
        userNotification: {
            select: {
                userId: true,
                status : true
            }
        }
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return await this.prismaService.notification.create({
            data: createNotificationDto
        });
    }

    async findAll(): Promise<Notification[]> {
        return await this.prismaService.notification.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault
        });
    }

   async findOne(id: number): Promise<Notification> {
        return await this.prismaService.notification.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

   async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
        return await this.prismaService.notification.update({
            where: { id },
            data: { ...updateNotificationDto}
        });
    }

    async remove(id: number): Promise<Notification>  {
        return  await this.prismaService.notification.delete({
            where: { id }
        });
    }
}
