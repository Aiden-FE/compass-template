# 基于Rush管理Monorepo仓库

## 为什么采用Rush

[为什么采用Monorepo](https://rushjs.io/zh-cn/pages/intro/why_mono/)

[Rush的特点](https://rushjs.io/zh-cn/pages/intro/welcome/)

## 安装依赖

`$ npm install -g @microsoft/rush`

> 如果是在CICD内安装rush,可通过 `node common/scripts/install-run-rush.js install` 安装,该执行文件文件会在后续步骤创建出来

## 初始化仓库

`mkdir [repo name]` 创建一个空的项目文件夹

`cd [repo name]` 进入项目文件夹内

`rush init` 初始化monorepo项目

此时的目录结构类似如下:

```.
├── common
│   └── config
│       └── rush
│           ├── .npmrc
│           ├── .npmrc-publish
│           ├── .pnpmfile.cjs
│           ├── artifactory.json
│           ├── build-cache.json
│           ├── command-line.json
│           ├── common-versions.json
│           ├── experiments.json
│           ├── repo-state.json
│           ├── rush-plugins.json
│           └── version-policies.json
├── .travis.yml
├── .gitattributes
├── .gitignore
└── rush.json
```

## 添加多个子项目

分别在 libraries/project-a 及 examples/demo 初始化两个子项目, 此时类似如下结构:

```
├── common
│   └── config
│       └── rush
├── examples
│   └── demo
│       └── package.json
└── libraries
    └── project-a
        └── package.json
```

## 为项目设置基本配置

todo: 待补充

## 恢复依赖

`rush update` 执行此命令安装依赖,新项目初次执行会在common内创建一批基础脚本文件.

## 为子项目添加依赖

`cd examples/demo` 进入子项目

`rush add -p [package name]` 安装到dependencies

`rush add -p [package name] --dev` 安装到devDependencies

`rush add -p [package name] --all` 安装到所有子项目依赖内

`rush add -m -p [package name]` 安装依赖,并使其他子项目相同依赖的版本与此对齐,形成对等依赖

为demo项目添加workspace内的子项目,例如添加project-a作为依赖

`rush add -p project-a` 此处假设project-a的package.json里的name字段等于project-a

## 移除依赖项

* 手动移除目标项目package.json中的依赖
* 执行 `rush update --recheck` 检查并更新依赖

> 至于为什么没有类似 uninstall 或 remove 移除命令,参考Issue: [#1457](https://github.com/microsoft/rushstack/issues/1457)

##  执行子项目script命令

`cd libraries/project-a` 进入待开发的子项目

`rushx [script]` 执行子项目 package.json script内的命令

## 项目构建

`rush build` 增量构建所有项目

`rush rebuild` 构建所有项目

> 如果有项目不想参与构建,可将package.json build命令置空 如下所示:

```json
{
  "scripts": {
    "build": ""
  }
}
```

## 为仓库创建 commitlint 进行提交检查

todo: 待补充

## 为项目配置NPM相关内容

todo: 待补充

## 项目发布

`rush check` 检查依赖

`rush change` 生成变更日志

`rush version --bump` 根据版本策略变更版本

`rush publish --publish --include-all` 发布所有项目

## 结尾

附上[模板仓库地址](https://github.com/Aiden-FE/compass-template/tree/template/monorepo)
