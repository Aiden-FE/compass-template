import { BusinessStatus, HttpResponse } from '@app/common';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable, of } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { promiseTask } from '@compass-aiden/helpers';
import { ModuleRef } from '@nestjs/core';
import { MicroservicesConfig } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ROUTE_BASE_PREFIX } from '../constants';
import { AuthInfo } from '../interfaces';

@Injectable()
export default class RequestForwardingInterceptor implements NestInterceptor {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly jwtService: JwtService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const path = request.url?.replace(`/${ROUTE_BASE_PREFIX}`, '') || '';
    const method = request.method;
    const payload = {
      body: request.body || {},
      query: request.query || {},
      ctx: {
        user: null as AuthInfo | null,
      },
    };
    const token = request.headers.authorization;
    if (token) {
      try {
        payload.ctx.user = this.jwtService.verify<AuthInfo>(token);
        // FIXME: 从 redis 或数据库查询恢复 permissions
        payload.ctx.user.permissions = [];
      } catch (error) {
        Logger.error(error, 'RequestForwardingInterceptor');
        return of(
          new HttpResponse({
            statusCode: BusinessStatus.UNAUTHORIZED,
            message: 'Unauthorized',
            httpStatus: HttpStatus.UNAUTHORIZED,
          }),
        );
      }
    }
    let cmd: string | undefined = undefined;
    let client: any = undefined;

    // 根据路径前缀决定转发到哪个微服务
    const targetMicroservice = MicroservicesConfig.find((config) => path.startsWith(this.getPrefix(config.prefix)));
    if (targetMicroservice) {
      cmd = this.getCommand(path.replace(this.getPrefix(targetMicroservice.prefix), ''), method);
      // 动态 inject targetMicroservice.name 匹配的微服务
      client = this.moduleRef.get<ClientProxy>(targetMicroservice.name, {
        strict: false,
      });
    }

    if (cmd && client) {
      const [err, data] = await promiseTask(firstValueFrom((client as ClientProxy).send({ cmd }, payload)));
      const resp = err ? HttpResponse.transformErrorToHttpResponse(err) : HttpResponse.transformToHttpResponse(data);
      if (err) {
        Logger.error(err, cmd);
      }
      ctx.getResponse<FastifyReply>().status(resp.getHttpStatus());
      return of(resp.getResponse());
    }

    // 默认情况继续执行本地处理
    return next.handle();
  }

  private getPrefix(prefix: string): string {
    if (prefix.startsWith('/')) {
      return prefix;
    }
    return `/${prefix}`;
  }

  private getCommand(path: string, method: string): string {
    // 生成微服务识别的命令，例如：GET:/user/v1/profile -> GET:/v1/profile
    // 移除查询参数，只保留路径部分
    const pathWithoutQuery = path.split('?')[0];
    return `${method.toUpperCase()}:${pathWithoutQuery}`;
  }
}
