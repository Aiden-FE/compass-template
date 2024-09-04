import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import pkg from './package.json';

const IS_DEV = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outDir: 'types',
      tsconfigPath: './tsconfig.app.json',
    }),
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    Components({
      dirs: [],
      dts: './src/components.d.ts',
      resolvers: [IconsResolver()],
    }),
    svgLoader(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue,js,jsx,cjs,mjs}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{scss,css,vue}',
      },
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...(IS_DEV
        ? {
            vue: 'vue/dist/vue.esm-bundler.js',
          }
        : {}),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
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
      name: 'main',
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
});
