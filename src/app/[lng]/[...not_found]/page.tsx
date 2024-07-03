import Link from 'next/link';
import AppIcon from '@/components/app-icon/app-icon';
import '@/assets/styles/global.scss';
import { PageProps } from '@/interfaces';
import { useServerTranslation } from '@/i18n/server';

export default async function NotFound({ params: { lng } }: PageProps) {
  const { t } = await useServerTranslation(lng);

  return (
    <section>
      {/* Container */}
      <div className="px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <AppIcon className="text-9xl mb-8" style={{ color: '#f5a524' }} icon="mdi:error" />
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t('404 Page not found')}</h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
            {t('Oops! The page you are looking for does not exist.')}
          </p>
          <Link
            className="inline-block items-center rounded-md bg-black px-6 py-2 text-center font-semibold text-white"
            href={`/${lng}`}
          >
            {t('Back to home')}
          </Link>
        </div>
      </div>
    </section>
  );
}
