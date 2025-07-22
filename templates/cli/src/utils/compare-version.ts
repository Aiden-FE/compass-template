/**
 * @description 比较两个版本的大小
 * @category Tools
 * @param currentVersion 当前版本
 * @param comparedVersion 比较的版本
 * @param trimSymbolPattern 匹配正则,符合条件的字符在移除后进行比较,默认匹配v字符
 * @return {1 | -1 | 0} 1大于比较版本;-1小于比较版本;0等于比较版本
 * @example
 *   compareVersion('v1.0.0', '2.0.0') // return -1
 *   compareVersion('a2.0.0', 'B1.0.0', /a|b/ig) // return 1
 *   compareVersion('v1.0.0', 'V1.0.0') // return 0
 */
export default function compareVersion(currentVersion: string, comparedVersion: string, trimSymbolPattern = /v/gi) {
  const currentVersionClone = currentVersion.replace(trimSymbolPattern, '');
  const compareVersionClone = comparedVersion.replace(trimSymbolPattern, '');
  const v1 = currentVersionClone.split('.');
  const v2 = compareVersionClone.split('.');
  const maxLen = Math.max(v1.length, v2.length);

  // 调整两个版本号位数相同
  while (v1.length < maxLen) {
    v1.push('0');
  }
  while (v2.length < maxLen) {
    v2.push('0');
  }

  // 循环判断每位数的大小
  for (let i = 0; i < maxLen; i += 1) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
