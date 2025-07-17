export * from './http-response';
export * from './pagination';

export interface AuthInfo {
  userId: string;
  userName?: string;
  permissions?: string[];
}
