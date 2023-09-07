module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
  },
  extends: [
    '@compass-aiden/eslint-config/nest',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'max-classes-per-file': 'off', // dto内会声明多个dto class
    'class-methods-use-this': 'off',
  },
};
