import { All, Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { HttpResponse, BusinessStatus } from '@app/common';
import { FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }

  @All('*')
  catchAll(@Req() req: FastifyRequest) {
    return new HttpResponse({
      data: `${req.url} is not found`,
      httpStatus: HttpStatus.NOT_FOUND,
      statusCode: BusinessStatus.NOT_FOUND,
    });
  }
}
