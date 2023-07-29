'use client';

import { useClientTranslation, AvailableLanguages } from '@/i18n';
import {CommonComponentProps} from "@/interfaces";

function ClientI18nExample({ lang }: CommonComponentProps) {
  const { t, i18n } = useClientTranslation(lang);

  function toggleLang(lng: AvailableLanguages) {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      {t('currentLanguage', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <button onClick={() => toggleLang(AvailableLanguages.ZH_CN)} type="button">
          使用中文
        </button>
        <button onClick={() => toggleLang(AvailableLanguages.EN)} type="button">
          Use English
        </button>
      </div>
    </div>
  );
}

export default ClientI18nExample;
