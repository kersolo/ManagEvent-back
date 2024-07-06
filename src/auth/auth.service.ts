import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        private mailService: MailService) { }
    
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async sendMailRegistration(email: string): Promise<void> {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        // create user in db
        // ...
        // send confirmation mail
        await this.mailService.sendMailRegistration(email, token);
    }

    async sendMailResetPasswordRequest(email: string, url: string, code: string): Promise<void> {
        await this.mailService.sendMailResetPasswordRequest(email, url, code);
    }

    async sendMailResetPasswordConfirmation(email: string): Promise<void> {
        await this.mailService.sendMailResetPasswordConfirmation(email);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async createToken(
        payload: { id: string; email: string; role: RoleEnum },
        secret: string,
        expiration: string | number,
    ): Promise<string> {
        return this.jwtService.signAsync(
            payload,
            {
                secret,
                expiresIn: expiration,
            }
        );
    }

}

