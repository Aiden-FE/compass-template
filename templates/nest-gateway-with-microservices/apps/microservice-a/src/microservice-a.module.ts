import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ResponseMicroserviceInterceptor, MicroAuthGuard, HttpExceptionFilter } from '@app/common';
import { MicroserviceAController } from './microservice-a.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [MicroserviceAController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMicroserviceInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: MicroAuthGuard,
    },
    JwtService,
  ],
})
export class MicroserviceAModule {}
