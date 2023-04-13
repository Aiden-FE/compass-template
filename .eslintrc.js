/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
  },
  extends: ['@compass-aiden/eslint-config/vue', '@vue/eslint-config-prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
