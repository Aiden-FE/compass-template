import styles from "rollup-plugin-styles"; // 样式打包
import copy from 'rollup-plugin-copy'
import autoprefixer from "autoprefixer";
import summary from 'rollup-plugin-summary'
import {builtinModules} from "module";

const { entryList } = require('./entry')
import pkg from '../package.json'

function entry(input, output) {
    return {
        input,
        output,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [...builtinModules],
        plugins: [
            styles({
                mode: 'extract',
                minimize: true,
                import: true,
                plugins: [autoprefixer()]
            }),
            copy({
                targets: [
                    { src: 'static', dest: 'dist' },
                ]
            }),
            summary(),
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
            sourcemap: false
        },
    ])
]
