import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        // secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: 'No-reply',
          address: process.env.MAIL_FROM,
        },
      },
    );
  }

  async sendRegisterConfirmation(email: string, confirmationToken: string) {
    const confirmationLink = `${process.env.CONFIRM_REGISTER_URL_DEV}?token=${confirmationToken}`;
    const emailBody = `Welcome to our platform! Please click on the following link to confirm your email address: ${confirmationLink}\n\nRegards,\nThe Team`;

    await this.transporter.sendMail({
      to: email,
      subject: `Welcome! Confirm your Email`,
      text: emailBody,
    });
  }
}
