import { useTranslation } from '@/i18n';
import { ComponentProps } from '@/interfaces';
import { AvailableLanguages } from '@/config';
import Link from 'next/link';

async function I18nExample({ lang }: ComponentProps) {
  const { t, i18n } = await useTranslation(lang);

  return (
    <div>
      {t('currentLanguage', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <Link href={`/${AvailableLanguages.ZH_CN}/example`}>使用中文</Link>
        <br />
        <Link href={`/${AvailableLanguages.EN}/example`}>Use English</Link>
      </div>
    </div>
  );
}

export default I18nExample;
