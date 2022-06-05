module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  globals: {},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'import/extensions': 'off',
  }
}
