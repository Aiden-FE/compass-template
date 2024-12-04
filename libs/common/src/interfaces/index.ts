export * from './http-response';
export * from './pagination';

export interface MicroServiceRequest<Body = any, Query = any> {
  headers: any;
  query: Query;
  body: Body;
  ip?: string;
  ips?: string[];
  user?: any | null;
}

/** FIXME: 请根据实际验签通过的 req.user 类型补充定义 */
export interface UserContext {
  exp: number;
  permissions: string[];
}
