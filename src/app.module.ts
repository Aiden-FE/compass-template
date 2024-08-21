import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { getEnvConfig, ThrottlerBehindProxyGuard } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
// import { MysqlModule } from '@app/mysql';
// import { EmailModule } from '@app/email';
// import { RedisModule } from '@app/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot([
      {
        // 单位毫秒
        ttl: getEnvConfig('APP_THROTTLE_TTL'),
        // 单位时间内限制的次数
        limit: getEnvConfig('APP_THROTTLE_LIMIT'),
      },
    ]),
    // EmailModule.forRoot({}),
    // RedisModule.forRoot({
    //   url: 'redis://127.0.0.1:6379',
    // }),
    // MysqlModule.forRoot({})
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
