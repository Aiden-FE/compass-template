# {{name}}
> {{description}}

## 贡献指南
### 安装
#### 安装 rush
本地开发环境安装 `npm install -g @microsoft/rush`

ci环境使用此命令`node common/scripts/install-run-rush.js install`

#### 安装所有依赖

> 执行前如果仓库内没有子项目时需要先创建子项目,并在rush.json文件内配置后再执行该命令恢复依赖

通过 `rush update` 恢复所有依赖

#### 管理依赖
> https://rushjs.io/zh-cn/pages/commands/rush_add/

`rush add -p [package_name]` 在对应项目路径下执行添加依赖, --dev添加开发依赖, -m为仓库内所有项目同步一致的版本

`rush remove -p [package_name]` 在对应项目路径下执行删除依赖

### 执行项目内命令

`rushx [script_name]` 在项目路径下执行此命令可运行项目内scripts命令

## 项目结构

```
.
├── common
│   ├── autoinstallers # 与业务无关的依赖或命令脚本
│   ├── config # 配置
│   ├── git-hooks
│   └── scripts # rush 脚本
└── rush.json # rush 配置文件
```

## Rush 使用文档

[Monorepo usage](https://rushjs.io/)
