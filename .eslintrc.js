module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['prettier'],
  extends: [
    '@compass-aiden/eslint-config/react',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // 不需要使用React导入
    'import/prefer-default-export': 'off', // Stencil 脚手架采用export class Name导出组件
    'prettier/prettier': 'error',
  }
}
