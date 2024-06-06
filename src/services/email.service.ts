import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: '0.0.0.0',
    port: 1025,
    ignoreTLS: true,
  });
  constructor() {}

  async sendEmail(recipient: string) {
    // can use handlebars or some other for mail
    const mailOptions = {
      to: recipient,
      from: 'abhishekk.handa1991@gmail.com',
      subject: 'Welcome to the team',
      html: '<h1>Welcome to the team</h1>',
    };
    await this.transporter.sendMail(mailOptions);
  }
}
