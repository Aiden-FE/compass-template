const childProcess = require('child_process');
const { log, getArgvParam, writeFileSync, insertContent, deleteFileSync, replaceContent, deleteDir } = require('./utils');

const isHelp = getArgvParam('-h', false, { valueType: 'boolean' });
const usePM = getArgvParam('-pm', 'pnpm');
const isDestroy = getArgvParam('--destroy', false, { valueType: 'boolean' });

if (isHelp) {
  log(`
i18n SSR 初始化脚本帮助信息,next SSR的项目建议初始化后立即执行一次,且只执行一次:
node scripts/i18n-ssr.js [options]

options:
  --pm                                  指定包管理器,默认pnpm
  --destroy                             销毁SSR i18n
  -h                                    获取帮助信息

示例:
  node scripts/i18n-ssr.js              初始化SSR模式 i18n 
`);
  return;
}

const execOption = {
  stdio: 'inherit',
};

function handleDeps(isInit = true) {
  log(`开始${isInit ? '安装' : '卸载'}依赖`);
  try {
    childProcess.execSync(`${usePM} ${isInit ? 'add' : 'remove'} i18next next-i18next`, execOption);
    return true;
  } catch {
    return true;
  }
}

function handleSetupFile(isInit = true) {
  log(`开始${isInit ? '新建' : '删除'}配置文件`);
  const setupFilePath = './next-i18next.config.js';
  const nextSetupPath = './next.config.js';

  if (!isInit) {
    deleteFileSync(setupFilePath);
    replaceContent(
      nextSetupPath,
      /const \{ i18n }[\s\S]*?const nextConfig = {/gm,
      `/** @type {import('next').NextConfig} */
const nextConfig = {`,
    );
    replaceContent(
      nextSetupPath,
      /const nextConfig = \{[\s\S]*?reactStrictMode: true,/gm,
      `const nextConfig = {
  reactStrictMode: true,`,
    );
    return;
  }
  writeFileSync(
    setupFilePath,
    `/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    domains: [
      // Local test
      {
        domain: 'localhost',
        defaultLocale: 'zh-CN',
        http: true,
      },
    ],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: {
    default: ['zh-CN'],
  },
};
`,
  );
  insertContent(
    nextSetupPath,
    `const { i18n } = require('./next-i18next.config');

`,
  );
  replaceContent(
    nextSetupPath,
    /const nextConfig = \{[\s\S]*?reactStrictMode: true,/gm,
    `const nextConfig = {
  i18n,
  reactStrictMode: true,`,
  );
}

function handleLanguagesJSON(isInit = true) {
  log(`开始${isInit ? '生成' : '删除'}语言表`);
  const dirPath = 'public/locales/';
  const zhCNJSONPath = `${dirPath}/zh-CN/common.json`;
  const enJSONPath = `${dirPath}en/common.json`;

  if (!isInit) {
    deleteDir(dirPath);
    return;
  }
  writeFileSync(
    zhCNJSONPath,
    `{
  "currentLang": "当前语言是: {{ lang }}"
}`,
  );
  writeFileSync(
    enJSONPath,
    `{
  "currentLang": "The current language is: {{ lang }}"
}`,
  );
}

function handleDocument(isInit = true) {
  log(`开始${isInit ? '更新' : '还原'} i18n SSR文档`);
  log(`变更清单
${isInit ? 'Created' : 'Deleted'}\tnext-i18next.config.js
${isInit ? 'Created' : 'Deleted'}\tpublic/locales/zh-CN/common.json
${isInit ? 'Created' : 'Deleted'}\tpublic/locales/en/common.json
Modified\tnext.config.js
${isInit ? 'Added' : 'Removed'} dependencies: i18next next-i18next

i18n SSR模式国际化${isInit ? '安装' : '卸载'}完成`);
}

function installI18n() {
  handleDeps();
  handleSetupFile();
  handleLanguagesJSON();
  handleDocument();
}

function destroyI18n() {
  handleDeps(false);
  handleSetupFile(false);
  handleLanguagesJSON(false);
  handleDocument(false);
}

function main() {
  if (isDestroy) {
    destroyI18n();
  } else {
    installI18n();
  }
}

main();
