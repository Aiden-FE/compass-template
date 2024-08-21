import { Module } from '@nestjs/common';
import { type RedisClientOptions } from 'redis';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(options: RedisClientOptions) {
    return {
      global: true,
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          useValue: new RedisService(options),
        },
      ],
      exports: [RedisService],
    };
  }
}
