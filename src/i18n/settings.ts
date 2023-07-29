/** 可用语言枚举 */
export enum AvailableLanguages {
  ZH_CN = 'zh-CN',
  EN = 'en',
}

/** 可用命名空间枚举 */
export enum AvailableLanguagesNS {
  COMMON = 'common',
  LOGIN = 'login',
}

export const Languages = [AvailableLanguages.ZH_CN, AvailableLanguages.EN];

/** 默认语言 */
export const DEFAULT_LANGUAGE = AvailableLanguages.ZH_CN;

/** 默认语言命名空间 */
export const DEFAULT_NS = AvailableLanguagesNS.COMMON;

export function getI18nOptions(
  lng = AvailableLanguages.ZH_CN,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
) {
  return {
    supportedLngs: Languages,
    fallbackLng: DEFAULT_LANGUAGE,
    lng,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  };
}
