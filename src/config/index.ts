export const IS_DEV = process.env.NODE_ENV === 'development';

export enum AvailableTheme {
  /** 跟随系统主题变化 */
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AvailableLanguages {
  ZH = 'zh',
  EN = 'en',
}

export enum AvailableLanguagesNS {
  COMMON = 'common',
}

export const Languages = [AvailableLanguages.ZH, AvailableLanguages.EN];
