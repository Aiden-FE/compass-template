const childProcess = require('child_process');
const { log, getArgvParam, writeFileSync, deleteDir, deleteFileSync, replaceContent } = require('./utils');

const isHelp = getArgvParam('-h', false, { valueType: 'boolean' });

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

function main() {}

main();
