# {{name}}
> {{description}}

## 项目开发

### 安装管理工具
#### 全局安装 (推荐)

`npm install rush -g `

#### 通过node安装

`node common/scripts/install-run-rush.js install`

### 恢复依赖

`rush update`

### 为子项目管理依赖

`cd packages/[Project name]` 进入待开发的子项目

`rush add -p [Package name]` 添加依赖项,添加--dev参数则表示为开发依赖

详见: [#1457](https://github.com/microsoft/rushstack/issues/1457) ,目前建议
手动从package.json中移除依赖,执行`rush update --recheck`

### 执行子项目命令

`cd packages/[Project name]` 进入待开发的子项目

`rushx [script]` 执行子项目script开发脚本

### 提交代码

`git add -A` 暂存代码

`git commit -m "feat(#1): Add feat"` 建议参考: https://rushjs.io/zh-cn/pages/best_practices/change_logs/

### 项目构建

`rush build`

### 添加一个新库

在 packages 新建一个项目后,在rush.json内添加项目信息,结构如下:

```json
{
  "projects": [
    {
      "packageName": "[package name]", /** 包名 */
      "projectFolder": "packages/[package path]", /** 包路径 */
      "reviewCategory": "packages", /** 所属分类 */
      "versionPolicyName": "[package policy name]" /** 版本策略名称 */
    }
  ]
}
```

### 发布

`rush change` 生成changefile.json

`rush version --bump` 更新版本

`cd common/autoinstallers/common-command`
`npm run publish:all` 发布包
