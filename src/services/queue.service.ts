import { Injectable } from '@nestjs/common';
import * as Queue from 'bull';
import { EmailService } from './email.service';

const welcomeEmailQueue = new Queue('send-welcome-email');

@Injectable()
export class QueueService {
  constructor(private readonly emailService: EmailService) {
    welcomeEmailQueue.process(async function (job, done) {
      await emailService.sendEmail(job.data.recipient);
      done();
    });
  }
  async addToQueue(recipient: string) {
    await welcomeEmailQueue.add({ recipient });
  }
}
