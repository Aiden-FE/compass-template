'use client';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import i18next, { TOptions } from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AvailableLanguages, AvailableLanguagesNS, Languages } from '@/config';
import getOptions from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? Languages : [],
  });

// eslint-disable-next-line import/prefer-default-export
export function useClientTranslation(
  initLng?: AvailableLanguages,
  ns: AvailableLanguagesNS | AvailableLanguagesNS[] = AvailableLanguagesNS.COMMON,
  options: TOptions = {},
) {
  const ret = useTranslationOrg(ns, options);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ lng: AvailableLanguages }>();
  let lng = initLng;
  if (!initLng) {
    lng = params.lng || AvailableLanguages.ZH;
  }

  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }
  return {
    ...ret,
    changeLanguage: (targetLng: AvailableLanguages, options = {
      cancelRouterPush: false,
    }) => {
      i18n.changeLanguage(targetLng);
      if (options?.cancelRouterPush) {
        return;
      }
      return router.push(`/${targetLng}${pathname.replace(`/${params.lng}`, '')}`);
    }
  };
}
