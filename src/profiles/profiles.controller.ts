import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags("Profiles")
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {

    constructor(private readonly profilesService: ProfilesService) { }

    @Post()
    async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
        return await this.profilesService.create(createProfileDto);
    }

    @Get()
    async findAll(): Promise<Profile[]> {
        return await this.profilesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id',) userId: string): Promise<Profile> {
        return await this.profilesService.findOne(userId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateProfileDto): Promise<Profile> {
        return await this.profilesService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<Profile> {
        const userIdProfile = await this.findOne(userId)
        if (!userIdProfile) {
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        }
        return await this.profilesService.remove(userId);
    }
}
