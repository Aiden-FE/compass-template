import { kebabCase } from 'es-toolkit';
import * as Components from './components/index';
import '@/assets/styles/global.scss';

export * from './components/index';

export default {
  install(app: any) {
    Object.keys(Components).forEach((key) => {
      app.component(kebabCase(key), (Components as Record<string, any>)[key]);
    });
  },
};
