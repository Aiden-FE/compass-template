const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    GLOBAL_VAR: true,
    window: true,
    defineProps: true,
    defineExpose: true,
  },
  settings: {
    'import/core-modules': [ 'virtual:windi.css', 'virtual:windi-devtools' ],
    "import/resolver": {
      "typescript": {}
    },
  },
  extends: [
    path.resolve(__dirname, 'src/types/.eslintrc-auto-import.json'),
    'plugin:@compass-aiden/recommended-vue3',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  }
}
