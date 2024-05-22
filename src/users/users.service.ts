import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async findOneById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
