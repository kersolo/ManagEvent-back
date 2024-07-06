import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from '@prisma/client';


@Injectable()
export class ProfilesService {

    constructor(private readonly prismaService: PrismaService) { }

    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        return await this.prismaService.profile.create({
            data: createProfileDto
        });
    }

    async findAll(): Promise<Profile[]> {
        return await this.prismaService.profile.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: true
            }
        });
    }

    async findOne(userId: string): Promise<Profile> {
        return this.prismaService.profile.findUnique({
            where: { userId },
         //   include: {
            //    user: true
         //   }
        });
    }

    async update(userId: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        return await this.prismaService.profile.update({
            where: { userId },
            data: { ...updateProfileDto }
        });
    }

    async remove(userId: string): Promise<Profile> {
        return this.prismaService.profile.delete({
            where: { userId }
        });
    }
}
