# {{name}}
> {{description}}

## Getting Started

`npm install {{name}}` 安装依赖

### Use bem.styl

vite配置为例,其他项目类似,全局导入即可
```typescript
export default defineConfig({
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          '{{name}}/static/bem.styl'
        ]
      },
    }
  },
})
```

模板内使用,以Vue为例
```vue
<template>
  <div class="cp-container">
    <button class="cp-container__button cp-container__button_active">Test</button>
  </div>
  <div class="demo-container"></div>
</template>

<style scoped lang="stylus">
+block(container)
  background-color #fff
  +element(button)
    display inline-block
    +modifier(active)
      color blue

+block(container, demo)
  background-color #7f7f7f
</style>
```

### Use styles

```stylus
// 导入所有css文件
@import '{{name}}';
// 导入特定文件
@import '{{name}}/assets/base.css'; // 导入基础样式
@import '{{name}}/assets/tools.css'; // 导入工具类
```

#### CSS variables for base.css

* --cp-page-background-color 页面背景颜色

#### CSS variables for tools.css

* --cp-text-selection 文本选中字体颜色
* --cp-text-selection-bg 文本选中背景颜色
* --cp-scrollbar 滚动条颜色
* --cp-scrollbar-thumb 滚动条滑块颜色
* --cp-scrollbar-track 滚动条滑轨颜色
