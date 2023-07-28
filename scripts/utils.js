const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

function log(str) {
  childProcess.execSync(`echo "[I18n Script]: ${str}"`, { stdio: 'inherit' });
}

/**
 * @description 获取命令参数
 * @param {string} param 参数名
 * @param [defaultValue] 默认值
 * @param [opt] 配置项 valueType 值类型 validator 值校验
 *   valueType?: 'string' | 'number' | 'boolean'
 *   validator?: (value: string) => boolean | string
 * @return {*|string|boolean}
 */
function getArgvParam(param, defaultValue = undefined, opt = {}) {
  const option = {
    valueType: 'string',
    ...opt,
  };
  const valueIndex = process.argv.indexOf(param);

  if (option.valueType === 'boolean') {
    return valueIndex !== -1;
  }
  if (valueIndex === -1) {
    return defaultValue;
  }

  const value = process.argv[valueIndex + 1];

  if (option.validator) {
    const valid = option.validator(value);
    if (valid !== true) {
      throw new Error(valid || `参数${param}的值验证失败`);
    }
  }
  return value || defaultValue;
}

function writeFileSync(filePath, content) {
  // 获取目录路径并创建目录
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  // 写入文件
  fs.writeFileSync(filePath, content);
}

function deleteFileSync(filePath) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch {
    return true;
  }
}

function deleteDir(filePath) {
  try {
    fs.rmSync(filePath, { recursive: true, force: true });
    return true;
  } catch {
    return true;
  }
}

function replaceContent(filePath, match, replacement) {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const result = fileData.replace(new RegExp(match, 'g'), replacement);
    writeFileSync(filePath, result);
  } catch (err) {
    console.error(err);
  }
}

function insertContent(filePath, content, position = 'start') {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    writeFileSync(filePath, position === 'start' ? content + fileData : fileData + content);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  log,
  getArgvParam,
  writeFileSync,
  deleteFileSync,
  deleteDir,
  replaceContent,
  insertContent,
};
