module.exports = {
  printWidth: 120, // 单行最大长度
  tabWidth: 2, // 指定每个缩进级别的空格数。
  useTabs: false, // 用制表符而不是空格缩进行。
  semi: true, // 在语句末尾打印分号。
  singleQuote: true, // 使用单引号而不是双引号
  quoteProps: 'as-needed', // 仅在必需时为对象的属性添加引号
  jsxSingleQuote: false, // jsx中使用单引号
  trailingComma: 'all', // 多行时尽可能打印尾随逗号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSameLine: false, // 多属性html标签的‘>’折行放置
  arrowParens: 'always', // 在唯一的箭头函数参数周围包含括号。(x) => x
  // "requirePragma": false, //无需顶部注释即可格式化 https://prettier.io/docs/en/options.html#require-pragma
  // "insertPragma": false, // 在已被prettier格式化的文件顶部加上标注
  // "proseWrap": "preserve", // https://prettier.io/docs/en/options.html#prose-wrap
  // "htmlWhitespaceSensitivity": "css", // https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting
  // "vueIndentScriptAndStyle": false, // <script>Vue 文件中的代码和标签是否缩进<style>。
  endOfLine: 'lf', // 结束行 \n
  // "embeddedLanguageFormatting": "auto", // 对引用代码进行格式化
  // "singleAttributePerLine": false, // 在 HTML、Vue 和 JSX 中每行强制执行单个属性。
};
