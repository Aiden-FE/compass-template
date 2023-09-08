import { readFileSync } from 'fs';
import { resolve } from '@app/common/utils';
import { IS_DEV } from '@app/common/config/constants';
import { Logger } from '@nestjs/common';
import { cloneDeep, merge } from 'lodash';
import { parse } from 'yaml';
import { IYAMLConfig } from '@app/common/interfaces';

let configBuffer: string;

let YAMLConfig: IYAMLConfig = {};

let isInit = false;

export function initYAMLConfig() {
  if (isInit) {
    return;
  }
  try {
    if (!configBuffer) {
      const configFile = process.env.CONFIG_YAML || `config.${IS_DEV ? 'dev' : 'prod'}.yml`;
      configBuffer = readFileSync(resolve(configFile), { encoding: 'utf-8' });
    }
  } catch (e) {
    Logger.warn('配置文件读取失败', e);
  }

  YAMLConfig = merge({}, configBuffer ? parse(configBuffer) : undefined);
  // 设置env环境变量
  if (YAMLConfig.env) {
    Object.keys(YAMLConfig.env).forEach((key) => {
      process.env[key] = YAMLConfig.env[key];
    });
  }
  isInit = true;
}

export function getYAMLConfig(): IYAMLConfig {
  if (!isInit) {
    initYAMLConfig();
  }
  return cloneDeep(YAMLConfig);
}
