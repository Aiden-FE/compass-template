<script setup lang="ts">
import { useThemeStore } from '@/stores';
import { ThemeConfig } from '@/config';
import { Theme } from '@/interfaces';

const { initializeTheme, register } = useThemeStore();

onMounted(() => {
  initializeTheme();
  register(Theme.LIGHT, ThemeConfig.light);
  register(Theme.DARK, ThemeConfig.dark);
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
