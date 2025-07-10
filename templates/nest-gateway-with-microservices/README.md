# Nestjs 微服务模板

- [Nestjs 微服务模板](#nestjs-微服务模板)
  - [快速开始](#快速开始)
  - [功能特性](#功能特性)
    - [支持环境变量](#支持环境变量)
    - [基于Fastify高性能的网关](#基于fastify高性能的网关)
    - [接口入参校验及转换](#接口入参校验及转换)
    - [网关限流保护](#网关限流保护)
    - [日志中间件](#日志中间件)
    - [统一返回结构](#统一返回结构)
    - [鉴权处理](#鉴权处理)
    - [数据库迁移管理](#数据库迁移管理)

## 快速开始

`cp .env.example .env` 按模板创建 '.env' 配置文件并按需调整

`pnpm install` 恢复依赖

`pnpm dev:gateway` 启动网关

`pnpm dev:microservice-a` 启动微服务 A

访问 'http://localhost:8080/api/health' 与 'http://localhost:8080/api/a/health' 可确认服务启动成功

## 功能特性

### 支持环境变量

所有可用变量均在 '.env.example' 中说明, 根据该文件创建 '.env' 并按需配置

注册配置模块
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 使服务能够读取.env文件, 不设置无法读取 process.env 内对应的环境变量
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

后续可直接读取 'process.env' 直接读取变量或参考 [@nestjs/config](https://docs.nestjs.com/techniques/configuration) 使用

### 基于Fastify高性能的网关

网关采用 Fastify 底层实现

### 接口入参校验及转换

定义 dto 类:
```typescript
import { IsNumber, IsString, IsOptional } from 'class-validator';

class ADto {
  @IsString()
  id: string;
}

class BDto {
  @IsNumber()
  age: number;
}

class CDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;
}
```

应用 Dto:

```typescript
import { MicroBody, MicroQuery } from '@app/common';

@Controller()
export class ExampleController {
  /**
   * @description 转换配置详见 @app/common 中的 VALIDATION_OPTION 配置
   */
  @MessagePattern({ cmd: 'GET:/test' })
  test(@MicroQuery() query: CDto) {
    return 'Hello world.';
  }

  @MessagePattern({ cmd: 'GET:/test2' })
  test2(@MicroBody() body: CDto) {
    return 'Hello world2.';
  }
}
```

更多详细用法参考: [Nest Validator](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

### 网关限流保护

网关侧统一限流, 默认配置为 1 分钟内最多请求 100 次,可针对不同接口配置不同的限流规则

配置位于 `libs/common/src/constants/throttlers.ts` 内,default 为默认配置, 可通过环境变量THROTTLE_DEFAULT_TTL,THROTTLE_DEFAULT_LIMIT变更默认值.

```typescript
/**
 * 限流配置
 *
 * 默认配置为 1 分钟内最多请求 100 次
 *
 * 可针对不同接口配置不同的限流规则
 *
 * @example 规则配置示例
 * {
 *   ['接口路径(不含 ROUTE_BASE_PREFIX 前缀)']: {
 *     ttl: 1000 * 60, // 1 分钟
 *     limit: 2000, // 2000 次
 *   },
 * }
 */
export const THROTTLE_ROUTES_CONFIG = {
  default: {
    ttl: process.env.THROTTLE_DEFAULT_TTL ? Number(process.env.THROTTLE_DEFAULT_TTL) : 1000 * 60,
    limit: process.env.THROTTLE_DEFAULT_LIMIT ? Number(process.env.THROTTLE_DEFAULT_LIMIT) : 100,
  },
  '/health': {
    ttl: 1000 * 60,
    limit: 200,
  },
};
```

### 日志中间件

默认使用 log 级别打印接口请求,类似如下结构:

`[Nest] 62588  - 2025/07/02 14:06:12     LOG [LoggerMiddleware] HTTP/1.1 GET ::1 /api/health +5ms`

### 统一返回结构

```typescript
import { MicroBody, MicroQuery, HttpResponse, BusinessStatus, HttpResponseException } from '@app/common';
import { HttpStatus, HttpException } from '@nestjs/common';

/**
 * 以下仅演示了微服务,网关 API 接口使用同理即可
 */
@Controller()
export class ExampleController {
  /**
   * @example 实际返回如下: HTTP 200
   * {
   *   statusCode: 100200,
   *   data: 'Hello world.',
   *   message: 'Request successful'
   * }
   */
  @MessagePattern({ cmd: 'GET:/test' })
  test(@) {
    return 'Hello world.';
  }

  /**
   * @example 实际返回如下: HTTP 200
   * 'Hello world'
   */
  @MessagePattern({ cmd: 'GET:/test2' })
  test2() {
    return new HttpResponse({
      data: 'Hello world',
      responseType: 'raw',
    });
  }

  /**
   * @example 实际返回如下: HTTP 200
   * {
   *   statusCode: 100201,
   *   data: 'Hello world',
   *   message: 'Request successful'
   * }
   */
  @MessagePattern({ cmd: 'POST:/test3' })
  test3() {
    return new HttpResponse({
      statusCode: BusinessStatus.CREATED,
      data: 'Hello world',
    });
  }

  /**
   * @example 实际返回如下: HTTP 201
   * {
   *   statusCode: 100200,
   *   data: 'Hello world',
   *   message: 'created',
   *   details: 'created',
   * }
   */
  @MessagePattern({ cmd: 'POST:/test4' })
  test4() {
    return new HttpResponse({
      data: 'Hello world',
      httpStatus: HttpStatus.CREATED,
      message: 'created',
      details: 'created',
    });
  }

  /**
   * @example 实际返回如下: HTTP 500
   * {
   *   statusCode: 100500,
   *   data: null,
   *   message: 'Internal server error'
   * }
   */
  @MessagePattern({ cmd: 'POST:/test5' })
  test5() {
    throw new Error('Hello world.');
  }

  /**
   * @example 实际返回如下: HTTP 400
   * {
   *   statusCode: 100400,
   *   data: 'Hello world.',
   *   message: 'Hello world.'
   * }
   */
  @MessagePattern({ cmd: 'POST:/test6' })
  test6() {
    throw new HttpException(
      'Hello world.',
      HttpStatus.BAD_REQUEST,
    );
  }

  /**
   * @example 实际返回如下: HTTP 400
   * {
   *   statusCode: 100400,
   *   data: {
   *     test: 'Hello world.',
   *   },
   *   message: 'Http Exception'
   * }
   */
  @MessagePattern({ cmd: 'POST:/test7' })
  test7() {
    throw new HttpException(
      {
        test: 'Hello world.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  /**
   * @example 实际返回如下: HTTP 400
   * {
   *   statusCode: 100400,
   *   data: {
   *     test: 'Hello world.',
   *   },
   *   message: 'Http Exception'
   * }
   */
  @MessagePattern({ cmd: 'POST:/test8' })
  test8() {
    throw new HttpResponseException({
      statusCode: BusinessStatus.BAD_REQUEST
      data: {
        test: 'Hello world.',
      },
      httpStatus: HttpStatus.BAD_REQUEST,
    });
  }
}
```

### 鉴权处理

- `@NoAuth()` 装饰器标记无需授权
- `@Auth(PERMISSIONS.A_TEST)` 标记一个或多个权限
- `jwtService.sign` 签发权限,并在后续请求的 headers.authorization 内提供
- `libs/common/src/interceptors/request-forwarding.interceptor.ts` 按需调整权限获取逻辑

参考如下:

```typescript
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  Auth,
  HttpResponse,
  NoAuth,
  PERMISSIONS,
  HttpResponseException,
  BusinessStatus,
  MicroQuery,
} from '@app/common';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class MicroserviceAController {
  constructor(private readonly jwtService: JwtService) {}

  @SkipThrottle()
  @NoAuth()
  @MessagePattern({ cmd: 'GET:/health' })
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }

  @Auth(PERMISSIONS.A_TEST)
  @MessagePattern({ cmd: 'GET:/auth' })
  auth() {
    return new HttpResponse({
      data: '需要权限的场景测试',
    });
  }

  @NoAuth()
  @MessagePattern({ cmd: 'GET:/no-auth' })
  noAuth() {
    return new HttpResponse({
      data: '无需权限的场景测试',
    });
  }

  /** 未指定权限,但是也会要求存在用户信息方可访问 */
  @MessagePattern({ cmd: 'GET:/error' })
  error() {
    throw new HttpResponseException({
      statusCode: BusinessStatus.FORBIDDEN,
      message: '测试错误抛出',
      data: {
        test: 'Hello world.',
      },
      httpStatus: HttpStatus.FORBIDDEN,
    });
  }

  /** 生成 token 示例 */
  @NoAuth()
  @MessagePattern({ cmd: 'GET:/generate-token' })
  generateToken(@MicroQuery() query: object) {
    const token = this.jwtService.sign(query, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      secret: process.env.JWT_SECRET,
    });
    return new HttpResponse({
      data: {
        token,
        ...query,
      },
    });
  }
}
```

### 数据库迁移管理

配置 '.migrate.json' 文件:

```json
{
  "dir": "migrations", // 迁移文件所在目录，默认为 migrations
  "dbType": "postgres", // 数据库类型，默认为 postgres，目前支持 postgres,mysql
  "envFilePath": ".env" // 环境文件位置，默认为 .env
}
```

.env 添加环境变量

```env
# 数据库连接字符串
MIGRATION_DB_CONNECTION=postgresql://username:password@localhost:5432/database_name
```

* `npx migrate create --name <task-name>` 创建迁移任务
* 在生成的迁移目录 main.sql 内编写迁移脚本,在 rollback.sql 内编写回滚脚本
* `npx migrate up` 按顺序执行所有迁移
* 使用`npx migrate rollback`回滚最近的一个迁移任务,使用`npx migrate rollback --all` 回滚所有迁移任务

详细使用可参考[MigrateCli](https://github.com/Aiden-FE/migrate-cli/blob/master/README.md)
