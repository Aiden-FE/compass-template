/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@compass-aiden/eslint-config/vue',
    '@vue/eslint-config-prettier/skip-formatting'
  ]
};
