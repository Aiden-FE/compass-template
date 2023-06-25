module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    project: [
      './tsconfig.json',
      './tsconfig.node.json'
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    // typescript使用此配置
    '@compass-aiden/eslint-config/ts',
    'plugin:prettier/recommended'
  ]
}
