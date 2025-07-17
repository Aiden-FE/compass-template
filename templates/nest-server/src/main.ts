import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ROUTE_BASE_PREFIX, VALIDATION_OPTION } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: process.env.DEBUG === 'true',
    }),
  );
  app.setGlobalPrefix(ROUTE_BASE_PREFIX);
  // 接口多版本
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    // 入参数据验证
    new ValidationPipe(VALIDATION_OPTION),
  );
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch((err) => {
  Logger.error(err);
});
