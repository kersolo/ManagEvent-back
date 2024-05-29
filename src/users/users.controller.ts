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
import { RequestWithUser } from 'src/utils/interfaces/request';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    if (request.user.role === 'Volunteer' && request.user.id !== id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findOneById(id);
  }

  @Get()
  async findOneByToken(@Req() request: RequestWithUser) {
    return await this.usersService.findOneById(request.user.id);
  }

  @Patch(':id')
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
      (updateUserDto.role && request.user.role !== 'SuperAdmin') ||
      (updateUserDto.refreshToken && request.user.id !== id) ||
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
