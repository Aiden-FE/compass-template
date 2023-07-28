import { AvailableLanguages, Languages, AvailableLanguagesNS } from '@/config';

// eslint-disable-next-line import/prefer-default-export
export function getOptions(
  lng = AvailableLanguages.ZH_CN,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
) {
  return {
    supportedLngs: Languages,
    fallbackLng: AvailableLanguages.ZH_CN,
    lng,
    fallbackNS: AvailableLanguagesNS.COMMON,
    defaultNS: AvailableLanguagesNS.COMMON,
    ns,
  };
}
