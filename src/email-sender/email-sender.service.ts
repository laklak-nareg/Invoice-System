import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailSenderService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  @EventPattern('daily_sales_report')
  async handleDailySalesReport(report: any) {
    console.log('Received Sales Report:', report);

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: this.configService.get<string>('EMAIL_TO'),
      subject: 'Daily Sales Report',
      text: `Here is the daily sales report:\n\nTotal Sales: ${report.totalSales}\n\nItem Summary:\n${Object.entries(
        report.itemSummary,
      )
        .map(([sku, qt]) => `${sku}: ${qt}`)
        .join('\n')}`,
    };

    // Send the email
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}