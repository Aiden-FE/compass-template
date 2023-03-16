export type LocaleConfig = { [key: string]: string | LocaleConfig };

export type ComponentSize = 'small' | 'middle' | 'large';

export type GlobalContext = {
  /**
   * @description 组件默认大小
   * @default middle
   */
  componentSize?: ComponentSize;
  /**
   * @description 语言映射表,不指定则采用默认语言表
   */
  locale?: LocaleConfig;
};
