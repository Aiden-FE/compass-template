export { addRequestInterceptor, addResponseInterceptor } from './core';

/** 获取用户信息 */
export async function geUserInfo(): Promise<any> {
  return uni.request({
    method: 'POST',
    url: '/api/v1/user/info',
    // 可以在 meta 上追加自定义参数以便全局拦截器精确控制
    // meta: {},
  });
}
