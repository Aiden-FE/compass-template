import json from '@rollup/plugin-json' // json加载
import ts from "rollup-plugin-ts";
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { terser } from 'rollup-plugin-terser' // 代码压缩
import cleanup from 'rollup-plugin-cleanup';
import summary from 'rollup-plugin-summary'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载

import pkg from '../package.json'
import {builtinModules} from "module";
const moduleList = require('./modules-entry')

const umdPlugins = [nodeResolve({ browser: true }), commonjs()];
const umdName = pkg.name;

const compressionPlugins = [
    json(),
    ts(),
    compiler(),
    terser(),
    cleanup({comments: 'all'}),
    summary({
        totalLow: 1024 * 8,
        totalHigh: 1024 * 20,
        showBrotliSize: true,
        showGzippedSize: true,
        showMinifiedSize: true,
    })
]

export default [
    {
        input: './src/main.ts',
        plugins: [...umdPlugins, ...compressionPlugins],
        output: [{ file: pkg['umd:main'], format: 'umd', sourcemap: true, name: umdName }],
    },
    {
        input: './src/main.ts',
        plugins: [...umdPlugins, ...compressionPlugins],
        output: [{ file: pkg.commonjs, format: 'cjs', sourcemap: true }],
    },
    {
        input: './src/main.ts',
        external: [...builtinModules],
        plugins: [...compressionPlugins],
        output: [{ file: pkg.module, format: 'es', sourcemap: true }],
    },
    {
        input: './src/main.ts',
        external: [...builtinModules],
        plugins: [...compressionPlugins,],
        output: [{ file: pkg.main, format: 'es', sourcemap: true }],
    },
].concat(moduleList.map(input => ({
    input,
    external: [...builtinModules],
    plugins: [...umdPlugins, ...compressionPlugins,],
    output: [{
        dir: 'dist/es',
        name: umdName,
        chunkFileNames: 'es/bundle/chunk.[format].[hash].js',
        entryFileNames: '[name].js',
        format: 'es',
        sourcemap: true
    }, {
        dir: 'dist/cjs',
        name: umdName,
        format: 'cjs',
        chunkFileNames: 'cjs/bundle/chunk.[format].[hash].js',
        entryFileNames: '[name].[format].js',
        sourcemap: true
    },],
})))
