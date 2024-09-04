/**
 * @description 卸载前阶段执行停止副作用函数
 * @example
 * // vue script组件内
 * const { addDestroyFunc } = useDestroy();
 * addDestroyFunc(watch(() => ref, () => func()));
 * addDestroyFunc(watchEffect(() => func()));
 * addDestroyFunc(function customDestroy() {});
 */
export default function useCallbackBeforeUnmountService() {
  let cbs: (() => unknown)[] = [];

  // 添加待销毁的回调
  function addCallback(cb: (() => unknown) | (() => unknown)[]) {
    const callbackArr = Array.isArray(cb) ? cb : [cb];
    callbackArr.forEach((callbackFunc) => {
      if (typeof callbackFunc === 'function') {
        cbs.push(callbackFunc);
      } else {
        // eslint-disable-next-line no-console
        console.warn('不是一个可执行的销毁函数', callbackFunc);
      }
    });
  }

  onUnmounted(() => {
    cbs.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('销毁函数执行异常', e);
      }
    });
    cbs = [];
  });

  return {
    addCallback,
  };
}
