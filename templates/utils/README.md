# TS 实用程序模板
> 支持导出 browser 及 node 双包

## 快速上手

`pnpm install` 恢复依赖

`pnpm build` 构建 browser 及 node 产物

`pnpm serve` 调试 browser 包

`pnpm dev` watch 模式下持续构建

`pnpm format` 格式化代码

`pnpm test` 单元测试

`pnpm lint` eslint 验证

使用方式:

```typescript
// esm
import Utils from 'utils' // 导入 browser 包
import Utils from 'utils/browser' // 导入 browser 包
import Utils from 'utils/node' // 导入 node 包

// cjs
const Utils = require('utils') // 导入 node 包
const Utils = require('utils/node') // 导入 node 包
const Utils = require('utils/browser') // 导入 browser 包
```

UMD 使用方式:

```html
<script src="<CDN_URL>/utils/dist/browser.umd.js"></script>
<script>
  console.log('Utils', utils);
</script>
```

## 功能特性

- 支持 browser,node 双包构建
- 支持代码格式化
- [ ] 支持单元测试
- [ ] 支持 eslint
