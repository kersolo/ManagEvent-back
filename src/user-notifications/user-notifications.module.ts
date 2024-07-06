import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserNotificationsController } from './user-notifications.controller';
import { UserNotificationsService } from './user-notifications.service';

@Module({
  imports: [PrismaModule],
   controllers: [UserNotificationsController],
  providers: [UserNotificationsService],
})
export class UserNotificationsModule { }
