<script setup lang="ts">
import IconArrow from '@/assets/svg/arrow.svg';
import i18next from 'i18next';
import type { ConfigProviderOption } from '@/interfaces';
import { configSymbol, Languages } from '@/config';

const config = inject<ConfigProviderOption>(configSymbol);
</script>

<template>
  <div class='cp-home'>
    <div class='cp-home__desc'>演示自动导入@/components下的组件</div>
    <auto-import-example />
    <div class='cp-home__desc'>演示自动安装Mdi配置表依赖并自动导入icon组件,无需使用mdi icon请删除下行icon,并执行 pnpm remove @iconify-json/mdi</div>
    <i-mdi-account />
    <div class='cp-home__desc'>演示使用SVG Icon组件</div>
    <IconArrow class='w-[16px] h-[16px] text-blue-600' />
    <div class='cp-home__desc'>演示使用国际化</div>
    {{ i18next.t('message.common.currentLanguage', { lang: config.lang }) }}
    <button @click="config.changeLanguage(Languages.EN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换英文</button>
    <button @click="config.changeLanguage(Languages.zhCN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换中文</button>
  </div>
</template>

<style lang="scss">
@include b(home) {
  @include e(desc) {
    @apply text-xs text-slate-400 italic;
  }
}
</style>
