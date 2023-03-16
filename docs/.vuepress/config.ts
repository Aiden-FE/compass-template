import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { resolve } from 'node:path';

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "文档演示",
      description: "vuepress-theme-hope 的文档演示",
    },
  },

  theme,

  // pagePatterns: [
  //   resolve(__dirname, '../../src/components/**/*.md')
  // ]
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules", resolve(__dirname, '../../src/components/**/*.md')],

  // Enable it with pwa
  // shouldPrefetch: false,
});
