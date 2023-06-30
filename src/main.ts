import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { Languages } from '@/interfaces';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createI18n({
    locale: Languages.zhCN,
    fallbackLocale: Languages.zhCN,
    messages,
  }),
);

app.mount('#app');
