export interface Context {
  /**
   * @default zh-CN Resource
   */
  language: { [ns: string]: any };
  /**
   * @description 组件默认大小
   * @default middle
   */
  componentSize: 'small' | 'middle' | 'large';
}
