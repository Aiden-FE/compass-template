import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// @ts-ignore
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
    AutoImport({
      imports: ['react', 'react-i18next'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './src/.eslintrc-auto-import.json',
      },
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    Icons({
      // experimental
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
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
          @import "src/assets/styles/base/variables.scss";
        `,
      },
    },
  },
});
