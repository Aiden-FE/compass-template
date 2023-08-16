import merge from 'lodash-es/merge';
import { useEffect, useState } from '@saasquatch/stencil-hooks';
import { Context } from '@/interfaces';
import { CONTEXT_CHANGED_EVENT, globalEmitter, LANGUAGE_RESOURCE_CHANGED_EVENT } from '@/utils/emitter';
import zhCN from '../static/locales/zh-CN.json';

const CONTEXT_SYMBOL = Symbol('CPWebComponentsContext');

const win = window || global;

const getDefaultContext = (): Context => ({
  language: zhCN,
  componentSize: 'middle',
});

/**
 * @description 设置上下文
 * @param context 上下文,会与内部上下文合并
 */
export function setupContext(context: Partial<Context>) {
  let ctx = (win[CONTEXT_SYMBOL] as Context) || getDefaultContext();
  let resource: undefined | any;
  // 当语言发生变更后则应用
  if (context.language && context.language !== ctx.language) {
    resource = context.language;
  }

  ctx = merge({}, ctx, context);
  win[CONTEXT_SYMBOL] = ctx;
  globalEmitter.emit(CONTEXT_CHANGED_EVENT, ctx);

  if (resource) {
    globalEmitter.emit(LANGUAGE_RESOURCE_CHANGED_EVENT, context.language);
  }
  return ctx;
}

if (!win[CONTEXT_SYMBOL]) {
  setupContext({});
}

/**
 * @description 移除所有上下文,置为默认
 */
export function destroyContext() {
  delete win[CONTEXT_SYMBOL];
  globalEmitter.emit(CONTEXT_CHANGED_EVENT, setupContext({}));
}

/**
 * @description 获取上下文
 */
export function getContext(): Context;

/**
 * @description 获取上下文
 * @param [key] 上下文的key,不提供则获取所有上下文,
 */
export function getContext<Key extends keyof Context>(key: Key): Context[Key];

/**
 * @description 获取上下文
 * @param [key] 上下文的key,不提供则获取所有上下文
 */
export function getContext<Key extends keyof Context | undefined>(
  key?: Key,
): Key extends undefined ? Context : Context[Key] {
  if (!win[CONTEXT_SYMBOL]) {
    setupContext({});
  }
  return key ? win[CONTEXT_SYMBOL][key] : win[CONTEXT_SYMBOL];
}

/** 组件内响应式获取上下文及其操作函数,不对外导出 */
export function useAppContext() {
  const [context, setContext] = useState(getContext());

  useEffect(() => {
    const listenCtxChanged = (ctx: Context) => {
      setContext(ctx);
    };
    /** 当上下文变更时同步上下文 */
    globalEmitter.on(CONTEXT_CHANGED_EVENT, listenCtxChanged);
    return () => globalEmitter.off(CONTEXT_CHANGED_EVENT, listenCtxChanged);
  }, []);

  return {
    context,
    setContext: setupContext,
  };
}
