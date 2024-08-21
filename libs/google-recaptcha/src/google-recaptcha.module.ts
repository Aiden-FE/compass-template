import { Module } from '@nestjs/common';
import { GoogleRecaptchaService } from './google-recaptcha.service';
import { GRModuleOptions } from './google-recaptcha.dto';

@Module({})
export class GoogleRecaptchaModule {
  static forRoot(option: GRModuleOptions) {
    return {
      module: GoogleRecaptchaModule,
      providers: [
        {
          provide: GoogleRecaptchaService,
          useValue: new GoogleRecaptchaService(option),
        },
      ],
      exports: [GoogleRecaptchaService],
    };
  }
}
