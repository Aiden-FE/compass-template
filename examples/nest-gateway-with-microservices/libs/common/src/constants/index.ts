import { ValidationPipeOptions } from '@nestjs/common';
import { BusinessStatus, HttpResponse } from '../interfaces';

export * from './microservices';
export * from './throttlers';

export const VALIDATION_OPTION: ValidationPipeOptions = {
  transform: true, // 转换数据
  whitelist: true, // 剥离装饰器不验证的项目
  stopAtFirstError: true, // 遇见第一个错误时就停止验证
  validateCustomDecorators: true, // 验证自定义装饰器
  // skipMissingProperties: true, // 跳过未定义或定义null的验证
  // disableErrorMessages: true, // 禁用详细错误信息
  exceptionFactory: (err) => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new HttpResponse({
      statusCode: BusinessStatus.VALIDATION_FAILED,
      message: 'Data validation failed',
      details: err.map((e) => Object.values(e.constraints ?? {}).join('; ')).join('\n'),
    });
  },
};

export const ROUTE_BASE_PREFIX = 'api';
