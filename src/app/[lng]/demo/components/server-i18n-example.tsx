import { useServerTranslation } from '@/i18n/server';
import { AvailableLanguages } from '@/config';
import Link from 'next/link';
import { AppComponentProps } from '@/interfaces';
import ServerToggleBtns from './server-toggle-btns';

async function I18nExample({ lng }: AppComponentProps) {
  const { t, i18n } = await useServerTranslation(lng || AvailableLanguages.ZH);

  return (
    <div>
      {t('The current language is', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <Link
          className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
          href={`/${AvailableLanguages.ZH}/demo`}
        >
          link方式 使用中文
        </Link>
        <Link
          className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
          href={`/${AvailableLanguages.EN}/demo`}
        >
          Use link to toggle English
        </Link>
        <ServerToggleBtns />
      </div>
    </div>
  );
}

export default I18nExample;
