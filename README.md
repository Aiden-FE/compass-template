# {{name}}
> {{description}}

## Getting Started

`npm install {{name}}` 安装依赖

### Use bem.scss

vite配置为例,其他项目类似,全局导入即可

scss的可空变量如下, 可根据业务实际情况进行再次声明覆盖

```scss
$domain: {{domain}} !default;
$block-separator: '-' !default;
$element-separator: '__' !default;
$modifier-separator: '_' !default;
```

```typescript
export default defineConfig({
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          '{{name}}/static/bem.scss'
        ]
      },
    }
  },
})
```

模板内使用,以Vue为例
```vue
<template>
  <div class="{{domain}}-container">
    <button class="{{domain}}-container__button {{domain}}-container__button_active">Test</button>
  </div>
  <div class="demo-container"></div>
</template>

<style scoped lang="scss">
@include b(container) {
  @include e(button) {
    @include m(active) {}
  }
  // 选择多个
  @include e((button, input)) {}
}

// 重新定义domain
@include b(container, demo) {}
</style>
```

### Use styles

```stylus
// 导入所有css文件
@import '{{name}}';
// 导入特定文件
@import '{{name}}/assets/base.css'; // 单独导入基础样式表
@import '{{name}}/assets/tools.css'; // 单独导入实用工具样式表
@import '{{name}}/assets/scrollbar.css'; // 单独导入滚动条样式表
```

#### CSS variables

##### CSS variables for dist/assets/base.css

* --{{domain}}-page-bg-color 页面背景颜色

##### CSS variables for dist/assets/tools.css

> DOM Class 添加 {{domain}}-selection 即可使用文本选择颜色控制

* --{{domain}}-selection-color 选择区颜色
* --{{domain}}-selection-bg-color 选择区背景色

##### CSS variables for dist/assets/scrollbar.css

> DOM Class 添加 {{domain}}-scrollbar 即可使用
> 添加{{domain}}-scrollbar后, DOM Class 添加 {{domain}}-scrollbar_fixed 即可使用滚动条固定模式

* --{{domain}}-scrollbar-bg-color 滚动条背景色
* --{{domain}}-scrollbar-thumb-bg-color 滚动条滑块背景色
* --{{domain}}-scrollbar-thumb-border-color 滚动条滑块边框色
* --{{domain}}-scrollbar-track-bg-color 滚动条外层轨道背景色
