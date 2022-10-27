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

## 项目开发

### 安装依赖

`npm install`

### 本地开发模式

`npm dev` 将在本地3000端口启动服务,入口为当前目录下的index.html文件

### 代码风格校验

`npm run lint` 执行代码Eslint检查

### 单元测试

`npm run test` 执行单元测试,匹配 `src/**/*.spec.ts`

### 构建发布包

`npm run build` 构建产物
