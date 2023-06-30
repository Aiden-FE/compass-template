import { get, set } from 'lodash-es';
import type { ContextType } from '@/interfaces';
import { defineStore } from 'pinia';
import { computed, readonly, ref, watch } from 'vue';

function getDefaultContext(): ContextType {
  return {};
}

export default defineStore('context', () => {
  const $$context = ref<ContextType>(getDefaultContext());

  const context = computed(() => readonly($$context.value));

  watch(
    () => $$context.value,
    (v) => {
      // eslint-disable-next-line no-console
      console.debug('Context updated: ', v);
    },
  );

  /**
   * @description 设置一个新的上下文,将清空原有上下文
   * @param ctx
   */
  function setContext(ctx: Partial<ContextType>) {
    $$context.value = {
      ...getDefaultContext(),
      ...ctx,
    };
  }

  /**
   * @description 将一个数据合并至现有上下文内
   * @param ctx
   */
  function mergeContext(ctx: Partial<ContextType>) {
    $$context.value = {
      ...$$context.value,
      ...(ctx || {}),
    };
  }

  /**
   * @description 获取所有上下文
   */
  function getContext() {
    return readonly($$context.value);
  }

  /**
   * @description 根据key来获取上下文
   * @param key
   * @param defaultValue
   */
  function getContextByKey<Key extends keyof ContextType, DefaultValue = undefined>(
    key: Key,
    defaultValue?: DefaultValue,
  ): ContextType[Key] | DefaultValue {
    // @ts-ignore
    return get($$context.value, key, defaultValue);
  }

  /**
   * @description 根据key来设置上下文
   * @param key
   * @param value
   */
  function setContextByKey<Key extends keyof ContextType, Value extends ContextType[Key]>(key: Key, value: Value) {
    return set($$context.value, key, value);
  }

  return {
    context,
    setContext,
    mergeContext,
    getContext,
    getContextByKey,
    setContextByKey,
  };
});
