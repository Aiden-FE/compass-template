import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import autoprefixer from 'autoprefixer';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'compass-web-components',
  plugins: [
    sass(),
    postcss({
      plugins: [
        autoprefixer(),
      ]
    }),
  ],
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
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
  ],
};
