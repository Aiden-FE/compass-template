import { HttpException, HttpStatus } from '@nestjs/common';

// 业务状态码
export enum BusinessStatus {
  CONTINUE = 100100,
  SWITCHING_PROTOCOLS = 100101,
  PROCESSING = 100102,
  EARLYHINTS = 100103,
  /** 业务操作成功 */
  OK = 100200,
  /** 创建成功 */
  CREATED = 100201,
  ACCEPTED = 100202,
  NON_AUTHORITATIVE_INFORMATION = 100203,
  NO_CONTENT = 100204,
  RESET_CONTENT = 100205,
  PARTIAL_CONTENT = 100206,
  AMBIGUOUS = 100300,
  /** 资源已被转移 */
  MOVED_PERMANENTLY = 100301,
  FOUND = 100302,
  SEE_OTHER = 100303,
  NOT_MODIFIED = 100304,
  /** 临时重定向 */
  TEMPORARY_REDIRECT = 100307,
  /** 永久重定向 */
  PERMANENT_REDIRECT = 100308,
  // 1004XX含义参考: https://www.5axxw.com/wiki/content/sydn5o
  /** 业务异常 */
  BAD_REQUEST = 100400,
  /** 未授权异常 */
  UNAUTHORIZED = 100401,
  /** 待付费 */
  PAYMENT_REQUIRED = 100402,
  /** 禁止访问资源 */
  FORBIDDEN = 100403,
  /** 找不到相关资源 */
  NOT_FOUND = 100404,
  /** 不许可的方法调用 */
  METHOD_NOT_ALLOWED = 100405,
  /** 不接受的请求 */
  NOT_ACCEPTABLE = 100406,
  /** 需要代理身份验证 */
  PROXY_AUTHENTICATION_REQUIRED = 100407,
  /** 请求超时 */
  REQUEST_TIMEOUT = 100408,
  /** 请求冲突 */
  CONFLICT = 100409,
  /** 丢失 */
  GONE = 100410,
  /** 需要必须的长度 */
  LENGTH_REQUIRED = 100411,
  /** 前置条件异常 */
  PRECONDITION_FAILED = 100412,
  /** 请求超载 */
  PAYLOAD_TOO_LARGE = 100413,
  /** URI过长 */
  URI_TOO_LONG = 100414,
  /** 不支持的媒体类型 */
  UNSUPPORTED_MEDIA_TYPE = 100415,
  /** 请求范围无法满足 */
  REQUESTED_RANGE_NOT_SATISFIABLE = 100416,
  /** 期望失败 */
  EXPECTATION_FAILED = 100417,
  I_AM_A_TEAPOT = 100418,
  /** 误导 */
  MISDIRECTED = 100421,
  /** 不可处理的实体 */
  UNPROCESSABLE_ENTITY = 100422,
  /** 依赖错误 */
  FAILED_DEPENDENCY = 100424,
  /** 需要先决条件 */
  PRECONDITION_REQUIRED = 100428,
  /** 请求过多 */
  TOO_MANY_REQUESTS = 100429,
  /** 服务器内部错误 */
  INTERNAL_SERVER_ERROR = 100500,
  /** 未部署 */
  NOT_IMPLEMENTED = 100501,
  /** 网关错误 */
  BAD_GATEWAY = 100502,
  /** 服务不可用 */
  SERVICE_UNAVAILABLE = 100503,
  /** 网关超时 */
  GATEWAY_TIMEOUT = 100504,
  /** http版本不支持 */
  HTTP_VERSION_NOT_SUPPORTED = 100505,
  // 101XXX 自行定义的状态码
  /** unique值重复 */
  ER_DUP_ENTRY = 101001,
  /** redis 写入异常 */
  ER_REDIS_WRITE,
  /** 数据验证失败 */
  VALIDATION_FAILED,
}

export function getLikeBusinessStatus(httpStatus: number) {
  return BusinessStatus[httpStatus + 100000] ? httpStatus + 100000 : undefined;
}

export interface BusinessResponse<Data = unknown> {
  statusCode: BusinessStatus;
  data: Data | null;
  message?: string;
  details?: string;
}

export interface HttpResponseOption<Data = unknown> extends BusinessResponse<Data> {
  responseType: 'raw' | 'json';
  httpStatus: HttpStatus;
}

export class HttpResponse<Data = unknown> {
  private readonly option: HttpResponseOption<Data>;

  constructor(option?: Partial<HttpResponseOption<Data>>) {
    this.option = {
      statusCode: option?.statusCode ?? BusinessStatus.OK,
      data: option?.data ?? null,
      message: option?.message ?? 'Request successful',
      details: option?.details ?? undefined,
      responseType: option?.responseType ?? 'json',
      httpStatus: option?.httpStatus ?? HttpStatus.OK,
    };
  }

  getResponseType() {
    return this.option.responseType;
  }

  getStatusCode() {
    return this.option.statusCode;
  }

  getHttpStatus() {
    return this.option.httpStatus;
  }

  getData() {
    return this.option.data;
  }

  getMessage() {
    return this.option.message;
  }

  getDetails() {
    return this.option.details;
  }

  getResponse() {
    switch (this.option.responseType) {
      case 'raw':
        return this.option.data;
      case 'json':
      default:
        return {
          statusCode: this.option.statusCode,
          data: this.option.data,
          message: this.option.message,
          details: this.option.details,
        } as BusinessResponse;
    }
  }

  static transformToHttpResponse(result: any) {
    if (result instanceof HttpResponse) {
      return result;
    }
    if (Object.hasOwnProperty.call(result, 'statusCode') && Object.hasOwnProperty.call(result, 'data')) {
      return new HttpResponse({
        statusCode: result.statusCode,
        data: result.data,
        message: result.message ?? (result.statusCode === 200 ? 'OK' : ''),
        details: result.details,
        httpStatus: result.httpStatus,
        responseType: result.responseType,
      });
    }
    return new HttpResponse({ data: result });
  }

  static transformErrorToHttpResponse(err: any) {
    if (err instanceof HttpResponse) {
      return err;
    }
    if (Object.hasOwnProperty.call(err, 'statusCode') && Object.hasOwnProperty.call(err, 'data')) {
      let statusCode = err.statusCode;
      let httpStatus = err.httpStatus ?? undefined;
      let message = err.message ?? 'Internal server error';
      let details = err.details ?? undefined;
      if (statusCode < 1000) {
        statusCode += 100000;
      }
      if (!httpStatus && statusCode >= 100200 && statusCode < 100300) {
        httpStatus = HttpStatus.OK;
        message = err.message;
      } else if (!httpStatus && statusCode >= 100500 && statusCode < 100600) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
        details = undefined;
      } else if (!httpStatus) {
        httpStatus = HttpStatus.BAD_REQUEST;
        message = err.message ?? 'Bad request';
      }
      return new HttpResponse({
        statusCode,
        data: err.data,
        message,
        details,
        httpStatus,
        responseType: err.responseType,
      });
    }
    if (err.toString().includes('There is no matching message handler defined in the remote service')) {
      return new HttpResponse({
        statusCode: BusinessStatus.NOT_FOUND,
        httpStatus: HttpStatus.NOT_FOUND,
        message: 'Not found',
      });
    }
    if (err instanceof HttpException) {
      return new HttpResponse({
        statusCode: getLikeBusinessStatus(err.getStatus()) ?? BusinessStatus.BAD_REQUEST,
        httpStatus: err.getStatus(),
        message: err.message,
        data: err.getResponse(),
      });
    }
    return new HttpResponse({
      statusCode: BusinessStatus.INTERNAL_SERVER_ERROR,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
