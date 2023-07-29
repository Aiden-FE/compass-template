import { createInstance, TOptions } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getI18nOptions, AvailableLanguages, AvailableLanguagesNS, DEFAULT_LANGUAGE, DEFAULT_NS } from './settings';

const initI18next = async (lng?: AvailableLanguages, ns?: AvailableLanguagesNS | AvailableLanguagesNS[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getI18nOptions(lng, ns));
  return i18nInstance;
};

export * from './settings';
export { default as useClientTranslation } from './client';

export async function useTranslation(
  lng: AvailableLanguages = DEFAULT_LANGUAGE,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = DEFAULT_NS,
  options: TOptions = {},
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
