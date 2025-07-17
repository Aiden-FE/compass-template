import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, HttpExceptionFilter, LoggerInterceptor, ResponseStandaloneInterceptor } from '@app/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 局部可以通过 SkipThrottle Throttle 跳过或覆盖全局配置
    ThrottlerModule.forRoot({
      throttlers: [
        {
          // 单位毫秒
          ttl: process.env.THROTTLE_DEFAULT_TTL ? Number(process.env.THROTTLE_DEFAULT_TTL) : 1000 * 60,
          // 单位时间内限制的次数
          limit: process.env.THROTTLE_DEFAULT_LIMIT ? Number(process.env.THROTTLE_DEFAULT_LIMIT) : 100,
        },
      ],
    }),
    // JWT 配置
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // 日志拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    // 响应拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseStandaloneInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
