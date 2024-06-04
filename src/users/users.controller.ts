import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    UseGuards,
    // Post,
} from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';



@ApiBearerAuth() // pr dire que les routes st protétgées
@ApiTags("Users")
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.usersService.create(createUserDto);
    // }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.findOneById(id)
        if (!user ) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.usersService.findOneById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        const user = await this.usersService.findOneById(id)
        if (!user ) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.usersService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string):Promise<User> {
        // if user.role (admin ..... a revoir)
        const user = await this.usersService.findOneById(id)
        if (!user ) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.usersService.remove(id);
    }
}
