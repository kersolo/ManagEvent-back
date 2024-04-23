import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { CreateUserNotificationDto } from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';

@Controller('user-notifications')
export class UserNotificationsController {
  constructor(private readonly userNotificationsService: UserNotificationsService) {}

  @Post()
  create(@Body() createUserNotificationDto: CreateUserNotificationDto) {
    return this.userNotificationsService.create(createUserNotificationDto);
  }

  @Get()
  findAll() {
    return this.userNotificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userNotificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserNotificationDto: UpdateUserNotificationDto) {
    return this.userNotificationsService.update(+id, updateUserNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userNotificationsService.remove(+id);
  }
}
