# Commandline 模板

## 快速上手

`pnpm install` 恢复依赖

`pnpm build` 构建产物

`pnpm dev` watch 模式下持续构建

`pnpm format` 格式化代码

`pnpm lint` eslint 验证

1. 调整 `package.json` 内的 name 及 bin 内的 cli 名称
2. 运行 `<bin_name> -h` 获取帮助信息
3. `src/commands`内添加命令

## 依赖更新

`npx npm-check-updates -i --format group` 按需选择待更新的依赖
