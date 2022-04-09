/** 模板仓库根路径 */
export const TEMPLATE_REPO_ROOT = 'Aiden-FE/compass-template'

/** 模板分支映射 */
export const TEMPLATE_REPO_BRANCH_MAPPING = {
  styles: 'template/styles',
  utils: 'template/utils',
  cli: 'template/cli'
}

/** 模板替换的文件路径 */
const COMMON_FILES_PATH: string[] = [
  'package.json',
  'README.md',
]
export const TEMPLATE_REPLACE_FILES_PATH = {
  styles: COMMON_FILES_PATH.concat([]),
  utils: COMMON_FILES_PATH.concat([]),
  cli: COMMON_FILES_PATH.concat([]),
}
