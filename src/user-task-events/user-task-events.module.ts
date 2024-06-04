import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
//import { UserTaskEventsController } from './user-task-events.controller';
//import { UserTaskEventsService } from './user-task-events.service';

@Module({
  imports: [PrismaModule],
 // controllers: [UserTaskEventsController],
  providers: [/*UserTaskEventsService*/],
})
export class UserTaskEventsModule {}
