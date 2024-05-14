import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Profile } from '@prisma/client';

@ApiTags("Profiles")
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
    async update(@Param('id') id: string, @Body() data: UpdateProfileDto): Promise<Profile | { message: string }> {
        await this.profilesService.update(id, data);
        return { message: "Profile modifié avec succès" };
    }

    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<Profile | { message: string }> {

        const userIdProfile = await this.findOne(userId)
        if (!userIdProfile) {
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        }
        await this.profilesService.remove(userId);
        return { message: "Le profil de l'utilisateur " + " " + userId + " a bien été supprimé " };
    }
}
