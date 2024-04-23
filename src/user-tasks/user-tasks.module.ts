import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserTasksController } from './user-tasks.controller';
import { UserTasksService } from './user-tasks.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserTasksController],
  providers: [UserTasksService],
})
export class UserTasksModule {}
