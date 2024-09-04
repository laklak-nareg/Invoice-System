import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Injectable()
export class TestRabbitmqService {
  constructor(@Inject('REPORT_SERVICE') private readonly client: ClientProxy) {
    // console.log('TestRabbitmqService initialized');
  }

  sendTestMessage() {
    const testMessage = { data: 'Hello, RabbitMQ!' };
    console.log('About to send test message:', testMessage);
    this.client.emit('test_message', testMessage);
    console.log('Test message sent');
  }

  @EventPattern('test_message')
  handleTestMessage(payload: any) {
    console.log('received payload: ', payload);
  }
}

//     sendTestMessage() {
//     const simpleMessage = "Hello_rabbitmq";
//     console.log('About to send simple test message:', simpleMessage);
//     this.client.emit('test_message', simpleMessage);
//     console.log('Simple test message sent');
//   }
