import defaultLocale from '@/constants/locale.json';

export const CONFIG_SYMBOL = Symbol('config');

export interface IConfigProvider {
  /** 语言包 */
  locale: Record<string, string>;
}

export const getDefaultConfig = () =>
  ({
    locale: defaultLocale,
  }) as IConfigProvider;
