<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="compass-app">
    <h1>{{ t('example') }}: </h1>
    <router-view />
  </div>
</template>

<style scoped lang="stylus">
.compass-app
  color $font-color
  height 2000px
</style>
