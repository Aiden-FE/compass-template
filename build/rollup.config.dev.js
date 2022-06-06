import copy from 'rollup-plugin-copy'
import styles from "rollup-plugin-styles"; // 样式打包
import serve from 'rollup-plugin-serve'
import {builtinModules} from "module";

import pkg from '../package.json'
const { entryList } = require('./entry')

function entry(input, output) {
    return {
        input,
        output,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [...builtinModules],
        watch: {
            include: ['src/**', 'index.html'],
        },
        plugins: [
            styles({
                mode: 'extract',
                minimize: false,
                import: true,
            }),
            copy({
                targets: [
                    { src: 'static', dest: 'dist' },
                ]
            }),
            serve({
                port: 4000,
                contentBase: '.',
            })
        ]
    }
}

export default [
    entry(entryList, [
        {
            dir: 'dist',
            name: pkg.name,
            format: 'es',
            assetFileNames: 'assets/[name][extname]',
            sourcemap: true
        },
    ])
]
