import { createInstance } from 'i18next';
import { useCallback, useEffect, useState } from '@saasquatch/stencil-hooks';
import cloneDeep from 'lodash-es/cloneDeep';
import zhCN from '../static/locales/zh-CN.json';
import { globalEmitter, LANGUAGE_RESOURCE_CHANGED_EVENT } from '@/utils/emitter';
import { Context } from '@/interfaces';

/** 可用语言命名空间 */
export enum AvailableLanguagesNS {
  COMMON = 'common',
  LOGIN = 'login',
  PROMPTS = 'prompts',
}

/** 默认语言 */
export const DEFAULT_LANGUAGE = 'Translation';

/** 默认语言命名空间 */
export const DEFAULT_LANGUAGE_NS = AvailableLanguagesNS.COMMON;

const i18n = createInstance({
  lng: DEFAULT_LANGUAGE,
  supportedLngs: [DEFAULT_LANGUAGE],
  fallbackLng: DEFAULT_LANGUAGE,
  ns: [AvailableLanguagesNS.COMMON],
  defaultNS: DEFAULT_LANGUAGE_NS,
  fallbackNS: DEFAULT_LANGUAGE_NS,
  initImmediate: true,
  resources: {
    [DEFAULT_LANGUAGE]: cloneDeep(zhCN),
  },
});
i18n.init();

export function useI18n(ns: AvailableLanguagesNS | AvailableLanguagesNS[] = DEFAULT_LANGUAGE_NS) {
  const [result, setT] = useState({
    t: i18n.getFixedT(DEFAULT_LANGUAGE, ns),
  });

  const handleResourceChanged = useCallback(
    (lang: Context['language']) => {
      Object.keys(lang).forEach((key) => {
        i18n.addResourceBundle(DEFAULT_LANGUAGE, key, lang[key], false, true);
      });
      setT({
        t: i18n.getFixedT(DEFAULT_LANGUAGE, ns),
      });
    },
    [ns],
  );

  useEffect(() => {
    globalEmitter.on(LANGUAGE_RESOURCE_CHANGED_EVENT, handleResourceChanged);
    return () => globalEmitter.off(LANGUAGE_RESOURCE_CHANGED_EVENT, handleResourceChanged);
  }, [handleResourceChanged]);

  return result;
}
