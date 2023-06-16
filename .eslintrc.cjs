module.exports = {
  globals: require('./src/.eslintrc-auto-import.json').globals,
  extends: [
    '@compass-aiden/eslint-config/react',
    'plugin:prettier/recommended',
    './src/.eslintrc-auto-import.json',
  ],
  parserOptions: {
    project: [ './tsconfig.json', './tsconfig.node.json' ],
  },
  "rules": {
    "react/jsx-no-undef": "off",
  }
}
