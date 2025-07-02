import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import {
  RequestForwardingInterceptor,
  ResponseStandaloneInterceptor,
  MicroservicesConfig,
  THROTTLE_ROUTES_CONFIG,
  ROUTE_BASE_PREFIX,
} from '@app/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { FastifyRequest } from 'fastify';
import { AppController } from './app.controller';

@Module({
  imports: [
    // 使服务读取.env文件, 不设置无法读取 process.env 内对应的环境变量
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: (ctx) => {
            const req = ctx.switchToHttp().getRequest<FastifyRequest>();
            const config = THROTTLE_ROUTES_CONFIG[req.url.replace(new RegExp(`^/${ROUTE_BASE_PREFIX}`), '')];
            return config?.ttl ?? THROTTLE_ROUTES_CONFIG.default.ttl;
          },
          limit: (ctx) => {
            const req = ctx.switchToHttp().getRequest<FastifyRequest>();
            const config = THROTTLE_ROUTES_CONFIG[req.url.replace(new RegExp(`^/${ROUTE_BASE_PREFIX}`), '')];
            return config?.limit ?? THROTTLE_ROUTES_CONFIG.default.limit;
          },
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    // 请求转发拦截器, 根据请求路径转发到对应的微服务
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestForwardingInterceptor,
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
    // 注入微服务客户端
    ...MicroservicesConfig.map((config) => ({
      provide: config.name,
      useFactory: () => ClientProxyFactory.create(config.options),
    })),
  ],
})
export class AppModule {}
