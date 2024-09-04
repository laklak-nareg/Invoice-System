import { Controller, Get } from '@nestjs/common';
import { TestRabbitmqService } from './test-rabbitmq.service';

@Controller('test')
export class TestController {
  constructor(private readonly testRabbitmqService: TestRabbitmqService) {}

  @Get('send-message')
  sendMessage() {
    this.testRabbitmqService.sendTestMessage();
  }
}
