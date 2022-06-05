import json from '@rollup/plugin-json' // json加载
import ts from "rollup-plugin-ts";
import serve from 'rollup-plugin-serve'
import pkg from '../package.json'
import {builtinModules} from "module";

export default [
    {
        input: './src/main.ts',
        watch: {
            include: ['src/**', 'index.html'],
        },
        external: [...builtinModules],
        plugins: [
            json(),
            ts(),
            serve({
                port: 4000,
                contentBase: '.',
            }),
        ],
        output: [{ file: pkg.main, format: 'es', sourcemap: true }],
    },
]
