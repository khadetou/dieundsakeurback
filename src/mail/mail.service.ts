import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/schema/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/password/reset/${token}`;
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Confirm your email',
      template: 'confirmation',
      context: {
        url: url,
        name: user.lastname,
      },
    });
  }

  async sendMessage(
    messages: string,
    email: string,
    subject: string,
    name: string,
  ) {
    await this.mailService.sendMail({
      from: email,
      to: 'hotcodesagency@gmail.com',
      subject: subject,
      template: 'message',
      context: {
        messages,
        email,
        name,
      },
    });
  }
}
