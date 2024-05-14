import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { Notification } from '@prisma/client';
@ApiTags("Notifications")
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return await this.notificationsService.create(createNotificationDto);
    }

    @Get()
    async findAll(): Promise<Notification[]> {
        return await this.notificationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<Notification> | { message: string }> {

        const notifId = await this.notificationsService.findOne(id)
        if (!notifId) {
            throw new HttpException("Notification not found", HttpStatus.NOT_FOUND);
        }
        return await this.notificationsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateNotificationDto): Promise<Notification | { message: string }> {
        const notifId = await this.notificationsService.findOne(id)
        if (!notifId) {
            throw new HttpException("Notification not found", HttpStatus.NOT_FOUND);
        }
        await this.notificationsService.update(id, data);
        return { message: "Notification updted" };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<Notification | { message: string }> {

        const notificationId = await this.notificationsService.findOne(id)
        if (!notificationId) {
            throw new HttpException("Notification not found", HttpStatus.NOT_FOUND);
        }
        await this.notificationsService.remove(id);
        return { message: "Notification" + " " + id + " deleted" };
    }

}
