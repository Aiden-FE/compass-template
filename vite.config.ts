import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'
import eslintPlugin from "@nabla/vite-plugin-eslint"
import mockServer from 'vite-plugin-mock-server'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

/**
 * https://vitejs.dev/config/
 * @todo 如果目标是组件库,可采用vite-plugin-vue-docs生成文档
 */
export default defineConfig({
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '~': resolve(__dirname, 'src'),
    }
  },
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    WindiCSS(),
    eslintPlugin({
      eslintOptions: {
        fix: true
      }
    }),
    mockServer({
      logLevel: 'off'
    }),
    AutoImport({
      // 全局导入
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: 'src/types/.eslintrc-auto-import.json'
      }
    }),
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [IconsResolver(), VueUseComponentsResolver()]
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: "@import \"~/assets/styles/variables.styl\";",
        javascriptEnabled: true,
      }
    }
  },
  server: {
    host: false, // host设置为true才可以使用network的形式，以ip访问项目
    port: 3000, // 端口号
    cors: true, // 跨域设置允许
    // 接口代理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080/',
    //     changeOrigin: true, // 允许跨域
    //     rewrite: (path) => path.replace('/api/', '/'),
    //   },
    // },
  },
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
  }
})
