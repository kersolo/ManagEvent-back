import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';



@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMailRegistration(email: string, token: string): Promise<void> {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Confirmation Mail',
            html: `
                <p>Hey ${email},</p>
                <p>Please click below to confirm your email</p>
                <p> <a href="${url}">Confirm</a>  </p>
                <p>If you did not request this email you can safely ignore it.</p>
            `,
            //  template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: 'DevPunk',
                url,
            },
        });
    }

    async sendMailResetPasswordRequest(email: string, url: string, code: string): Promise<void> {

        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Reset password request',
            html: `
            <a href="${url}">Reset password</a>
            <p>Secret code <strong>${code}</strong>
            <p>Code will expire in 15 minutes</p>
            `
        });
    }

    async sendMailResetPassword(email: string): Promise<void> {

        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Reset password request',
            html: `
            <p>Votre mot de passe a été réinitialisé avec succès</p>
            `
        });
    }
}
