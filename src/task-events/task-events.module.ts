import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskEventsController } from './task-events.controller';
import { TaskEventsService } from './task-events.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskEventsController],
  providers: [TaskEventsService],
})
export class TaskEventsModule {}
