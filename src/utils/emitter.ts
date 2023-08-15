import Emittery from 'emittery';
import { Context } from '@/interfaces';

/** 上下文变更事件 */
export const CONTEXT_CHANGED_EVENT = Symbol('CONTEXT_CHANGED_EVENT');

/** 语言包变更 */
export const LANGUAGE_RESOURCE_CHANGED_EVENT = Symbol('LANGUAGE_RESOURCE_CHANGED_EVENT');

interface EmitterEvents {
  [CONTEXT_CHANGED_EVENT]: Context;
  [LANGUAGE_RESOURCE_CHANGED_EVENT]: Context['language'];
  /** 未知的自定义事件 */
  [key: string | symbol]: unknown;
}

/**
 * @see https://github.com/sindresorhus/emittery
 */
export const globalEmitter = new Emittery<EmitterEvents>();
