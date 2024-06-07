'use client';
import { useClientTranslation } from '@/i18n/client';
import { AvailableLanguages } from '@/config';

function ClientI18nExample() {
  const { t, i18n, changeLanguage } = useClientTranslation();

  return (
    <div>
      {t('The current language is', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <button
          className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
          onClick={() => changeLanguage(AvailableLanguages.ZH)}
          type="button"
        >
          使用中文
        </button>
        <button
          className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
          onClick={() => changeLanguage(AvailableLanguages.EN)}
          type="button"
        >
          Use English
        </button>
      </div>
    </div>
  );
}

export default ClientI18nExample;
