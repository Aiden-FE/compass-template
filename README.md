# {{name}}
> {{description}}

## Getting Started

`npm install {{name}}` 安装依赖

Browser usage
```html
<script src="https://cdn.jsdelivr.net/npm/{{name}}@1.0.0/dist/example.umd.min.js"></script>
<script>
    const _ = window['{{name}}'];
    console.log(_);
</script>
```

ESModule usage
```typescript
import {demo} from '{{name}}';
demo();
```

Commonjs usage
```typescript
const {demo} = require('{{name}}/dist/main.cjs');
demo();
```

## 目录说明

* `config` 项目配置文件
  * `modules-entry.js` 获取各模块文件入口
* `coverage` 单测覆盖率报告
* `dist` 构建产物
  * `*.es.min.js` es module 全量文件
  * `*.cjs.min.js` commonjs 全量文件
  * `*.umd.min.js` umd 全量文件
  * `main.js` es 入口文件
  * `main.cjs.js` commonjs 入口文件
* `src` 源代码
  * `main.ts` 主入口文件
  * `modules` 各模块文件夹

## 项目开发

### 安装依赖

`npm install`

### 本地开发模式

`npm start` 将在本地4000端口启动服务,入口为当前目录下的index.html文件

### 代码风格校验

`npm run lint` 执行代码Eslint检查

### 单元测试

`npm run test` 执行单元测试,匹配 `src/**/*.spec.ts`

### 生成文档

`npm run docs` 构建文档至 docs 文件夹

### 构建发布包

`npm run build` 构建产物
