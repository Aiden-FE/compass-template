import { ExceptionFilter, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponseException, getLikeBusinessStatus, BusinessStatus } from '../interfaces';
import { throwError } from 'rxjs';

@Catch(HttpResponseException, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpResponseException | HttpException) {
    if (exception instanceof HttpResponseException) {
      return throwError(() => exception);
    }
    if (exception instanceof HttpException) {
      return throwError(
        () =>
          new HttpResponseException({
            statusCode: getLikeBusinessStatus(exception.getStatus()) ?? BusinessStatus.BAD_REQUEST,
            httpStatus: exception.getStatus(),
            message: exception.message,
            data: exception.getResponse(),
          }),
      );
    }
    return throwError(
      () =>
        new HttpResponseException({
          statusCode: BusinessStatus.INTERNAL_SERVER_ERROR,
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }),
    );
  }
}
