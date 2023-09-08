export interface IYAMLConfig {
  env?: {
    [key: string]: string;
  };
  // https://github.com/nestjs/throttler
  throttle?: {
    ttl?: number;
    limit?: number;
  };
}
