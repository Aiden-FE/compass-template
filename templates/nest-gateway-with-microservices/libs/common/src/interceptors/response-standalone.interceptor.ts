import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { FastifyReply } from 'fastify';
import { HttpResponse } from '../interfaces';

@Injectable()
export default class ResponseStandaloneInterceptor implements NestInterceptor {
  // 独立应用采用此拦截器
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (context.getType() !== 'http') return result;
        const httpRespCtx = context.switchToHttp().getResponse<FastifyReply>();
        const data = HttpResponse.transformToHttpResponse(result);
        return httpRespCtx.status(data.getHttpStatus()).send(data.getResponse());
      }),
      catchError((err: unknown) => {
        const httpRespCtx = context.switchToHttp().getResponse<FastifyReply>();
        const data = HttpResponse.transformErrorToHttpResponse(err);
        Logger.warn(err);
        httpRespCtx.status(data.getHttpStatus());
        return of(data.getResponse());
      }),
    );
  }
}
