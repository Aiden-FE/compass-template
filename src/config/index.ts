import ThemeConfig from './theme.json';

export const IS_DEV = process.env.NODE_ENV === 'development';

export enum AvailableTheme {
  /** 跟随系统主题变化 */
  AUTO = 'default',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AvailableLanguages {
  ZH_CN = 'zh-CN',
  EN = 'en',
}

export enum AvailableLanguagesNS {
  COMMON = 'common',
}

export const Languages = [AvailableLanguages.ZH_CN, AvailableLanguages.EN];

export { ThemeConfig };
