import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpResponse } from '../interfaces';

@Injectable()
export default class ResponseMicroserviceInterceptor
  implements NestInterceptor
{
  // 微服务采用此拦截器
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((result) => {
        const data = HttpResponse.transformToHttpResponse(result);
        return data.getResponseType() === 'raw'
          ? {
              statusCode: data.getStatusCode(),
              data: data.getData(),
              message: data.getMessage(),
              details: data.getDetails(),
              httpStatus: data.getHttpStatus(),
              responseType: data.getResponseType(),
            }
          : {
              ...data.getResponse(),
              httpStatus: data.getHttpStatus(),
              responseType: data.getResponseType(),
            };
      }),
      catchError((err: unknown) => {
        const data = HttpResponse.transformErrorToHttpResponse(err);
        Logger.warn(err);
        return of(
          data.getResponseType() === 'raw'
            ? {
                statusCode: data.getStatusCode(),
                data: data.getData(),
                message: data.getMessage(),
                details: data.getDetails(),
                httpStatus: data.getHttpStatus(),
                responseType: data.getResponseType(),
              }
            : {
                ...data.getResponse(),
                httpStatus: data.getHttpStatus(),
                responseType: data.getResponseType(),
              },
        );
      }),
    );
  }
}
