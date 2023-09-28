import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@app/common';

/**
 * @description 声明是开放的接口或类,可放在函数或类上
 * @constructor
 */
const Public = () => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};

export default Public;
