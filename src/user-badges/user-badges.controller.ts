/*
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserBadgesService } from './user-badges.service';
import { CreateUserBadgeDto } from './dto/create-user-badge.dto';
import { UpdateUserBadgeDto } from './dto/update-user-badge.dto';
import { UserBadge } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user-badges')
export class UserBadgesController {
    constructor(private readonly userBadgesService: UserBadgesService) { }

    @Post()
    async create(@Body() createUserBadgeDto: CreateUserBadgeDto): Promise<UserBadge> {
        return await this.userBadgesService.create(createUserBadgeDto);
    }

    @Get()
    async findAll(): Promise<UserBadge[]> {
        return await this.userBadgesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserBadge | { message: string }> {

        const userBadgesId = await this.userBadgesService.findOne(+id)
        if (!userBadgesId) {
            throw new HttpException("UserBadge not found", HttpStatus.NOT_FOUND);
        }
        return await this.userBadgesService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserBadgeDto): Promise<UserBadge | { message: string }> {

        const userBadgesId = await this.userBadgesService.findOne(+id)
        if (!userBadgesId) {
            throw new HttpException("userbadge not found", HttpStatus.NOT_FOUND);
        }
        return await this.userBadgesService.update(+id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<UserBadge | { message: string }> {

        const userBadgesId = await this.userBadgesService.findOne(+id)
        if (!userBadgesId) {
            throw new HttpException("UserBadge not found", HttpStatus.NOT_FOUND);
        }
        return await this.userBadgesService.remove(+id);
    }
}
*/