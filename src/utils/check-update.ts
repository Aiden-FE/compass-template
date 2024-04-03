import { compareVersion } from '@compass-aiden/helpers/cjs';
import { getRepoInfoFromNpm } from '@/http';

/**
 * @description 检查新版本
 * @param npmLibName npm 包名
 * @param currentVersion 当前版本
 * @returns 存在新版本则返回新的版本号,否则返回undefined
 */
export default async function checkUpdate(npmLibName: string, currentVersion: string): Promise<string | undefined> {
  const releases = await getRepoInfoFromNpm(npmLibName);
  if (!releases?.['dist-tags']?.latest) {
    return undefined;
  }
  const latestVersion = releases['dist-tags'].latest;
  if (compareVersion(currentVersion, latestVersion) >= 0) {
    return undefined;
  }
  return latestVersion;
}
