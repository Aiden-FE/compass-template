import 'virtual:windi.css';
// Devtools: https://windicss.org/integrations/vite.html#design-in-devtools
import 'virtual:windi-devtools';
import { createApp } from 'vue';
import router from '~/router';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import App from './App.vue';
import store from './store';

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'zh-CN',
  messages,
});

const app = createApp(App);

app.use(store)
  .use(router)
  .use(i18n);

app.mount('#app');
