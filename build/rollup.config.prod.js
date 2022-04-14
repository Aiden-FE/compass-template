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
