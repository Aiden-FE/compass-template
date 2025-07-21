import { NestFactory } from '@nestjs/core';
import { MicroservicesConfig, VALIDATION_OPTION } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MicroserviceAModule } from './microservice-a.module';

Logger.overrideLogger(
  process.env.DEBUG === 'true'
    ? ['verbose', 'debug', 'log', 'warn', 'error', 'fatal']
    : ['log', 'warn', 'error', 'fatal'],
);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroserviceAModule,
    MicroservicesConfig[0].options,
  );
  app.useGlobalPipes(
    // 入参数据验证
    new ValidationPipe(VALIDATION_OPTION),
  );
  await app.listen();
}

bootstrap().catch((err) => {
  Logger.error(err);
});
