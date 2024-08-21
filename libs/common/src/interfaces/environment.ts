export interface EnvironmentVariablesDto {
  /**
   * 环境变量
   * @default process.env.NODE_ENV | 'production'
   */
  NODE_ENV?: 'development' | 'production';
  /**
   * API节流间隔 毫秒单位
   * @default 60000
   */
  APP_THROTTLE_TTL?: number;
  /**
   * 节流间隔内的限制次数
   * @default 60
   */
  APP_THROTTLE_LIMIT?: number;
  /**
   * 应用隐私数据密钥, 默认值仅用于演示,生产请勿使用默认值
   * @default Date.now().toString()
   */
  APP_PRIVATE_SECRET?: string;
}

// 与默认值合并后的环境变量声明
export type EnvironmentVariables = EnvironmentVariablesDto &
  Required<Pick<EnvironmentVariablesDto, 'NODE_ENV' | 'APP_THROTTLE_TTL' | 'APP_THROTTLE_LIMIT' | 'APP_PRIVATE_SECRET'>>;
