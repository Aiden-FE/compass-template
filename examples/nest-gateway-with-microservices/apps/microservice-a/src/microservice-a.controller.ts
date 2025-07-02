import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HttpResponse } from '@app/common';
import { SkipThrottle } from '@nestjs/throttler';

@Controller()
export class MicroserviceAController {
  @SkipThrottle()
  @MessagePattern({ cmd: 'GET:/health' })
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }
}
