import { SetMetadata } from '@nestjs/common';
import { NO_AUTH_KEY } from '../constants';

/**
 * @description 声明是无需授权的接口或类,可放在函数或类上
 * @constructor
 */
export const NoAuth = () => {
  return SetMetadata(NO_AUTH_KEY, true);
};
