import { Test, TestingModule } from '@nestjs/testing';
import { TestRabbitmqService } from './test-rabbitmq.service';

describe('TestRabbitmqService', () => {
  let service: TestRabbitmqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestRabbitmqService],
    }).compile();

    service = module.get<TestRabbitmqService>(TestRabbitmqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
