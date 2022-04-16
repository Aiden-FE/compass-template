<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="app-test">
    <h1>{{ t('example') }}: </h1>
    <router-view />
  </div>
</template>

<style scoped lang="stylus">
.app-test
  color $font-color
</style>
