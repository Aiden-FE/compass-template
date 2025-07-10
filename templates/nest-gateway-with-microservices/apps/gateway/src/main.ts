import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ROUTE_BASE_PREFIX } from '@app/common';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: process.env.DEBUG === 'true',
    }),
  );
  app.setGlobalPrefix(ROUTE_BASE_PREFIX);
  await app.startAllMicroservices();
  await app.listen(process.env.GATEWAY_PORT ? parseInt(process.env.GATEWAY_PORT, 10) : 8080);
}

bootstrap().catch((err) => {
  Logger.error(err);
});
