<script setup lang="ts">
import { provide, computed } from 'vue';
import { merge } from 'es-toolkit';
import { CONFIG_SYMBOL, getDefaultConfig, type IConfigProvider } from './base';

const props = defineProps<Partial<IConfigProvider>>();

const provideConfig = computed(() => merge(getDefaultConfig(), props));

provide(CONFIG_SYMBOL, provideConfig);
</script>

<template>
  <slot />
</template>
