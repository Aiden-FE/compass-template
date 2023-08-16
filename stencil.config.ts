import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind, { setPluginConfigurationDefaults, tailwindGlobal, tailwindHMR } from 'stencil-tailwind-plugin';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { inlineSvg } from 'stencil-inline-svg';
import tailwindConfig from './tailwind.config';

setPluginConfigurationDefaults({
  tailwindCssPath: './src/assets/styles/tailwind.scss',
  tailwindConf: tailwindConfig,
  postcss: {
    plugins: [tailwindcss(), autoprefixer()],
  },
});

export const config: Config = {
  namespace: 'web-components',
  plugins: [
    sass({
      injectGlobalPaths: ['src/assets/styles/bem.scss'],
    }),
    tailwindGlobal(),
    tailwind(),
    tailwindHMR(),
    inlineSvg(),
  ],
  globalStyle: 'src/assets/styles/global.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      transformAliasedImportPathsInCollection: true,
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'static',
          dest: 'static',
        },
      ],
    },
  ],
};
