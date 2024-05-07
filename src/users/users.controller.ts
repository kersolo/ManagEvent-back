import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/utils/interfaces/request.interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: RequestWithUser,
  ) {
    const userToUpdate = await this.usersService.findOneById(id);
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (
      (userToUpdate.role === 'SuperAdmin' &&
        request.user.role !== 'SuperAdmin') ||
      (userToUpdate.role === 'Admin' &&
        request.user.role !== 'SuperAdmin' &&
        userToUpdate.id !== request.user.id) ||
      (userToUpdate.role === 'Volunteer' &&
        request.user.role === 'Volunteer' &&
        userToUpdate.id !== request.user.id)
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const userToDelete = await this.usersService.findOneById(id);
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (
      userToDelete.role === 'SuperAdmin' ||
      (userToDelete.role === 'Admin' &&
        request.user.role !== 'SuperAdmin' &&
        userToDelete.id !== request.user.id) ||
      (userToDelete.role === 'Volunteer' &&
        request.user.role === 'Volunteer' &&
        userToDelete.id !== request.user.id)
    ) {
      throw new HttpException(
        'Unauthorized user deletion',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.usersService.remove(id);
  }
}
