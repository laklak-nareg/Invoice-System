import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestRabbitmqService } from './test-rabbitmq/test-rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('test')
export class TestController {
  constructor(private readonly testRabbitmqService: TestRabbitmqService) {}

  @Get('send-message')
  sendMessage() {
    this.testRabbitmqService.sendTestMessage();
  }
}
