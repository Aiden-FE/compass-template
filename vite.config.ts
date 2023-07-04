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
import tailwindcss from 'tailwindcss';
import eslint from 'vite-plugin-eslint'

const IS_DEV = process.env.NODE_ENV === 'development';

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
    eslint({
      fix: true,
      failOnWarning: false,
      failOnError: false,
    }),
    svgLoader(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    AutoImport({
      imports: ['vue'],
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...(IS_DEV ? {
        vue: 'vue/dist/vue.esm-bundler.js',
      } : {}),
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
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'AIChat',
      fileName: (format) => `ai-chat.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
