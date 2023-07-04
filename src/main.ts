import type { App } from 'vue';
import Example from '@/components/app-example/app-example.vue';
import ConfigProvider from '@/components/config-provider/config-provider.vue';
import '@/assets/styles/global.scss';
import { useI18nService } from '@/services';

export default {
  install: (app: App) => {
    const { initI18n } = useI18nService();
    initI18n();
    app.component('AppExample', Example);
    app.component('AppExampleConfigProvider', ConfigProvider);
    return app;
  },
};
