<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from '@/stores';
import { Theme, ThemeConfig } from '@/config';

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
