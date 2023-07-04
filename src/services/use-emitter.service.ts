import Emittery from 'emittery';
import { GlobalEvents } from '@/config';
import useCallbackBeforeUnmountService from './use-callback-before-unmount.service';

const emitter = new Emittery();

export default function useEmitterService() {
  const { addCallback } = useCallbackBeforeUnmountService();

  function on(eventName: GlobalEvents, callback: (data: unknown) => void, option?: {
    destroyBeforeLeaving: boolean;
  }) {
    const opt = {
      destroyBeforeLeaving: true,
      ...option,
    }
    emitter.on(eventName, callback);
    if (opt.destroyBeforeLeaving) {
      addCallback(() => {
        emitter.off(eventName, callback);
      });
    }
  }

  function once(eventName: GlobalEvents) {
    return emitter.once(eventName);
  }

  function emit(eventName: GlobalEvents, data?: unknown) {
    return emitter.emit(eventName, data);
  }

  function off(eventName: GlobalEvents, callback: (data: unknown) => void) {
    return emitter.off(eventName, callback)
  }

  /**
   * @description 销毁全局实例上的事件监听器
   * @param eventName 一旦设置则仅清除特定名称事件
   */
  function destroy(eventName?: GlobalEvents) {
    emitter.clearListeners(eventName);
  }

  return {
    on,
    once,
    emit,
    off,
    destroy,
  };
}
