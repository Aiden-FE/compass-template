import { App } from 'vue';
import router from '~/router';
import './global-styles.plugin';

export default function injectPlugins(app: App<Element>) {
  app.use(router);
  return app;
}
