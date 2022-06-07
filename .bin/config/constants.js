/** 模板替换的文件路径 */
const COMMON_FILES_PATH = [
  'package.json',
  'README.md',
];

/** 模板仓库根路径 */
exports.TEMPLATE_REPO_ROOT = 'Aiden-FE/compass-template';

/** 构建目标 */
exports.INQUIRE_TARGET_CHOICES = [
  { name: 'style project', value: 'styles', description: '样式包构建工程' },
  { name: 'script project', value: 'utils', description: '通用 ES or CommonJs包构建工程' },
  { name: 'cli project', value: 'cli', description: '脚手架工程' },
  { name: 'vue3 project', value: 'vue3', description: 'Vue3项目工程' },
];

/** 模板分支映射 */
exports.TEMPLATE_REPO_BRANCH_MAPPING = {
  styles: 'template/styles',
  utils: 'template/utils',
  cli: 'template/cli',
  vue3: 'template/vue3-ts',
};

exports.TEMPLATE_REPLACE_FILES_PATH = {
  styles: COMMON_FILES_PATH.concat([]),
  utils: COMMON_FILES_PATH.concat([]),
  cli: COMMON_FILES_PATH.concat([]),
  vue3: COMMON_FILES_PATH.concat([]),
};

