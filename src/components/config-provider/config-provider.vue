<script setup lang='ts'>
import { useCallbackBeforeUnmountService } from '@/services';
import type {
  ConfigProviderProps, ConfigProviderOption, ConfigProviderEmits, ConfigProviderExpose
} from '@/interfaces';
import { merge } from 'lodash-es';
import i18next from 'i18next';
import { configSymbol, Languages } from '@/config';

const props = defineProps<ConfigProviderProps>();

const emit = defineEmits<ConfigProviderEmits>();

const { addCallback } = useCallbackBeforeUnmountService();

const configProviderOption = ref<ConfigProviderOption>({
  lang: Languages.zhCN,
  changeLanguage: (lang) => {
    configProviderOption.value.lang = lang;
    emit('langChange', lang);
  }
});

/** readonly 禁止被子孙组件意外篡改数据 */
provide(configSymbol, readonly(configProviderOption));

addCallback(watch(props, () => {
  configProviderOption.value = merge({}, toRaw(configProviderOption.value), toRaw(props));
}, { immediate: true }));

addCallback(watch(() => configProviderOption.value.lang, (lang) => {
  if (i18next.language !== lang) {
    i18next.changeLanguage(lang);
  }
}, { immediate: true }));

defineExpose<ConfigProviderExpose>({
  getConfig: () => {
    return readonly(configProviderOption);
  },
});
</script>

<template>
  <slot />
</template>

<style scoped>

</style>
