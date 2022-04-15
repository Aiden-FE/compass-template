<template>
  <div>current language: {{ locale }}</div>
  <button @click="switchLanguage">
    切换语言
  </button>
  <p>{{ t('test') }}</p>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

function switchLanguage() {
  locale.value = locale.value === 'en' ? 'zh-CN' : 'en';
}
</script>
