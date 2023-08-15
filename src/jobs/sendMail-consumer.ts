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
    console.log(data);
    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe COde/Drops <codedrops@codedrops.com.br>',
      subject: 'Seja bem vindo(a',
      text: `Olá ${data.name}, seu cadatro foi realizado com sucesso. Seja bem vindo(a)`,
    });
  }
}

export { SendMailConsumer };
