# Nestjs 服务模板

- [Nestjs 服务模板](#nestjs-服务模板)
  - [功能特性](#功能特性)
    - [支持环境变量](#支持环境变量)
    - [基于Fastify高性能的网关](#基于fastify高性能的网关)
    - [接口多版本](#接口多版本)
    - [接口限流保护](#接口限流保护)
    - [接口入参校验及转换](#接口入参校验及转换)
    - [日志中间件](#日志中间件)
    - [统一返回结构](#统一返回结构)
    - [鉴权处理](#鉴权处理)
    - [数据库迁移管理](#数据库迁移管理)
  - [依赖更新](#依赖更新)
  - [模板快速上手](#模板快速上手)

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

### 接口多版本

如下所示:

```typescript
import { Version } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  // 访问地址: /api/v1/example/test
  @Get('test')
  test(): string {
    return 'This is v1 endpoint.';
  }

  // 访问地址: /api/v2/example/test
  @Version('2')
  @Get('test')
  test2(): string {
    return 'This is v2 endpoint.';
  }
}
```

### 接口限流保护

默认配置为 1 分钟内最多请求 100 次,可针对不同接口配置不同的限流规则,详细用法参考[文档](https://docs.nestjs.com/security/rate-limiting#multiple-throttler-definitions)

```typescript
@Controller('example')
export class ExampleController {
  // 该接口跳过节流保护
  @SkipThrottle()
  @Get('test')
  test(): string {
    return 'Hello world.';
  }

  // 单独配置
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('test2')
  test(): string {
    return 'Hello world.';
  }

  // 默认采用全局节流配置
  @Get('test3')
  test(): string {
    return 'Hello world.';
  }
}
```


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
@Controller()
export class ExampleController {
  /**
   * @description 转换配置详见 @app/common 中的 VALIDATION_OPTION 配置
   */
  @Get('test')
  test(@Query() query: CDto) {
    return 'Hello world.';
  }

  @Get('test2')
  test2(@Body() body: CDto) {
    return 'Hello world2.';
  }
}
```

更多详细用法参考: [Nest Validator](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

### 日志中间件

默认使用 log 级别打印接口请求,类似如下结构:

`[Nest] 62588  - 2025/07/02 14:06:12     LOG [LoggerMiddleware] HTTP/1.1 GET ::1 /api/health +5ms`

### 统一返回结构

```typescript
import { HttpStatus, HttpException } from '@nestjs/common';

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
  @Get('test')
  test() {
    return 'Hello world.';
  }

  /**
   * @example 实际返回如下: HTTP 200
   * 'Hello world'
   */
  @Get('test2')
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
  @Post('test3')
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
  @Post('test4')
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
  @Post('test5')
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
  @Post('test6')
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
  @Post('test7')
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
  @Post('test8')
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
- `libs/common/src/interceptors/response-standalone.interceptor.ts` 按需调整授权信息解析逻辑

参考如下:

```typescript
@Controller()
export class MicroserviceAController {
  constructor(private readonly jwtService: JwtService) {}

  @SkipThrottle()
  @NoAuth()
  @Get('health')
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }

  @Auth(PERMISSIONS.A_TEST)
  @Get('auth')
  auth() {
    return new HttpResponse({
      data: '需要权限的场景测试',
    });
  }

  @NoAuth()
  @Get('no-auth')
  noAuth() {
    return new HttpResponse({
      data: '无需权限的场景测试',
    });
  }

  /** 未指定权限,但是也会要求存在用户信息方可访问 */
  @Get('error')
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
  @Get('generate-token')
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

## 依赖更新

`npx npm-check-updates -i --format group` 按需选择待更新的依赖

> 如选择了 nestjs 相关更新,建议进一步查阅 [官方迁移指南](https://docs.nestjs.com/migration-guide)

## 模板快速上手

获取模板后根据 [支持环境变量](#支持环境变量) 说明先按需配置环境变量
