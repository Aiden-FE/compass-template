import { AvailableLanguages, Languages, AvailableLanguagesNS } from '@/config';

export default function getOptions(
  lng = AvailableLanguages.ZH,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
) {
  return {
    supportedLngs: Languages,
    fallbackLng: AvailableLanguages.ZH,
    lng,
    fallbackNS: AvailableLanguagesNS.COMMON,
    defaultNS: AvailableLanguagesNS.COMMON,
    ns,
  };
}
