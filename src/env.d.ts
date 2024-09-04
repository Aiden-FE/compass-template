/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module 'vue-i18n' {
  import VueI18n, { createI18n, useI18n } from 'vue-i18n/dist/vue-i18n.d.ts';

  export { createI18n, useI18n };

  export default VueI18n;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
