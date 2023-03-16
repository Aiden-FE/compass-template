import merge from 'lodash-es/merge';
import { GlobalContext } from '@/interfaces';
import { GLOBAL_DOMAIN } from '@/config';
import zhCN from '@/assets/locales/zh-CN.json';

const DEFAULT_CONFIG: GlobalContext = {
  componentSize: 'middle',
  locale: zhCN,
};

export function setupConfig(config: GlobalContext) {
  const win = window || global;
  let ctx: GlobalContext | undefined = win[GLOBAL_DOMAIN];
  ctx = merge({}, DEFAULT_CONFIG, ctx, config);
  win[GLOBAL_DOMAIN] = ctx;
}

export function getConfig(): GlobalContext {
  const win = window || global;
  if (!win[GLOBAL_DOMAIN]) {
    setupConfig(DEFAULT_CONFIG);
    return win[GLOBAL_DOMAIN];
  }
  return win[GLOBAL_DOMAIN];
}

export function destroyConfig() {
  const win = window || global;
  delete win[GLOBAL_DOMAIN];
}
