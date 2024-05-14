import { Injectable } from '@nestjs/common';
import { CreateUserBadgeDto } from './dto/create-user-badge.dto';
import { UpdateUserBadgeDto } from './dto/update-user-badge.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UserBadge } from '@prisma/client';

@Injectable()
export class UserBadgesService {

    readonly includeDefault = {
        user: {
            select: {
                email: true,
                role: true
            }
        },
        task: {
            select: {
                description: true,
                skillName: true,
                skillBadgePath: true
            }
        }
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserBadgeDto: CreateUserBadgeDto): Promise<UserBadge> {
        return await this.prismaService.userBadge.create({
            data: createUserBadgeDto
        });
    }

    async findAll(): Promise<UserBadge[]> {
        return await this.prismaService.userBadge.findMany({
            include: this.includeDefault
        });
    }

    async findOne(id: number): Promise<UserBadge> {
        return await this.prismaService.userBadge.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

    async update(id: number, updateUserBadgeDto: UpdateUserBadgeDto): Promise<UserBadge> {
        return await this.prismaService.userBadge.update({
            where: { id },
            data: updateUserBadgeDto
        });
    }

  async remove(id: number):Promise<UserBadge> {
      return this.prismaService.userBadge.delete({
            where: { id }
        });
    }
}
