import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthGuard, ThrottlerBehindProxyGuard } from '@app/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MysqlModule } from '@app/mysql';
// import { EmailModule } from '@app/email';
// import { RedisModule } from '@app/redis';

@Module({
  imports: [
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot([
      {
        // 单位毫秒
        ttl: process.env.APP_THROTTLE_TTL ? Number(process.env.APP_THROTTLE_TTL) : 1000 * 60,
        // 单位时间内限制的次数
        limit: process.env.APP_THROTTLE_LIMIT ? Number(process.env.APP_THROTTLE_LIMIT) : 60,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.APP_SALT_SECRET || '',
    }),
    // EmailModule.forRoot({}),
    // RedisModule.forRoot({}),
    // MysqlModule.forRoot({}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
