import { Controller, Get } from '@nestjs/common';
import { HttpResponse, NoAuth, NoLog } from '@app/common';

@Controller()
export class AppController {
  @Get('health')
  @NoLog()
  @NoAuth()
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }
}
