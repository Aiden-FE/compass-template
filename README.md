# {{name}}
> {{description}}

## Features

### 自动导入

支持免 import,自动导入以下内容相关 API:

- vue
- vue-router
- pinia
- @vueuse/core
- `src/components` 路径下的组件
- [iconify](https://icon-sets.iconify.design/) 内的所有 icon 资源

#### 组件使用

在 `src/components` 下的所有组件可以免 import 直接使用,组件命名以大于一个单词,再加中划线连接

文件结构示例如下:

```
src
├── components
│   └── app-example
│       └── app-example.vue
```

用法示例:

```vue
<template>
  <app-example />
</template>
```

#### Icon 使用

项目内置了 [unplugin-icons](https://github.com/antfu/unplugin-icons), 请参考文档使用

所有 icon 支持自动导入,无需手动 import,类似如下方式直接使用即可:

在 https://icon-sets.iconify.design/ 可以直接搜索所有 icon 资源,antd 的 icon 也一样存在

更多用法参考 [unplugin-icons](https://github.com/antfu/unplugin-icons) 官方文档即可

```vue
<template>
  <i-mdi-account />
  <i-fa-solid-dice-five />
  <i-heroicons-outline-menu-alt-2 />
  <i-ri-apps-2-line />
  <i-mdi-dice-d12 />
  <i-mdi-light-alarm />
  <i-noto-v1-flag-for-flag-japan />
  <i-ic-twotone-24mp />
  <i-mdi:cactus />
  <i-twemoji-1st-place-medal />
  <i-ant-design-caret-down-outlined />
</template>
```

### SVG 图片资源的使用

项目内置了 [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) 支持.

svg 资源默认放在 `src/assets/svg` 文件夹下.

使用时如下:

```vue
<script setup>
import MyIcon from '@/assets/svg/my-icon.svg'; // 默认会将svg资源以组件模式导入
import MyIconURL from '@/assets/svg/my-icon.svg?url'; // 以url方式引用资源
import MyIconRaw from '@/assets/svg/my-icon.svg?raw'; // 以原始xml标签方式引用资源
</script>

<template>
  <MyIcon />
  <img :src="MyIconURL" />
  <MyIconRaw />
</template>
```

### 国际化

所有国际化文件均放在 `src/assets/locales` 文件夹下

使用示例如下:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Languages } from '@/config';

const { t, locale } = useI18n();

function toggleLanguage(lang: Languages) {
  locale.value = lang;
}
</script>

<template>
  <div>
    <div>{{ t('message.common.currentLanguage', { lang: locale }) }}</div>
    <button @click="toggleLanguage(Languages.EN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换为英文</button>
    <button @click="toggleLanguage(Languages.zhCN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换为中文</button>
  </div>
</template>
```

更多详细用法参考 [unplugin-vite](https://github.com/intlify/bundle-tools/blob/main/packages/unplugin-vue-i18n/README.md) 与 [vue-i8n](https://vue-i18n.intlify.dev/) 文档

### SCSS 及 BEM

项目采用 BEM 声明规范. `bi-${block}__${element}_${modifier}`, cp 作为固定前缀,可通过修改`src/assets/styles/vars.scss`内的domain值来变更前缀

项目内置 scss 并提供 BEM scss 封装函数,使用示例如下:

```vue
<style scoped lang="scss">
@include b(block) {
  // .cp-block
  font-size: 14px;
  @include e(element) {
    // .cp-block__element
    @include m(modifier) {
      // .cp-block__element_modifier
    }
  }
}
</style>
```

### 主题使用

预置主题控制,默认跟随系统, 使用示例如下:

```vue
<script setup lang='ts'>
import { Theme } from '@/config';
import { useThemeStore } from '@/stores';

const { currentTheme, currentThemeData } = storeToRefs(useThemeStore());
const { toggle } = useThemeStore();
</script>

<template>
  <div>当前主题是: {{ currentTheme }}</div>
  <div>当前主题数据是: {{ currentThemeData }}</div>
  <button @click="toggle(Theme.DEFAULT)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>默认跟随系统</button>
  <button @click="toggle(Theme.LIGHT)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>亮色主题</button>
  <button @click="toggle(Theme.DARK)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>暗色主题</button>
</template>
```

### PostCSS autofixer tailwindcss

项目默认集成PostCSS autoprefixer tailwindcss

```vue
<script setup lang="ts">
</script>

<template>
  <div class="cp-example">
    <div class="cp-example__tip">这是一段tailwindcss演示内容</div>
    <button class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>test</button>
    <button class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>test2</button>
  </div>
</template>

<style lang="scss" scoped>
@include b(example) {
  @include e(tip) {
    @apply text-xs text-slate-400 italic;
  }
}
</style>
```

### 全局订阅发布

预设订阅发布服务,使用示例如下:

a.vue:
```vue
<script setup lang="ts">
import { useEmitterService } from '@/services';
import { GlobalEvents } from '@/config';

const { emit } = useEmitterService();
emit(GlobalEvents.EVENT_KEY, { example: 'example' });
</script>
```

b.vue:
```vue
<script setup lang="ts">
import { useEmitterService } from '@/services';
import { GlobalEvents } from '@/config';

const { on, once } = useEmitterService();

// 页面卸载前持续订阅
on(GlobalEvents.EVENT_KEY, (data) => console.log('Data is: ', data));
// 页面卸载前订阅一次
once(GlobalEvents.EVENT_KEY, (data) => console.log('Data is: ', data));
</script>
```

更多用法请查看`src/services/use-emitter.service.ts`及[emittery](https://github.com/sindresorhus/emittery)

### Store使用

在`src/stores`新建example.store.ts文件,文件参考如下:

```typescript
export default defineStore('example', () => {
  const info = ref<Record<string, unknown>>(null);
  
  const currentInfo = computed(() => info);
  
  function mergeInfo(newInfo: Record<string, unknown>) {
    info.value = {
      ...info.value,
      ...newInfo,
    };
  }
  
  return {
    info,
    currentInfo,
    mergeInfo,
  }
})
```

在`src/stores/index.ts`内添加`export { default as useExampleStore } from './example.store';`导出

在example.vue文件内使用:

```vue
<script lang='ts'>
import { useExampleStore } from '@/stores';

// 使用storeToRefs避免断开引用
const { info, currentInfo } = storeToRefs(useExampleStore());
// 函数引用无需使用storeToRefs包裹
const { mergeInfo } = useExampleStore();
</script>
```

### 预置工具库

* dayjs 时间处理工具函数, 无需使用时执行`pnpm remove dayjs`卸载
* @vueuse/core vue工具函数库, 无需使用时执行`pnpm remove @vueuse/core`卸载
* lodash-es JavaScript工具函数, 无需使用时执行`pnpm remove lodash-es`卸载

## 快速开始

`pnpm run dev` 开发模式启动

`pnpm run build` 构建生产项目

`pnpm run test:unit` 运行单元测试

`pnpm run test:e2e:dev` 本地运行端到端测试

`pnpm run build && pnpm run test:e2e` CI 环境运行端到端测试

`pnpm run lint` 运行代码检查
