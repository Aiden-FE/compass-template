import copy from 'rollup-plugin-copy'
import styles from "rollup-plugin-styles"; // 样式打包
import serve from 'rollup-plugin-serve'
import pkg from '../package.json'
import livereload from "rollup-plugin-livereload";
const { entryList } = require('./entry')

const libraryName = pkg.name

function entry(input, output) {
    return {
        input,
        output,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [],
        watch: {
            include: 'src/**'
        },
        plugins: [
            styles({
                mode: 'extract',
                minimize: true,
                import: true,
            }),
            copy({
                targets: [
                    { src: 'static', dest: 'lib' },
                ]
            }),
            livereload(),
            serve({
                port: 4000,
                contentBase: 'src',
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
            sourcemap: true
        },
    ])
]
