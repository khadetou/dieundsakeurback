import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/schema/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmaation(user: User, token: string) {
    const url = `http://localhost:3000/me/confirm-email/${token}`;
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Confirm your email',
      template: 'confirmation',
      context: {
        url: url,
      },
    });
  }
}
