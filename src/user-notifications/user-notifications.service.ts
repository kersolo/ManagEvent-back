import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserNotificationDto } from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';
import { UserNotification } from '@prisma/client';


@Injectable()
export class UserNotificationsService {

    readonly includeDefault = {
        user: true,
        notification: true
    }
    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserNotificationDto: CreateUserNotificationDto): Promise<UserNotification> {
        return await this.prismaService.userNotification.create({
            data: createUserNotificationDto
        });
    }

    async findAll(): Promise<UserNotification[]> {
        return await this.prismaService.userNotification.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault
        });
    }

    async findOne(id: number): Promise<UserNotification> {
        return await this.prismaService.userNotification.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

    async update(id: number, updateUserNotificationDto: UpdateUserNotificationDto): Promise<UserNotification> {
        return await this.prismaService.userNotification.update({
            where: { id },
            data: { ...updateUserNotificationDto }
        });
    }

   async remove(id: number): Promise<UserNotification> {
       return await this.prismaService.userNotification.delete({
            where: { id }
        });
    }
}
