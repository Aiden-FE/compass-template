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
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript',
    'airbnb-base',
    '@vue/eslint-config-prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'max-len': ['error', { code: 120 }],
    'no-shadow': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
