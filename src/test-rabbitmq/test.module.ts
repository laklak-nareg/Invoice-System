// import { Module } from '@nestjs/common';
// import { TestRabbitmqService } from './test-rabbitmq.service';
// import { TestController } from './test.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'REPORT_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://localhost:5672'],
//           queue: 'test_queue',
//           queueOptions: {
//             durable: true,
//           },
//         },
//       },
//     ]),
//   ],
//   providers: [TestRabbitmqService],
//   controllers: [TestController],
// })
// export class TestModule {}

import { Module } from '@nestjs/common';
import { TestRabbitmqService } from './test-rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'daily_sales_report',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [TestRabbitmqService],
})
export class TestModule {}
