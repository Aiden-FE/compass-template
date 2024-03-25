# Utils 模板

> 该文件不在生成产物中,仅对该模板做出必要说明


## 模板特性

* 支持Web,Node双平台打包
* 支持浏览器导入Web平台的umd文件
* 支持ESM按需导入
* 支持条件导入
* 支持启用Eslint
* 支持启用Prettier
* 支持启用Jest
* 支持启用Typedoc
* 支持启用GitHooks
* 支持启用Github Actions自动lint,test,build,publish,打Tag,发Release,部署Github page
* 支持提交前自动格式化变更文件及提交信息检查, 依赖启用GitHooks

## 模板变量

|       变量名       |                                    变量说明                                     |
| :----------------: | :-----------------------------------------------------------------------------: |
|    projectName     |                                    项目名称                                     |
| projectDescription |                                    项目描述                                     |
|   enabledEslint    |                          是否启用 eslint 代码检查插件                           |
|  enabledPrettier   |                        是否启用 prettier 代码格式化插件                         |
|    enabledJest     |                             是否启用 jest 单测插件                              |
|   enabledTypedoc   |                            是否启用 typedoc 生成文档                            |
|  enabledGithooks   |                         是否启用 simple-git-hooks 插件                          |
| enabledPrettyQuick | 是否启用 pretty-quick 插件,代码提交前快速格式化变更文件.依赖enabledGithooks开启 |
| enabledCommitlint  |  是否启用 commitlint 插件,代码提交前对提交信息进行校验.依赖enabledGithooks开启  |
