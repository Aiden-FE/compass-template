import { SetMetadata, applyDecorators } from '@nestjs/common';
import { AUTH_KEY, PERMISSIONS } from '@app/common';

/**
 * @description 设置许可权限,可放在函数或类上
 * @param permissions 权限key或keys
 * @param mode 权限模式,OR 任一命中即可, AND所有均需满足
 * @constructor
 */
const Auth = (permissions: PERMISSIONS | PERMISSIONS[], mode: 'AND' | 'OR' = 'AND') => {
  return applyDecorators(
    SetMetadata(AUTH_KEY, {
      mode,
      permissions: Array.isArray(permissions) ? permissions : [permissions],
    }),
  );
};

export default Auth;
