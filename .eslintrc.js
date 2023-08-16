module.exports = {
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  extends: ['@compass-aiden/eslint-config/react', 'plugin:prettier/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off', // 不需要使用React导入
    'import/prefer-default-export': 'off', // Stencil 脚手架采用export class Name导出组件
    'react/no-unknown-property': 'off', // Stencil 使用class定义类名而不是className
    'react-hooks/rules-of-hooks': 'off', // Stencil 使用class
    'react/function-component-definition': 'off', // Stencil 使用FunctionalComponent
    'react/prop-types': 'off', // Stencil 使用FunctionalComponent
    'class-methods-use-this': 'off', // Stencil disconnectedCallback空声明
    'prettier/prettier': 'error',
  },
};
