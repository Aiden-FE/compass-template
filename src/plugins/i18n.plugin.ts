import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

export default function injectI18n(app: App) {
  const i18n = createI18n({
    locale: navigator.language,
    fallbackLocale: 'zh-CN',
    messages,
  });
  app.use(i18n);
}
