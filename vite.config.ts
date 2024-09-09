import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    svgLoader(),
    Components({
      dts: './src/components.d.ts',
      resolvers: [
        IconsResolver(),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/vars.scss";
        `,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
