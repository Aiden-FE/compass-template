export interface EnvironmentVariables {
  /**
   * 环境变量
   * @default process.env.NODE_ENV | 'production'
   */
  NODE_ENV: 'development' | 'production';
  /**
   * API节流间隔
   * @default 60000
   */
  APP_THROTTLE_TTL: number;
  /**
   * 节流间隔内的限制次数
   * @default 60
   */
  APP_THROTTLE_LIMIT: number;
}
