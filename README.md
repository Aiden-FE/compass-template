# {{name}}
> {{description}}

## 安装
### 安装 rush
`npm install -g @microsoft/rush` 本地开发环境推荐

或者

`node common/scripts/install-run-rush.js install` ci环境使用此命令, 新项目需要在使用前通过 “rush update” 生成文件。

### 安装所有依赖

`rush update` 安装所有项目依赖

`rush update-autoinstaller --name common-commands` 安装公共命令依赖

### 管理依赖
> https://rushjs.io/zh-cn/pages/commands/rush_add/

`rush add -p [package_name]` 在对应项目路径下执行添加依赖, --dev添加开发依赖, -m为仓库内所有项目同步一致的版本

`rush remove -p [package_name]` 在对应项目路径下执行删除依赖

### 执行项目内命令

`rushx [script_name]` 在项目路径下执行此命令可运行项目内scripts命令

### 扩展 Rush 命令

参考 common/config/rush/command-line.json 文件说明

## 项目结构

```
.
├── common
│   ├── autoinstallers # 与业务无关的依赖或命令脚本
│   ├── config # 配置
│   ├── git-hooks
│   └── scripts # rush 脚本
├── apps # 项目文件夹
├── libraries # 基础设施包文件夹
└── rush.json # rush 配置文件
```

## Rush 使用文档

[Monorepo usage](https://rushjs.io/)
