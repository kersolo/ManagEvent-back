import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

    readonly includeDefault = {
        profile: {
            select: {
                firstname: true,
                lastname: true,
                nickname: true,
                avatarPath: true,
                createdAt: true,
                updatedAt: true
            }
        },
        userTaskEvent: {
            select: {
                status: true
            }
        },
        userNotification: {
            select: {
                status: true
            }
        },
        userBadge: {
            select: {
                level: true
            }
        }
    }

    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.prismaService.user.create({
            data: createUserDto
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany({
            orderBy: { createdAt: "desc" },
            include: this.includeDefault

        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: { email }
        });
    }

    async findOneById(id: string): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: { id },
            include: this.includeDefault
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prismaService.user.update({
            where: { id },
            data: { ...updateUserDto },
        });
    }

    async remove(id: string) {
        const deleteUser =  await this.prismaService.user.delete({
            where: { id },
        });
        return {
            statusCode: 200,
            date: new Date().toISOString(),
            data: deleteUser ,
            message: `Success delete ${id}`,
        }
    }
}
