import json from '@rollup/plugin-json';
import styles from "@ironkinoko/rollup-plugin-styles"; // 样式打包
import copy from 'rollup-plugin-copy'
import autoprefixer from "autoprefixer";
import summary from 'rollup-plugin-summary'
import serve from 'rollup-plugin-serve'
import {builtinModules} from "node:module";
import fs from 'node:fs';
import process from 'node:process';

const rawPack = fs.readFileSync('package.json', { encoding: 'utf-8' });
const pack = JSON.parse(rawPack);

const isProd = !(process.env.npm_lifecycle_event === 'dev');

function getPlugins(disablePlugins = []) {
    return [
        !disablePlugins.includes('json') && json(),
        !disablePlugins.includes('serve') && !isProd && serve({
            port: 3000,
            contentBase: '.'
        }),
        !disablePlugins.includes('styles') && styles({
            mode: 'extract',
            minimize: false,
            import: true,
            plugins: [autoprefixer()]
        }),
        !disablePlugins.includes('copy') && copy({
            targets: [
                { src: 'src/static', dest: 'dist' },
            ]
        }),
        !disablePlugins.includes('summary') && isProd && summary({
            totalLow: 1024 * 8,
            totalHigh: 1024 * 20,
            showBrotliSize: true,
            showGzippedSize: true,
            showMinifiedSize: true,
        }),
    ].filter(item => !!item);
}

function getExternal(additionalExternal = []) {
    return [...builtinModules].concat(additionalExternal || []);
}

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

const entryList = [
  'src/main.scss',
  'src/base.scss',
  'src/tools.scss',
  'src/scrollbar.scss',
]

export default [
    !isProd && {
        input: 'src/main.scss',
        output: getOutput({
            format: 'es',
            name: pack.name,
            assetFileNames: 'assets/[name][extname]',
            chunkFileNames: undefined,
            entryFileNames: undefined,
        }),
        external: getExternal(),
        plugins: getPlugins(),
        watch: {
            include: ['src/**', 'static/**', 'index.html'],
        },
    },
    isProd && {
        input: entryList,
        output: getOutput({
            format: 'es',
            name: pack.name,
            assetFileNames: 'assets/[name][extname]',
            chunkFileNames: undefined,
            entryFileNames: undefined,
        }),
        external: getExternal(),
        plugins: getPlugins(),
    },
].filter(item => !!item);
