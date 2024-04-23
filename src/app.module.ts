import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TaskEventsModule } from './task-events/task-events.module';
import { TasksModule } from './tasks/tasks.module';
import { UserNotificationsModule } from './user-notifications/user-notifications.module';
import { UserTaskEventsModule } from './user-task-events/user-task-events.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProfilesModule,
    TasksModule,
    EventsModule,
    NotificationsModule,
    TaskEventsModule,
    UserTaskEventsModule,
    UserNotificationsModule,
    UserTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
