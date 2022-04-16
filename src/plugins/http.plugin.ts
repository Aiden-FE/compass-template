import { App } from 'vue';
import { Http } from '~/http';

export const HTTP_PROVIDE_KEY = 'Http';

export default function injectHttp(app: App) {
  app.provide(HTTP_PROVIDE_KEY, Http);
}
