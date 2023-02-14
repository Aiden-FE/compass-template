module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    // typescript使用此配置
    '@compass-aiden/eslint-config/ts',
  ],
}
