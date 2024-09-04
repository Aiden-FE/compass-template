<script setup lang="ts">
import { useConfigProvider, ConfigProvider } from '@/components/config-provider';
// eslint-disable-next-line import/no-duplicates
import ArrowSvg from '@/assets/svg/arrow.svg';
// eslint-disable-next-line import/no-duplicates
// import ArrowSvgUrl from '@/assets/svg/arrow.svg?url'; // 组件库不建议使用url
// import ArrowSvgRaw from '@/assets/svg/arrow.svg?raw'; // raw导入
import LangDemo from './lang-demo.vue';

const { t } = useConfigProvider();

const localeDemo = {
  'This is a {pageName} page': 'This is a {pageName} page',
};
</script>

<template>
  <div class="app-example">
    <h5>Iconify使用示例</h5>
    <div>
      <i-ant-design-caret-down-outlined />
    </div>
    <h5>Svg 使用示例</h5>
    <div>默认Svg component模式<ArrowSvg class="app-example__arrow-svg" /></div>
    <h5>Tailwindcss使用示例</h5>
    <div>
      <div class="p-4 rounded-lg">
        <p class="app-example__tailwind">Tailwindcss 样式控制,字体颜色使用了主题色</p>
      </div>
    </div>
    <h5>使用语言包并基于 ConfigProvider 组件局部修改配置项</h5>
    <div>
      默认全局语言配置:
      <p>{{ t('This is a {pageName} page', { pageName: '示例' }) }}</p>
      <ConfigProvider :locale="localeDemo"> 局部变更语言配置: <LangDemo /> </ConfigProvider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-example {
  &__tailwind {
    color: $primary-color;

    @apply font-semibold;
  }

  &__arrow-svg {
    width: 14px;
    height: 14px;
    color: green;
  }
}
</style>
