export * from './environment';
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
