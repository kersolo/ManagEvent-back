import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { CreateUserNotificationDto } from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';
import { UserNotification } from '@prisma/client';

@Controller('user-notifications')
export class UserNotificationsController {
    constructor(private readonly userNotificationsService: UserNotificationsService) { }

    @Post()
    async create(@Body() createUserNotificationDto: CreateUserNotificationDto): Promise<UserNotification> {
        return await this.userNotificationsService.create(createUserNotificationDto);
    }

    @Get()
    async findAll(): Promise<UserNotification[]> {
        return await this.userNotificationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserNotification | { message: string }> {

        const UserNotificationId = await this.userNotificationsService.findOne(+id);

        if (!UserNotificationId) {
            return { message: "cette notification de l'user n'existe pas" }
        }
        return await this.userNotificationsService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserNotificationDto: UpdateUserNotificationDto): Promise<UserNotification | { message: string }> {

        const UserNotificationId = await this.userNotificationsService.findOne(+id);

        if (!UserNotificationId) {
            return { message: "userNotif not found" }
        }
        return this.userNotificationsService.update(+id, updateUserNotificationDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string):Promise<UserNotification | { message: string }> {
        const UserNotificationId = await this.userNotificationsService.findOne(+id);

        if (!UserNotificationId) {
            return { message: "cette notification de l'user n'existe pas" }
        }
        await this.userNotificationsService.remove(+id);
        return { message: "userNotif" + " " +id + "supprimée" }
    }
}
