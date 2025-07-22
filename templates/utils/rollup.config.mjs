import { builtinModules } from 'module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import json from '@rollup/plugin-json';
import ts from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import summary from 'rollup-plugin-summary';
import { visualizer } from 'rollup-plugin-visualizer';
import alias from '@rollup/plugin-alias';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = path.join(dirname, 'package.json');
const { name } = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));

const IS_PROD = !process.env.ROLLUP_WATCH;

/**
 * @description 获取构建插件
 * @typedef {import('rollup').Plugin} Plugin
 * @param {Record<'json'|'ts'|'nodeResolve'|'commonjs'|'terser'|'cleanup'|'summary'|'visualizer', object>} [options]
 * @param {('json'|'ts'|'nodeResolve'|'commonjs'|'terser'|'cleanup'|'summary'|'visualizer')[]} [ignorePlugins]
 * @returns {Plugin[]}
 */
function getPlugins(options = {}, ignorePlugins = []) {
  return [
    !ignorePlugins.includes('alias') && alias({
      entries: {
        '@': path.resolve(dirname, 'src'),
      },
      ...options.alias || undefined
    }),
    !ignorePlugins.includes('commonjs') && commonjs(options.commonjs || undefined),
    !ignorePlugins.includes('nodeResolve') && nodeResolve(options.nodeResolve || undefined),
    !ignorePlugins.includes('json') && json(options.json || undefined),
    !ignorePlugins.includes('ts') && ts({
      outputToFilesystem: true,
      ...options.ts || undefined,
    }),
    IS_PROD && !ignorePlugins.includes('terser') && terser(options.terser || undefined),
    IS_PROD && !ignorePlugins.includes('cleanup') && cleanup({ comments: 'none', ...(options.cleanup || {}) }),
    IS_PROD &&
      !ignorePlugins.includes('summary') &&
      summary({
        showGzippedSize: true,
        ...(options.summary || {}),
      }),
    IS_PROD &&
      !ignorePlugins.includes('visualizer') &&
      visualizer({
        gzipSize: true,
        // template: 'treemap', // network, treemap,sunburst, default: treemap
        ...(options.visualizer || {}),
      }),
  ].filter((item) => !!item);
}

/**
 * @description 获取要排除的外部选项
 * @typedef {import('rollup').ExternalOption} ExternalOption
 * @param {string[]} options
 * @returns {ExternalOption}
 */
function getExternal(options = []) {
  return [...builtinModules].concat(options || []);
}

/**
 * @description 获取输出配置项
 * @typedef {import('rollup').OutputOptions} OutputOptions
 * @param {OutputOptions} options
 * @returns {OutputOptions}
 */
function getOutput(options = {}) {
  return {
    dir: 'dist',
    format: 'es',
    chunkFileNames: 'bundle/chunk.[format].[hash].js',
    entryFileNames: '[name].[format].js',
    sourcemap: IS_PROD,
    ...options,
  };
}

export default [
  // esm of node
  IS_PROD && {
    input: 'src/node.ts',
    output: getOutput({
      entryFileNames: '[name].mjs',
    }),
    external: getExternal(),
    plugins: getPlugins({
      ts: {
        tsconfig: './tsconfig.node.json',
      },
    }),
  },
  // umd of browser
  IS_PROD && {
    input: 'src/browser.ts',
    output: getOutput({
      format: 'umd',
      name,
      file: 'dist/browser.umd.js',
      chunkFileNames: undefined,
      entryFileNames: undefined,
      dir: undefined,
      exports: 'auto',
    }),
    external: getExternal(),
    plugins: getPlugins({
      ts: {
        tsconfig: './tsconfig.browser.json',
      },
    }),
  },
  // esm of browser
  {
    input: 'src/browser.ts',
    output: getOutput({
      entryFileNames: '[name].js',
    }),
    external: getExternal(),
    plugins: getPlugins(
      {
        ts: {
          tsconfig: './tsconfig.browser.json',
        },
      },
    ),
    watch: {
      include: ['src/**', 'index.html'],
    },
  },
].filter((item) => !!item);
