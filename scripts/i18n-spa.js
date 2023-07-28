const childProcess = require('child_process');
const { log, getArgvParam, writeFileSync, deleteFileSync } = require('./utils');

const isHelp = getArgvParam('-h', false, { valueType: 'boolean' });
const usePM = getArgvParam('-pm', 'pnpm');
const isDestroy = getArgvParam('--destroy', false, { valueType: 'boolean' });

if (isHelp) {
  console.log(`
i18n SPA 初始化脚本帮助信息,next output=export的项目建议初始化后立即执行一次,且只执行一次:
node scripts/i18n-spa.js [options]

options:
  --pm                                  指定包管理器,默认pnpm
  --destroy                             销毁SPA i18n
  -h                                    获取帮助信息

示例:
  node scripts/init-i18n-spa.js         初始化SPA模式 i18n 
`);
  return;
}

const execOption = {
  stdio: 'inherit',
};

function handleDeps(isInstall = true) {
  log(`开始${isInstall ? '安装' : '卸载'}依赖`);
  childProcess.execSync(
    `${usePM} ${isInstall ? 'add' : 'remove'} i18next i18next-browser-languagedetector react-i18next`,
    execOption,
  );
}

function handleDeclareFile(isInstall = true) {
  log(`开始${isInstall ? '写入' : '删除'}类型声明文件`);
  const filePath = './i18n.d.ts';
  if (!isInstall) {
    deleteFileSync(filePath);
    return;
  }
  writeFileSync(
    filePath,
    `
import type { UseTranslationResponse, UseTranslationOptions, FallbackNs } from 'react-i18next';
import type { FlatNamespace, KeyPrefix, TOptionsBase } from 'i18next';
import type { $Tuple } from 'react-i18next/helpers';

declare module 'react-i18next' {
  function useTranslation<
    Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
  >(
    ns?: Ns,
    option?: UseTranslationOptions<KPrefix>,
  ): Omit<UseTranslationResponse<FallbackNs<Ns>, KPrefix>, 't'> & {
    t: (key: string | string[], option: TOptionsBase & { [key: string]: unknown }) => string;
  };
}
  `);
}

function installI18n() {
  handleDeps();
  handleDeclareFile();
}

function destroyI18n() {
  handleDeps(false);
  handleDeclareFile(false);
}

function main() {
  if (isDestroy) {
    destroyI18n();
  } else {
    installI18n();
  }
}

main();
