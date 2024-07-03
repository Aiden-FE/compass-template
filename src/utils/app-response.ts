import { NextResponse } from 'next/server';

export enum ResponseCode {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

/** 服务端API路由响应包裹 */
export class AppResponse {
  code: ResponseCode;

  message: string;

  details?: string;

  data: any;

  constructor(data: any, code?: number, message?: string, details?: string) {
    this.code = code || ResponseCode.SUCCESS;
    this.data = data;
    this.message = message || ResponseCode[this.code]?.toLocaleLowerCase() || 'Success';
    this.details = details;
  }

  toJson() {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      details: this.details,
    };
  }

  json() {
    return NextResponse.json(this.toJson());
  }
}
