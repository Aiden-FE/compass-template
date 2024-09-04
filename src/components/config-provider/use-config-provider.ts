import { inject, type Ref, ref } from 'vue';
import { CONFIG_SYMBOL, getDefaultConfig, type IConfigProvider } from '@/components/config-provider/base';

export default function useConfigProvider() {
  const config = inject<Ref<IConfigProvider>>(CONFIG_SYMBOL, ref(getDefaultConfig()));

  /**
   * 语言包使用方法
   * @param key 文本索引key 建议使用可读key
   * @param params 参数变量
   * @returns
   */
  function t(key: string, params?: Record<string, string>) {
    const msg = config?.value?.locale?.[key] || key;
    if (!msg || !params) {
      return msg;
    }
    return Object.keys(params).reduce((lastString, currentKey) => {
      const currentValue = params[currentKey];
      // eslint-disable-next-line no-useless-escape
      const reg = new RegExp(`{[\\s\x20]*(${currentKey})[\\s\x20]*}`, 'g');
      // eslint-disable-next-line no-param-reassign
      lastString = lastString.replace(reg, currentValue);
      return lastString;
    }, msg);
  }

  return {
    config,
    t,
  };
}
