# {{name}}
> {{description}}

## Getting Started

`npm install {{name}}` 安装依赖

ESModule usage
```typescript
import {demo} from '{{name}}';
demo();
```

Commonjs usage
```typescript
const {demo} = require('{{name}}');
demo();
```

## Scripts

`npm run dev` 本地开发模式

`npm run build` 构建项目

`npm run lint` 执行代码Eslint检查

`npm run format` 执行代码格式化

`npm run test` 执行单元测试,匹配 `src/**/*.spec.ts`

`npm run clean` 清理构建产物
