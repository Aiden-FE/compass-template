export * from './app-response';

export function setCookieOnClient(
  name: string,
  value: string,
  options?: {
    path?: string;
    expiresIn?: number;
  },
) {
  const { path, expiresIn } = {
    path: '/',
    expiresIn: undefined,
    ...options,
  };
  // 将时间转换为到期时间的UTC字符串（如果天数为正数）
  let expires = '';
  if (expiresIn !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn);
    expires = `; expires=${date.toUTCString()}`;
  }
  // 设置cookie
  document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
}
