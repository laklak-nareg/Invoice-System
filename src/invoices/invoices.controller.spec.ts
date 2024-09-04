import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Invoice } from './invoice.schema';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let model: Model<Invoice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    model = module.get<Model<Invoice>>(getModelToken(Invoice.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'John Doe',
      amount: 100,
      reference: 'INV-1001',
      date: new Date(),
      items: [{ sku: 'item1', qt: 2 }],
    };

    const mockInvoice = {
      ...createInvoiceDto,
      _id: 'mockId',
      save: jest.fn().mockResolvedValue(createInvoiceDto),
    };

    jest.spyOn(model, 'create').mockResolvedValue(mockInvoice as any);

    expect(await service.createInvoice(createInvoiceDto)).toEqual(mockInvoice);
  });
});
