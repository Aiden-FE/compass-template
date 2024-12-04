/**
 * 导入 esm 模块
 * @param moduleName esm 模块名称
 * @returns 模块导出数据
 */
export function importESM(moduleName: string): Promise<any> {
  return eval(`import('${moduleName}')`);
}

/**
 * 随机生成指定位数的字符串
 * @param length 生成长度
 * @returns string
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
