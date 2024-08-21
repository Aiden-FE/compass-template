export interface GRModuleOptions {
  secret: string;
}

export interface GRModuleVerifyOptions {
  response: string;
  score?: number;
  remoteip?: string;
  apiUrl?: string;
}
