<script setup lang="ts">
import { useConfigProvider } from '@/components/config-provider';

const { t } = useConfigProvider();
</script>

<template>
  <p>{{ t('This is a {pageName} page', { pageName: 'example' }) }}</p>
</template>
