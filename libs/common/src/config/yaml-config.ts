import { readFileSync } from 'fs';
import { resolve } from '@app/common/utils';
import { IS_DEV } from '@app/common/config/constants';
import { Logger } from '@nestjs/common';
import { merge } from 'lodash';
import { parse } from 'yaml';
import { IYAMLConfig } from '@app/common/interfaces';

let configBuffer: string;

try {
  if (!configBuffer) {
    const configFile = process.env.CONFIG_YAML || `config.${IS_DEV ? 'dev' : 'prod'}.yml`;
    configBuffer = readFileSync(resolve(configFile), { encoding: 'utf-8' });
  }
} catch (e) {
  Logger.warn('配置文件读取失败', e);
}

const YAMLConfig = merge({}, configBuffer ? parse(configBuffer) : undefined);

export function getYAMLConfig(): IYAMLConfig {
  return YAMLConfig;
}
