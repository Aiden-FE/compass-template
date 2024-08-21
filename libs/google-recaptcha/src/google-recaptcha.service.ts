import { Injectable } from '@nestjs/common';
import { GRModuleOptions, GRModuleVerifyOptions } from './google-recaptcha.dto';

@Injectable()
export class GoogleRecaptchaService {
  constructor(private option: GRModuleOptions) {}

  async verifyRecaptcha(params: GRModuleVerifyOptions) {
    const { response, score, remoteip, apiUrl } = {
      score: 0.9,
      apiUrl: 'https://recaptcha.net/recaptcha/api/siteverify',
      ...params,
    };
    const result = await fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify({
        response,
        remoteip,
        secret: this.option.secret,
      }),
    }).then((data) => data.json());
    if (!result) {
      return false;
    }
    return !!result.success || result.score > score;
  }
}
