import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { FastifyReply } from 'fastify';
import { BusinessStatus, HttpResponse } from '@app/common';

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  // 独立应用采用此拦截器
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (context.getType() !== 'http') return result;
        const httpRespCtx = context.switchToHttp().getResponse<FastifyReply>();
        let resp: HttpResponse;
        if (result instanceof HttpResponse) {
          resp = result;
        } else {
          resp = new HttpResponse({ data: result });
        }
        return httpRespCtx.status(resp.getHttpStatus()).send(resp.getResponse());
      }),
      catchError((err: unknown) => {
        const httpRespCtx = context.switchToHttp().getResponse<FastifyReply>();
        let resp: HttpResponse;
        // 通过 throw new HttpResponse 抛出的异常以 HttpResponse 配置为准
        if (err instanceof HttpResponse) {
          resp = err;
        } else {
          resp = new HttpResponse({
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            statusCode: BusinessStatus.INTERNAL_SERVER_ERROR,
            message: 'Server internal error',
          });
          Logger.warn(err);
        }
        httpRespCtx.status(resp.getHttpStatus());
        return of(resp.getResponse());
      }),
    );
  }
  // 微服务采用此拦截器
  // intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
  //   return next.handle().pipe(
  //     map((result) => {
  //       let data: HttpResponse;
  //       if (result instanceof HttpResponse) {
  //         data = result;
  //       } else {
  //         data = new HttpResponse({
  //           data: result,
  //         });
  //       }
  //
  //       return data.getMicroServiceResponse();
  //     }),
  //     catchError((err: any) => {
  //       let resp: HttpResponse;
  //       if (err instanceof HttpResponse) {
  //         resp = err;
  //       } else {
  //         resp = new HttpResponse({
  //           httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  //           statusCode: BusinessStatus.INTERNAL_SERVER_ERROR,
  //           message: 'Server internal error',
  //         });
  //         Logger.warn(err);
  //       }
  //       return of(resp.getMicroServiceResponse());
  //     }),
  //   );
  // }
}
