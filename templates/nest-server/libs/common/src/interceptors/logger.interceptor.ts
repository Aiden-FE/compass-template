import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NO_LOG_METADATA_KEY } from '../constants';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const handler = context.getHandler();
    const cls = context.getClass();
    const noLog = this.reflector.getAllAndOverride<boolean>(NO_LOG_METADATA_KEY, [handler, cls]);
    if (noLog) {
      return next.handle();
    }
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${req.protocol?.toLocaleUpperCase?.() || 'HTTP'}/${(req as any).httpVersion || ''} ${req.method} ${req.ips?.join?.(',') || req.ip} ${req.url} +${Date.now() - startTime}ms`,
          'LoggerInterceptor',
        );
      }),
    );
  }
}
