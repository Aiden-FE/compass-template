import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createClient, type RedisClientOptions, type RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  public client: RedisClientType;

  constructor(private options: RedisClientOptions) {}

  async onModuleInit() {
    this.client = (await createClient(this.options)
      .on('error', (err) => Logger.error(err))
      .connect()) as RedisClientType;

    Logger.log('Redis connected successfully', 'RedisClient');
  }

  async enableShutdownHooks(app: INestApplication) {
    await this.client.disconnect();
    await app.close();
  }
}
