import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthRefreshGuard } from './guards/refresh.guard';
import { User } from '@prisma/client';
import { RequestWithRefresh, RequestWithUser } from 'src/utils/interfaces/request.interfaces';
import { ResetPasswordRequest } from './dto/resetPasswordRequest.dto';
import * as speakeasy from "speakeasy";
import { ResetPassword } from './dto/resetPassword.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Authenfication")
@Controller('auth')
export class AuthController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() payload: RegisterDto) {

        const user = await this.usersService.findOneByEmail(payload.email);
        if (user) {
            throw new HttpException('User already exists, please login', HttpStatus.FORBIDDEN);
        }
        payload.password = await this.authService.hash(payload.password);

        const newUser = await this.usersService.create(payload);
        // todo: envoi mail a payload.email
        await this.authService.sendMailRegistration(payload.email);

        return { user: newUser };
    }

    @Post('login')
    async login(@Body() payload: LoginDto) {
        // check if email exist
        const user = await this.usersService.findOneByEmail(payload.email);

        if (!user) {
            throw new HttpException('Bad credentials', HttpStatus.FORBIDDEN);
        }
        //compare password
        const isMatch = await this.authService.compare(
            payload.password,
            user.password,
        );

        if (!isMatch) {
            throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);
        }
        // create token
        const token = await this.authService.createToken(
            { id: user.id, email: payload.email, role: user.role },
            process.env.SECRET_KEY,
            '3h',
        );
        const refreshToken = await this.authService.createToken(
            { id: user.id, email: payload.email, role: user.role },
            process.env.SECRET_REFRESH_KEY,
            '3d',
        );

        //  const hashedRefresh = await this.authService.hash(refreshToken);
        const updated_user = await this.usersService.update(user.id, {
            refreshToken: refreshToken,
        });

        return { user: updated_user, token, refreshToken };
    }

    @Post('reset-password-request')
    async resetPasswordRequest(@Body() payload: ResetPasswordRequest): Promise<{ statusCode: number, date: string, message: string }> {

        const user = await this.usersService.findOneByEmail(payload.email);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        const code = speakeasy.totp({
            secret: process.env.OTP_CODE,
            digits: 6, // nbre de caractères
            step: 60 * 10, // durée 
            encoding: "base32" // encodage
        })
        // url au front 
        const url = "http://localhost:3000/auth/reset-password-request"
        await this.authService.sendMailResetPasswordRequest(payload.email, url, code);

        return {
            statusCode: 200,
            date: new Date().toISOString(),
            message: "Reset password request email has been sent"
        }
    }

    @Post('reset-password')
    async resetPassword(@Body() payload: ResetPassword): Promise<{ statusCode: number, date: string, data: User, message: string }> {

        const user = await this.usersService.findOneByEmail(payload.email);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        // on vérifie la validité du code qu'il nous a renvoyé 
        const isMatch = speakeasy.totp.verify({
            secret: process.env.OTP_CODE,
            token: payload.code,
            digits: 6, // nbre de caractères
            step: 60 * 10, // durée 
            encoding: "base32" // encodage
        });

        if (!isMatch) {
            throw new HttpException('invalid or expired token', HttpStatus.UNAUTHORIZED);
        }

        payload.password = await this.authService.hash(payload.password);

        const updated_user = await this.usersService.update(user.id, {
            password: payload.password,
        });
        // url au front 
        // const url = "http://localhost:3000/auth/reset-password"
        await this.authService.sendMailResetPassword(payload.email);

        return {
            statusCode: 200,
            date: new Date().toISOString(),
            data: updated_user,
            message: "Your password has been reset, a confirmation email has been sent."
        }
    }

    @ApiBearerAuth()// pour la doc pour préciser que la route est protégée
    @UseGuards(AuthGuard)
    @Delete('delete-account')
    async deleteAccount(@Req() request: RequestWithUser): Promise<User | { statusCode: number, date: string, data: User, message: string }> {
        const userId = request.user.id;
        // console.log("🚀 ~ AuthController ~ deleteAccount ~ userId:", userId)
        return await this.usersService.remove(userId);
    }

    @UseGuards(AuthRefreshGuard)
    @Get('refresh-token')
    async refreshToken(
        @Req() req: RequestWithRefresh,
    ): Promise<{ user: User; token: string; refreshToken: string }> {
        // get user from payload
        const user: User = await this.usersService.findOneById(req.user.id);
        // check user exists
        if (!user) throw new HttpException("User doesn't exist", 404);

        // check user.refresh === refresh
        const isMatched: boolean = await this.authService.compare(
            req.refreshToken,
            user.refreshToken,
        );
        if (!isMatched) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // create new token // refreshToken
        const token = await this.authService.createToken(
            { id: user.id, email: req.user.email, role: user.role },
            process.env.SECRET_KEY,
            '3h',
        );
        const refreshToken = await this.authService.createToken(
            { id: user.id, email: req.user.email, role: user.role },
            process.env.SECRET_REFRESH_KEY,
            '3d',
        );
        // const hashedRefresh = await this.authService.hash(refreshToken);
        const updated_user = await this.usersService.update(user.id, {
            refreshToken: refreshToken,
        });
        //return everything
        return { user: updated_user, token, refreshToken };
    }
}
