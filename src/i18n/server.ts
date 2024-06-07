import { createInstance, TOptions } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { AvailableLanguages, AvailableLanguagesNS } from '@/config';
import getOptions from './settings';

const initI18next = async (lng?: AvailableLanguages, ns?: AvailableLanguagesNS | AvailableLanguagesNS[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useServerTranslation(
  lng: AvailableLanguages,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
  options: TOptions = {},
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix as any),
    i18n: i18nextInstance,
  };
}
