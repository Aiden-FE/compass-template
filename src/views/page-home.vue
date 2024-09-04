<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import IconArrow from '@/assets/svg/arrow.svg';
import { Languages, Theme } from '@/config';
import { useThemeStore } from '@/stores';

const { locale, t } = useI18n();
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
  <div class="app-home h-[2000px]">
    <div class="app-home__desc">演示自动导入@/components下的组件</div>
    <app-example />
    <div class="app-home__desc">演示自动安装Mdi配置表依赖并自动导入icon组件</div>
    <i-ant-design-alipay-circle-outlined />
    <div class="app-home__desc">演示使用SVG Icon组件</div>
    <IconArrow class="w-[16px] h-[16px] text-blue-600" />
    <div class="app-home__desc">演示使用国际化</div>
    <div>{{ t('The current language environment is {language}', { language: locale }) }}</div>
    <button
      type="button"
      @click="toggleLanguage(Languages.EN)"
      class="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded"
    >
      切换为英文
    </button>
    <button
      type="button"
      @click="toggleLanguage(Languages.zhCN)"
      class="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded"
    >
      切换为中文
    </button>
    <div class="app-home__desc">演示使用主题</div>
    <div>当前主题是: {{ currentTheme }}</div>
    <div>当前主题数据是: {{ currentThemeData }}</div>
    <button
      type="button"
      @click="toggleTheme(Theme.DEFAULT)"
      class="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded"
    >
      默认跟随系统
    </button>
    <button
      type="button"
      @click="toggleTheme(Theme.LIGHT)"
      class="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded"
    >
      亮色主题
    </button>
    <button
      type="button"
      @click="toggleTheme(Theme.DARK)"
      class="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-0.5 rounded"
    >
      暗色主题
    </button>
  </div>
</template>

<style lang="scss" scoped>
.app-home {
  &__desc {
    @apply text-slate-400 italic;
  }
}
</style>
