import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseInterceptor } from '@app/common';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    // 统一接口前缀
    app.setGlobalPrefix('api');
    // 接口多版本
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/api/v1/ping (GET)', async () => {
    const resp = await request(app.getHttpServer()).get('/api/v1/ping').expect(200);
    expect(resp.body).toMatchObject({ data: 'ok', statusCode: 100200, message: 'Request successful' });
  });

  afterEach(async () => {
    await app.close();
  });
});
