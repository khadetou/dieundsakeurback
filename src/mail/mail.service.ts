import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/schema/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class MailService {
  constructor(
    private mailService: MailerService,
    private config: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/password/reset/${token}`;

    console.log();

    await this.mailService.sendMail({
      // from: `"Hot Codes" <no-replay@${this.config.get('MAIL_USER')}>`,
      to: user.email,
      subject: 'Confirm your email',
      template: 'promotional',
      context: {
        url: url,
        name: user.lastname,
      },
      attachments: [
        {
          filename: 'maizzle.png',
          path: `${__dirname}/templates/images/maizzle.png`,
          cid: 'maizzle',
        },
      ],
    });
  }

  async sendMessage(
    messages: string,
    email: string,
    subject: string,
    name: string,
  ) {
    try {
      const data = await this.mailService.sendMail({
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
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
