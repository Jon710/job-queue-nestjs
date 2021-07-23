import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data.email,
      from: 'Moraes Tech <moraestech@gmail.com>',
      subject: 'Qatar 2022',
      text: `Olá ${data.name}, você estará na Copa do Mundo no Qatar!`,
    });
  }
}

export { SendMailConsumer };
