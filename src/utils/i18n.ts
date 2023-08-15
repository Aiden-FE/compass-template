import get from 'lodash-es/get';
import { useEffect, useState } from '@saasquatch/stencil-hooks';
import { getContext } from '@/utils/context';
import { globalEmitter, LANGUAGE_RESOURCE_CHANGED_EVENT } from '@/utils/emitter';
import { useUpdate } from '@/utils/utils';

export enum AvailableLanguageNS {
  COMMON = 'common',
}

export const DEFAULT_LANGUAGE_NS = AvailableLanguageNS.COMMON;

export function useTranslation(ns: AvailableLanguageNS | AvailableLanguageNS[] = DEFAULT_LANGUAGE_NS) {
  function getTranslation() {
    return {
      t: (key: string, params?: object) => {
        const ctx = getContext();
        const useNS = Array.isArray(ns) ? ns : [ns];
        if (!useNS.includes(DEFAULT_LANGUAGE_NS)) {
          useNS.push(DEFAULT_LANGUAGE_NS);
        }
        const namespaces = useNS.map((item) => {
          return ctx.language[item];
        });
        const data = namespaces.find((item) => {
          const result = get(item, key, key);
          return !!result;
        });
        console.log('FIXME: ', ctx, data, params);
        return get(data, key, key);
      },
    };
  }

  const [trans, setTrans] = useState(getTranslation());

  const update = useUpdate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChanged = (res) => {
    console.log('语言环境发生变更', res);
    setTrans(getTranslation());
    update();
  };

  useEffect(() => {
    globalEmitter.on(LANGUAGE_RESOURCE_CHANGED_EVENT, handleChanged);

    return () => globalEmitter.off(LANGUAGE_RESOURCE_CHANGED_EVENT, handleChanged);
  }, [handleChanged]);

  return trans;
}
