import get from 'lodash-es/get';
import { getConfig } from './config';
import { replaceVariablesInString } from './utils';

/**
 * @param key
 * @param params 替换的变量
 * @example
 * // zh-CN.json
 * {
 *   "test": "测试",
 *   "msg": { "test": "测试插值 {{ msg }}" },
 * }
 * // usage
 * import zhCN from './zh-CN.json';
 * setupConfig({ locale: zhCN });
 * translate('test');
 * translate('msg.test', { msg: 'hello world' });
 */
export function translate(key: string, params?: Record<string, string>): string {
  const ctx = getConfig();
  let str = get(ctx.locale, key);
  if (!str || typeof str !== 'string') return key;
  if (params) {
    str = replaceVariablesInString(str, params);
  }
  return str;
}
