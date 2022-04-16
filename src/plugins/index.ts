import { App } from 'vue';
import router from '~/router';
import store from '~/store';
import './global-styles.plugin';
import injectI18n from './i18n.plugin';
import injectTheme from './theme.plugin';
import injectHttp from './http.plugin';

export default function injectPlugins(app: App<Element>) {
  app.use(store).use(router);
  injectI18n(app);
  injectTheme(app);
  injectHttp(app);
  return app;
}
