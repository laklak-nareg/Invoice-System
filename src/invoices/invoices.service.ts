import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @Inject('REPORT_SERVICE') private client: ClientProxy,
  ) {}

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceDocument> {
    const newInvoice = new this.invoiceModel(createInvoiceDto);
    return newInvoice.save();
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id).exec();
  }
  

  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }

  async createDummyInvoice(): Promise<Invoice> {
    const dummyInvoice = new this.invoiceModel({
      customer: 'John Doe',
      amount: 100,
      reference: 'INV-1001',
      items: [{ sku: 'item1', qt: 2 }],
    });
    return dummyInvoice.save();
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async generateDailySalesReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const invoices = await this.invoiceModel
      .find({ date: { $gte: today, $lt: tomorrow } })
      .exec();
    const totalSales = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );
    const itemSummary = invoices
      .flatMap((invoice) => invoice.items)
      .reduce(
        (summary, item) => {
          if (!summary[item.sku]) {
            summary[item.sku] = 0;
          }
          summary[item.sku] += item.qt;
          return summary;
        },
        {} as Record<string, number>,
      );
    const salesReport = {
      totalSales,
      itemSummary,
    };
    console.log('emitting sales report to RabbitMQ: ', salesReport);

    this.client.emit('daily_sales_report', salesReport);

    console.log('The total sales report is : ', salesReport);
  }
}
