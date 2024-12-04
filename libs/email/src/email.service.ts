import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EmailTransporter, EmailTransportParams } from './email.dto';

@Injectable()
export class EmailService implements OnModuleInit {
  public client: EmailTransporter;

  constructor(
    private option: EmailTransportParams[0],
    private defaultOption?: EmailTransportParams[1],
  ) {}

  async onModuleInit() {
    this.client = createTransport(this.option, this.defaultOption);
    Logger.log('Email service is readied', 'EmailClient');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.client.close();
    await app.close();
  }
}
