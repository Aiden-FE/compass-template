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
