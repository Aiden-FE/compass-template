import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载
import peerDepsExternal from 'rollup-plugin-peer-deps-external' // 分离外部依赖
import styles from "rollup-plugin-styles"; // 样式打包
import analyze from 'rollup-plugin-analyzer' // build分析工具
import copy from 'rollup-plugin-copy'
import pkg from '../package.json'
import autoprefixer from "autoprefixer";
const { entryList } = require('./entry')

const libraryName = pkg.name

function entry(input, output) {
    return {
        input,
        output,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [],
        preserveSymlinks: true,
        plugins: [
            peerDepsExternal({
                includeDependencies: true
            }),
            styles({
                mode: 'extract',
                minimize: true,
                import: true,
                plugins: [autoprefixer()]
            }),
            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs(),
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            nodeResolve(),
            copy({
                targets: [
                    { src: 'static', dest: 'lib' },
                ]
            }),
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
            assetFileNames: 'assets/[name][extname]',
            sourcemap: false
        },
    ])
]
