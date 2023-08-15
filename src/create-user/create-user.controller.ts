import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SendMailProducerService } from 'src/jobs/sendMall.producer-service';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDTO) {
    this.sendMailService.sendMail(createUser);
    return createUser;
  }
}
