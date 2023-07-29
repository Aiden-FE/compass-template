import ThemeConfig from './theme.json';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const IS_CLIENT = typeof window !== 'undefined';

export enum AvailableTheme {
  /** 跟随系统主题变化 */
  AUTO = 'default',
  LIGHT = 'light',
  DARK = 'dark',
}

export { ThemeConfig };
