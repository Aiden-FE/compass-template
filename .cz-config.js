// https://github.com/leoforfree/cz-customizable
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 一个新的功能' },
    { value: 'fix', name: 'fix: 一个BUG修复' },
    { value: 'docs', name: 'docs: 只有文档发生了更改' },
    { value: 'style', name: 'style: 不影响代码含义的更改 (代码美化相关)' },
    { value: 'refactor', name: 'refactor: 既不修复错误也不添加功能的代码更改' },
    { value: 'perf', name: 'perf: 提高性能的代码更改' },
    { value: 'test', name: 'test: 添加单元测试代码' },
    { value: 'chore', name: 'chore: 对构建过程或辅助工具的更改' },
    { value: 'revert', name: 'revert: 回滚代码提交' },
    { value: 'WIP', name: 'WIP: 尚未结束,正在进行的工作' },
  ],

  scopes: [{
    name: '鉴权'
  }, {
    name: '用户'
  }, {
    name: '公共组件'
  }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择您要提交的更改类型:",
    scope: '\n表示此次更改的范围 (可选):',
    // used if allowCustomScopes is true
    customScope: '表示此次更改的范围:',
    subject: '写一个简短的、且必须的变化描述:\n',
    body: '提供更改的详细描述 (可选)。使用 “|” 断开新行:\n',
    breaking: '列出所有重大更改 (可选):\n',
    footer: '列出因此次更改而关闭的所有问题 (可选)。例如: #31,#34:\n',
    confirmCommit: '您确定要继续进行上述提交吗？',
  },

  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['breaking'], // 'scope', 'body', 'breaking', 'footer'

  // limit subject length
  subjectLimit: 120,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
