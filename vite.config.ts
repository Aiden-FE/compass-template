import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import autoprefixer from 'autoprefixer';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   fs: {
  //     strict: false, // 本地link其他包时放开
  //   },
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //   },
  // },
  plugins: [
    vue(),
    svgLoader(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './src/.eslintrc-auto-import.json',
      },
    }),
    Components({
      dts: './src/components.d.ts',
      resolvers: [
        IconsResolver(),
      ],
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, 'src/assets/locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@compass-aiden/styles/dist/static/bem.scss";
          @import "@/assets/styles/vars.scss";
        `,
      },
    },
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
});
