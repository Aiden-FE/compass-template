import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/login-form';
import { CommonPageProps } from '@/interfaces';
import { useTranslation, AvailableLanguagesNS } from '@/i18n';

async function HomePage({ params: { lng } }: CommonPageProps) {
  const { t } = await useTranslation(lng, AvailableLanguagesNS.LOGIN);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="logo"
          width="88"
          height="88"
        />
        <h2 className="m-0 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('Please login to your account')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm lang={lng} />

        <p className="mt-10 text-center text-sm text-gray-500">
          {t('Not a member')}?
          <Link href={`${lng}/example`}>
            <button
              type="button"
              className="bg-white border-0 cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {t('Free trial')}
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
