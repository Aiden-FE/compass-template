import { defineStore } from 'pinia';
import { toRaw, ref } from 'vue';

interface UserInfo {
  username?: string;
}

interface Context {
  token: string;
  userInfo?: UserInfo;
}

const useContextStore = defineStore('context', () => {
  const context = ref<Context>({
    token: '',
    userInfo: undefined,
  });

  // 更新用户信息
  function updateContext(info: UserInfo) {
    context.value = {
      ...context.value,
      ...info,
    };
  }

  /**
   * @description 根据key来获取上下文
   * @param [key]
   * @param [defaultValue]
   * @example
   * getContext(); // 获取所有 context
   * getContext('token'); // 获取 token
   * getContext('token', 'Not found'); // 获取 token，未找到则返回 Not found
   */
  // eslint-disable-next-line no-redeclare
  function getContext(): Context;
  // eslint-disable-next-line no-redeclare
  function getContext<Key extends keyof Context>(key: Key): Context[Key];
  // eslint-disable-next-line no-redeclare
  function getContext<Key extends keyof Context, DefaultValue = unknown>(
    key: Key,
    defaultValue: DefaultValue,
  ): Context[Key] | DefaultValue;
  // eslint-disable-next-line no-redeclare
  function getContext<Key extends keyof Context, DefaultValue = unknown>(key?: Key, defaultValue?: DefaultValue) {
    if (!key) {
      return context.value;
    }
    return context.value[key] === undefined ? defaultValue! : toRaw(context.value[key]);
  }

  return {
    context,
    updateContext,
    getContext,
  };
});

export default useContextStore;
