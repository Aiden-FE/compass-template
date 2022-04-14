import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载
import sourceMaps from 'rollup-plugin-sourcemaps' // 源映射
import typescript from 'rollup-plugin-typescript2' // ts支持
import json from '@rollup/plugin-json' // json加载
import { terser } from 'rollup-plugin-terser' // 代码压缩
import peerDepsExternal from 'rollup-plugin-peer-deps-external' // 剔除外部依赖
import analyze from 'rollup-plugin-analyzer'
import pkg from '../package.json'
const {entryList}  = require('./get-all-entry')

const libraryName = pkg.name

function entry(input, output) {
  return {
    input,
    output,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['window', 'document'],
    plugins: [
      // Allow json resolution
      json(),
      peerDepsExternal({
        includeDependencies: true
      }),
      // Compile TypeScript files
      typescript({
        verbosity: 2,
        tsconfigDefaults: {
          extendedDiagnostics: process.env.NODE_ENV === 'production'
        },
        useTsconfigDeclarationDir: true,
        // objectHashIgnoreUnknownHack: true,
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      nodeResolve(),

      // Resolve source maps to the original source
      sourceMaps(),
      // Minify
      terser(),
      analyze({
        summaryOnly: true
      })
    ]
  }
}

export default [
  entry(entryList, [
    {
      dir: 'lib',
      name: libraryName,
      format: 'es',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].js',
      sourcemap: false // process.env.NODE_ENV !== 'production'
    },
    {
      dir: 'lib/cjs',
      name: libraryName,
      format: 'cjs',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].[format].js',
      sourcemap: false // process.env.NODE_ENV !== 'production'
    },
  ]),
  // IIFE
  entry('src/compass-utils.ts', [
    {
      dir: 'lib',
      format: 'iife'
    }
  ])
]
