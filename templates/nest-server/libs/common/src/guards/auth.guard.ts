import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { AUTH_KEY, NO_AUTH_KEY } from '../constants';
import { AuthInfo, BusinessStatus, HttpResponseException } from '../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [context.getHandler(), context.getClass()]);
    // 如果使用 @NoAuth() 装饰器的接口意味着不需要授权
    if (noAuth) {
      return true;
    }
    const httpCtx = context.switchToHttp();
    // user的来源请根据业务逻辑处理,或从headers头解析出来
    const req = httpCtx.getRequest<FastifyRequest>();
    if (!req.headers.authorization) {
      throw new HttpResponseException({
        statusCode: BusinessStatus.UNAUTHORIZED,
        httpStatus: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    let user: AuthInfo;
    try {
      // FIXME: 在此之前建议先从redis中获取用户信息,避免重复解析token还原权限等处理
      user = this.jwtService.verify(req.headers.authorization);
    } catch {
      throw new HttpResponseException({
        statusCode: BusinessStatus.UNAUTHORIZED,
        httpStatus: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    const permissions = user.permissions ?? [];
    const option = this.reflector.getAllAndOverride<{ mode: 'AND' | 'OR'; permissions: string[] }>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 如果未使用 @Auth() 装饰器的接口意味着不需要具体权限码授权,有认证后的用户信息即可
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
