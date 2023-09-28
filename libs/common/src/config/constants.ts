export const VALIDATION_OPTION = {
  transform: true, // 转换数据
  whitelist: true, // 剥离装饰器不验证的项目
  stopAtFirstError: true, // 遇见第一个错误时就停止验证
  // skipMissingProperties: true, // 跳过未定义或定义null的验证
  // disableErrorMessages: true, // 禁用详细错误信息
};

// 公开接口或类的元数据
export const IS_PUBLIC_KEY = 'public';

// 指定授权接口或类的元数据
export const AUTH_KEY = 'AUTH';

// 集中定义可用权限
export enum PERMISSIONS {}
