export interface IYAMLConfig {
  // https://github.com/nestjs/throttler
  throttle?: {
    ttl?: number;
    limit?: number;
  };
}
