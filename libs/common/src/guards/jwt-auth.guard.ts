import { CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AUTH_KEY, HttpResponse, IS_PUBLIC_KEY } from '@app/common';
// import { RpcException } from '@nestjs/microservices';

export default class JWTAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 使用了 @Public() 装饰器的不做校验
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 公共接口放行
    if (isPublic) {
      return true;
    }
    const httpCtx = context.switchToHttp();
    // FIXME: user的来源请根据业务逻辑处理,或从headers头解析出来
    const { user } = httpCtx.getRequest();
    // const rpcCtx = context.switchToRpc();
    // const { user } = rpcCtx.getData();
    if (!user || !user.permissions?.length) {
      throw new HttpException(
        new HttpResponse({
          httpStatus: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        }).getMicroServiceResponse(),
        HttpStatus.UNAUTHORIZED,
      );
      // 微服务可以抛出该错误
      // throw new RpcException(
      //   new HttpResponse({
      //     httpStatus: HttpStatus.UNAUTHORIZED,
      //     message: 'Unauthorized',
      //   }).getMicroServiceResponse(),
      // );
    }
    const option = this.reflector.getAllAndOverride<{ mode: 'AND' | 'OR'; permissions: string[] }>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 如果未使用 @Auth() 装饰器的接口意味着不需要具体权限码授权,有token即可
    if (!option || !option.permissions?.length) return true;
    let valid: boolean;
    if (option.mode === 'AND') {
      // AND 权限处理
      valid = option.permissions.reduce<boolean>((result, key) => {
        if (!result) return false;
        return user.permissions.includes(key);
      }, true);
    } else {
      // OR 权限处理
      valid = option.permissions.some((key) => user.permissions.includes(key));
    }
    if (!valid) {
      throw new HttpException(
        new HttpResponse({
          httpStatus: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        }).getMicroServiceResponse(),
        HttpStatus.UNAUTHORIZED,
      );
      // 微服务可以抛出该错误
      // throw new RpcException(
      //   new HttpResponse({
      //     httpStatus: HttpStatus.UNAUTHORIZED,
      //     message: 'Unauthorized',
      //   }).getMicroServiceResponse(),
      // );
    }
    return true;
  }
}
