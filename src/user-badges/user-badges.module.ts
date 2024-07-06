import { Module } from '@nestjs/common';
import { UserBadgesService } from './user-badges.service';
import { UserBadgesController } from './user-badges.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
controllers: [UserBadgesController],
  providers: [UserBadgesService],
})
export class UserBadgesModule { }
