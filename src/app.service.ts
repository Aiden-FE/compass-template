import { Injectable } from '@nestjs/common';
import { generateUUID } from '@app/common';

@Injectable()
export class AppService {
  async getHello() {
    return 'Hello World!' + await generateUUID();
  }
}
