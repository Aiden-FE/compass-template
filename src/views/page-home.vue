<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
import IconArrow from '@/assets/svg/arrow.svg';
import { Languages, Theme } from '@/interfaces';
import { useThemeStore } from '@/stores';

const { locale, t, } = useI18n();
const { currentTheme, currentThemeData } = storeToRefs(useThemeStore());
const { toggle } = useThemeStore();

function toggleLanguage(lang: Languages) {
  locale.value = lang;
}

function toggleTheme(theme: Theme) {
  toggle(theme);
}
</script>

<template>
  <div class='cp-home'>
    <div class='cp-home__desc'>演示自动导入@/components下的组件</div>
    <app-example />
    <div class='cp-home__desc'>演示自动安装Mdi配置表依赖并自动导入icon组件</div>
    <i-mdi-account />
    <div class='cp-home__desc'>演示使用SVG Icon组件</div>
    <IconArrow class='w-[16px] h-[16px] text-blue-600' />
    <div class='cp-home__desc'>演示使用国际化</div>
    <div>{{ t('message.common.currentLanguage', { lang: locale }) }}</div>
    <button type='button' @click="toggleLanguage(Languages.EN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换为英文</button>
    <button type='button' @click="toggleLanguage(Languages.zhCN)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>切换为中文</button>
    <div class='cp-home__desc'>演示使用主题</div>
    <div>当前主题是: {{ currentTheme }}</div>
    <div>当前主题数据是: {{ currentThemeData }}</div>
    <button type='button' @click="toggleTheme(Theme.DEFAULT)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>默认跟随系统</button>
    <button type='button' @click="toggleTheme(Theme.LIGHT)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>亮色主题</button>
    <button type='button' @click="toggleTheme(Theme.DARK)" class='bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded'>暗色主题</button>
  </div>
</template>

<style lang='scss' scoped>
@include b(home) {
  @include e(desc) {
    @apply text-xs text-slate-400 italic;
  }
}
</style>
