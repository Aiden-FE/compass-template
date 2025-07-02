import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseMicroserviceInterceptor } from '@app/common';
import { MicroserviceAController } from './microservice-a.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MicroserviceAController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMicroserviceInterceptor,
    },
  ],
})
export class MicroserviceAModule {}
