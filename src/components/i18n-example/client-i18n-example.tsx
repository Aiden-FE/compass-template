'use client';

import { useClientTranslation } from '@/i18n/client';
import { AvailableLanguages } from '@/config';

function ClientI18nExample() {
  const { t, i18n } = useClientTranslation();

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
