import { Languages } from '@/config';
import type { Ref } from 'vue';

/** ConfigProvider 组件向子孙组件传递的参数 */
export interface ConfigProviderOption {
  lang: Languages;
  changeLanguage: (lang: Languages) => void;
}

/** ConfigProvider 组件接受的参数 */
export interface ConfigProviderProps extends Partial<ConfigProviderOption> {}

/** ConfigProvider 组件对外的事件 */
export interface ConfigProviderEmits {
  (e: 'langChange', lang: Languages): void;
}

/** ConfigProvider 组件实例对外的属性方法 */
export interface ConfigProviderExpose {
  getConfig: () => Readonly<Ref<ConfigProviderOption>>;
}
