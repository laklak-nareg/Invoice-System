import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.createInvoice(createInvoiceDto);
  }

  @Get('test')
  async createDummyInvoice() {
    return this.invoicesService.createDummyInvoice();
  }
  @Get('trigger-report')
  async triggerDailySalesReport() {
    return this.invoicesService.generateDailySalesReport();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    return this.invoicesService.getInvoiceById(id);
  }

  @Get()
  async getAllInvoices() {
    return this.invoicesService.getAllInvoices();
  }
}
