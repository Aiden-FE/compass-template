import { CanActivate, ExecutionContext, HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { AUTH_KEY, HttpResponse, IS_PUBLIC_KEY, UserContext } from '@app/common';

@Injectable()
export default class JWTAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    // user的来源请根据业务逻辑处理,或从headers头解析出来
    const req = httpCtx.getRequest<FastifyRequest>();
    if (!req.headers.authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    let user: UserContext | undefined;
    // const tokenKey = `guard.token.${req.headers.authorization}`;
    const catcheUser: UserContext | undefined = undefined;
    // FIXME: 从 redis 中尝试根据 token 恢复用户信息,如果获取到用户信息过期了则删除
    // const catcheUser = await this.redisService.client.get(tokenKey);
    if (catcheUser) {
      user = JSON.parse(catcheUser) as UserContext;
      if (user.exp * 1000 < Date.now()) {
        user = undefined;
        // await this.redisService.client.del(tokenKey);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else {
      // 如果没有从 redis 中获取到用户信息,则使用 jwt 验签,验签失败则返回 UNAUTHORIZED
      try {
        const decodeUser = await this.jwtService.verify(req.headers.authorization);
        if (decodeUser.roles?.length) {
          // FIXME: 验签通过后根据角色信息从权限表内获取用户权限信息
          // const [result] = await this.mysqlService.client.query(
          //   'SELECT * FROM `_role_permissions`  WHERE role_id IN (?)',
          //   [decodeUser.roles],
          // );
          // decodeUser.permissions = result?.[0].map((item) => item.permission_key) || [];
          decodeUser.permissions = [];
        } else {
          decodeUser.permissions = [];
        }
        // FIXME: 请将用户信息记录到 redis 内,方便后续使用
        // await this.redisService.client.set(tokenKey, JSON.stringify(decodeUser), { PX: 1000 * 60 * 60 });
        user = decodeUser;
      } catch {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
    if (!user || !user.permissions?.length) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    // 验证通过的请求都要在请求上下文添加 user 字段
    req.user = user;

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
    }
    return true;
  }
}
