import json from '@rollup/plugin-json'
import ts from "rollup-plugin-ts";
import {builtinModules} from "module";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import summary from "rollup-plugin-summary";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import pkg from './package.json'

const isProd = !process.env.ROLLUP_WATCH;

/**
 * @description 获取构建插件
 * @param {('serve'|'nodeResolve'|'commonjs'|'compiler'|'terser'|'cleanup'|'summary')[]} disablePlugins 待禁用的插件
 * @return {(Plugin|false|{generateBundle: generateBundle, name: string})[]}
 */
function getPlugins(disablePlugins = []) {
  return [
    json(),
    ts(),
    !disablePlugins.includes('serve') && !isProd && serve({
      port: 3000,
      contentBase: '.'
    }),
    !disablePlugins.includes('nodeResolve') && isProd && nodeResolve({ browser: true }),
    !disablePlugins.includes('commonjs') && isProd && commonjs(),
    !disablePlugins.includes('terser') && isProd && terser(),
    !disablePlugins.includes('cleanup') && isProd && cleanup({ comments: 'none' }),
    !disablePlugins.includes('summary') && isProd && summary({
      totalLow: 1024 * 8,
      totalHigh: 1024 * 20,
      showBrotliSize: true,
      showGzippedSize: true,
      showMinifiedSize: true,
    }),
  ];
}

/**
 * @description 获取要排除的外部选项
 * @param {string[]} additionalExternal
 * @return {string[]}
 */
function getExternal(additionalExternal = []) {
  return [...builtinModules].concat(additionalExternal || []);
}

/**
 * @description 获取输出配置项
 * @param options 文档: https://www.rollupjs.com/guide/big-list-of-options
 * @return {Record<string, unknown>}
 */
function getOutput(
  options = { format: 'es' }
) {
  return {
    dir: 'dist',
    chunkFileNames: 'bundle/chunk.[format].[hash].js',
    entryFileNames: '[name].[format].js',
    sourcemap: isProd,
    ...options,
  }
}

export default [
  isProd && {
    input: 'src/main.ts',
    output: getOutput({
      format: 'umd',
      file: pkg.main,
      name: pkg.name,
      dir: undefined,
      chunkFileNames: undefined,
      entryFileNames: undefined,
    }),
    external: getExternal(),
    plugins: getPlugins(),
  },
  {
    input: 'src/main.ts',
    output: getOutput({
      entryFileNames: pkg.module.replace('dist/', ''),
    }),
    external: getExternal(),
    plugins: getPlugins(),
    watch: {
      include: ['src/**', 'index.html'],
    },
  },
].filter(item => !!item);
