import { ClientOptions, ClientProxyFactory, Transport } from '@nestjs/microservices';

/**
 * 微服务配置
 *
 * @description
 * 接口请求规格为 `/${ROUTE_BASE_PREFIX}/${microservice.prefix}/other-paths`
 *
 * 网关收到请求后根据 `microservice.prefix` 转发到对应的微服务,
 * 转发时移除 `/${ROUTE_BASE_PREFIX}/${microservice.prefix}` 前缀
 *
 * 微服务实际收到的为 { cmd: `${http_method}:/other-paths` } 进行匹配
 */
export const MicroservicesConfig = [
  {
    name: 'MICROSERVICE_A',
    prefix: 'a',
    options: {
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICE_A_HOST ?? 'localhost',
        port: Number(process.env.MICROSERVICE_A_PORT ?? 8081),
      },
    },
  },
] satisfies {
  name: string;
  /**
   * 微服务接口前缀, 例如 `/a/v1/profile` 中的 `a`,值可以是 `/a` 或 `a`
   */
  prefix: string;
  options: Parameters<typeof ClientProxyFactory.create>[0] | (ClientOptions & { transport: Transport });
}[];
