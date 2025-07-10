import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_KEY, NO_AUTH_KEY } from '../constants';
import { BusinessStatus, HttpResponseException } from '../interfaces';

@Injectable()
export default class MicroAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [context.getHandler(), context.getClass()]);
    // 如果使用 @NoAuth() 装饰器的接口意味着不需要授权,有token即可
    if (noAuth) {
      return true;
    }
    const req = context.switchToRpc().getData();
    if (!req.ctx?.user || !req.ctx.user.permissions) {
      throw new HttpResponseException({
        statusCode: BusinessStatus.UNAUTHORIZED,
        httpStatus: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    const permissions = req.ctx.user.permissions;
    const option = this.reflector.getAllAndOverride<{ mode: 'AND' | 'OR'; permissions: string[] }>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 如果未使用 @Auth() 装饰器的接口意味着不需要具体权限码授权,有token即可
    if (!option || !option.permissions?.length) return true;
    let valid: boolean = false;
    if (option.mode === 'AND') {
      // AND 权限处理
      valid = option.permissions.reduce<boolean>((result, key) => {
        if (!result) return false;
        return permissions.includes(key);
      }, true);
    } else {
      // OR 权限处理
      valid = option.permissions.some((key) => permissions.includes(key));
    }
    if (!valid) {
      throw new HttpResponseException({
        statusCode: BusinessStatus.FORBIDDEN,
        httpStatus: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
      });
    }
    return true;
  }
}
