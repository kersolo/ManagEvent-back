import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
    }

    payload.password = await this.authService.hash(payload.password);

    const newUser = await this.userService.create(payload);

    // todo: envoi mail a payload.email

    return { user: newUser };
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    // check if email exist
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new HttpException('Bad credentials', HttpStatus.FORBIDDEN);
    }

    //compare password

    const isMatch = await this.authService.compare(
      payload.password,
      user.password,
    );

    if (!isMatch) {
      throw new HttpException('Bad credentials', HttpStatus.FORBIDDEN);
    }

    // create token
    const token = await this.authService.createToken(
      { id: user.id, email: payload.email },
      process.env.SECRET_KEY,
      '3h',
    );
    const refreshToken = await this.authService.createToken(
      { id: user.id, email: payload.email },
      process.env.SECRET_REFRESH_KEY,
      '3d',
    );

    await this.userService.update(user.id, { refreshToken });

    return { user, token, refreshToken };
  }
}
