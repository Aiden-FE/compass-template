const childProcess = require('child_process');
const { log, getArgvParam, writeFileSync, deleteDir, deleteFileSync, replaceContent } = require('./utils');

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
  node scripts/i18n-spa.js              初始化SPA模式 i18n 
`);
  return;
}

const execOption = {
  stdio: 'inherit',
};

function handleDeps(isInstall = true) {
  log(`开始${isInstall ? '安装' : '卸载'}依赖`);
  try {
    childProcess.execSync(
      `${usePM} ${isInstall ? 'add' : 'remove'} i18next i18next-browser-languagedetector react-i18next`,
      execOption,
    );
    return true;
  } catch {
    return true;
  }
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
    `import type { UseTranslationResponse, UseTranslationOptions, FallbackNs } from 'react-i18next';
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
}`,
  );
}

function handleLanguagesJSON(isInstall = true) {
  log(`开始${isInstall ? '生成' : '删除'}语言表`);
  const dirPath = 'src/assets/locales/';
  const zhCNJSONPath = `${dirPath}zh-CN.json`;
  const enJSONPath = `${dirPath}en.json`;
  if (!isInstall) {
    deleteDir(dirPath);
    return;
  }
  writeFileSync(
    zhCNJSONPath,
    `{
  "msg": {
    "common": {
      "currentLang": "当前语言是: {{ lang }}"
    }
  }
}`,
  );
  writeFileSync(
    enJSONPath,
    `{
  "msg": {
    "common": {
      "currentLang": "The current language is: {{ lang }}"
    }
  }
}`,
  );
}

function handleI18nProvideScript(isInstall = true) {
  log(`开始${isInstall ? '生成' : '删除'} i18n 注入脚本`);
  const dirPath = 'src/plugins/';
  const entryPath = `${dirPath}index.ts`;
  const i18nPath = `${dirPath}i18n.plugin.ts`;
  const examplePath = 'src/components/i18n-example/i18n-example.tsx';
  if (!isInstall) {
    deleteFileSync(i18nPath);
    writeFileSync(
      entryPath,
      `export default async function providePlugins() {
  // 初始化注入插件
}
`,
    );
    writeFileSync(
      examplePath,
      `function I18nExample() {
  return null;
}

export default I18nExample;
`,
    );
    return;
  }
  writeFileSync(
    i18nPath,
    `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AvailableLanguages, IS_DEV } from '@/config';
import zhCN from '@/assets/locales/zh-CN.json';
import EN from '@/assets/locales/en.json';

export default function provideI18nPlugin() {
  return (
    i18n
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(LanguageDetector)
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        debug: IS_DEV,
        fallbackLng: AvailableLanguages.ZH_CN,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
          [AvailableLanguages.ZH_CN]: {
            translation: zhCN,
          },
          [AvailableLanguages.EN]: {
            translation: EN,
          },
        },
      })
  );
}
`,
  );

  writeFileSync(
    entryPath,
    `import provideI18nPlugin from './i18n.plugin';

export default async function providePlugins() {
  await provideI18nPlugin();
}
`,
  );

  writeFileSync(
    examplePath,
    `'use client';

import { useTranslation } from 'react-i18next';
import { AvailableLanguages } from '@/config';

function I18nExample() {
  const { t, i18n } = useTranslation();

  function toggleLang(lang: AvailableLanguages) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <div>{t('msg.common.currentLang', { lang: i18n.resolvedLanguage })}</div>
      <div>
        <button onClick={() => toggleLang(AvailableLanguages.ZH_CN)} type="button">
          使用中文
        </button>
        <button onClick={() => toggleLang(AvailableLanguages.EN)} type="button">
          Use English
        </button>
      </div>
    </>
  );
}

export default I18nExample;
`,
  );
}

function handleDocument(isInstall = true) {
  log(`开始${isInstall ? '更新' : '还原'} i18n SPA文档`);
  const readmePath = './README.md';
  const originContent = `### 国际化

> 如果您是SPA构建目标,请执行\`pnpm i18n:spa\`,如果您是SSR构建目标,请执行\`pnpm i18n:ssr\` 来初始化i18n相关内容

### 支持 Eslint 更健壮的代码检查`;

  const content = `### 国际化

国际化语言表存放于\`src/assets/locales/<Language>.json\`路径下

需要注册新的语言表则在\`src/plugins/i18n.plugin.ts\`参考其他语言添加进配置内

语言使用示例如下:

\`\`\`tsx
import { useTranslation } from 'react-i18next';
import { AvailableLanguages } from '@/config';

function ExamplePage() {
  const { t, i18n } = useTranslation();

  function toggleLang(lang: AvailableLanguages) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <div>{t('msg.common.currentLang', { lang: i18n.resolvedLanguage })}</div>
      <div>
        <button onClick={() => toggleLang(AvailableLanguages.ZH_CN)} type="button">
          使用中文
        </button>
        <button onClick={() => toggleLang(AvailableLanguages.EN)} type="button">
          Use English
        </button>
      </div>
    </>
  );
}

export default ExamplePage;
\`\`\`

### 支持 Eslint 更健壮的代码检查`;

  replaceContent(
    readmePath,
    /### 国际化[\s\S]*?### 支持 Eslint 更健壮的代码检查/gm,
    isInstall ? content : originContent,
  );

  log(`
${isInstall ? 'Created' : 'Deleted'}\ti18n.d.ts
${isInstall ? 'Created' : 'Deleted'}\tsrc/assets/locales/en.json
${isInstall ? 'Created' : 'Deleted'}\tsrc/assets/locales/zh-CN.json
Modified\tsrc/components/i18n-example/i18n-example.tsx
Modified\tsrc/plugins/index.ts
Modified\tREADME.md
${isInstall ? 'Added' : 'Removed'} dependencies: i18next i18next-browser-languagedetector react-i18next

i18n SPA模式国际化${isInstall ? '安装' : '卸载'}完成`);
}

function installI18n() {
  handleDeps();
  handleDeclareFile();
  handleLanguagesJSON();
  handleI18nProvideScript();
  handleDocument();
}

function destroyI18n() {
  handleDeps(false);
  handleDeclareFile(false);
  handleLanguagesJSON(false);
  handleI18nProvideScript(false);
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
