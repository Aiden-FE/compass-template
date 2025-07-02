# Nestjs 微服务模板

- [Nestjs 微服务模板](#nestjs-微服务模板)
  - [快速开始](#快速开始)
  - [功能特性](#功能特性)
    - [支持环境变量](#支持环境变量)
    - [基于Fastify高性能的网关](#基于fastify高性能的网关)
    - [接口入参校验及转换](#接口入参校验及转换)
    - [网关限流保护](#网关限流保护)
    - [日志中间件](#日志中间件)

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
@Controller()
export class ExampleController {
  /**
   * @description 转换配置详见 @app/common 中的 VALIDATION_OPTION 配置
   */
  @MessagePattern({ cmd: 'GET:/test' })
  test(@Query() query: CDto) {
    return 'Hello world.';
  }
}
```

更多详细用法参考: [Nest Validator](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

### 网关限流保护

网关侧统一限流, 默认配置为 1 分钟内最多请求 100 次,可针对不同接口配置不同的限流规则

配置位于 `libs/common/src/constants/throttlers.ts` 内,default 为默认配置.

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
 *   ['接口路径(不含ROUTE_BASE_PREFIX 前缀)']: {
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
