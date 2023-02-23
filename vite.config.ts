import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import mockServer from 'vite-plugin-mock-server'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      include: resolve(__dirname, 'src/assets/locales/**')
    }),
    WindiCSS(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    AutoImport({
      // 全局导入
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dts: 'types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: 'types/.eslintrc-auto-import.json'
      }
    }),
    Components({
      dts: 'types/components.d.ts',
      dirs: ['src/components/'],
      resolvers: [IconsResolver(), VueUseComponentsResolver()]
    }),
    mockServer({
      logLevel: 'info'
    }),
    legacy({
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置本地代理服务
  // server: {
    // host: false, // host设置为true才可以使用network的形式，以ip访问项目
    // port: 3000, // 端口号
    // cors: true, // 跨域设置允许
    // 接口代理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080/',
    //     changeOrigin: true, // 允许跨域
    //     rewrite: (path) => path.replace('/api/', '/'),
    //   },
    // },
  // },
  build: {
    minify: 'terser',
    // 在生产环境移除console.log debugger
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: ['console.log'],
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  }
})
