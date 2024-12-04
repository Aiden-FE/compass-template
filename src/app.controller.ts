import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  ping() {
    return this.appService.ping();
  }
}
