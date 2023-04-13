import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    checker({
      eslint: {
        // lintCommand: 'eslint src --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue,js,jsx,cjs,mjs}" --fix', // for example, lint .ts & .tsx
      },
    }),
  ],
});
