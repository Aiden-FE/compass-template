'use client';

import { FormEvent } from 'react';
import { CommonComponentProps } from '@/interfaces';
import { AvailableLanguagesNS, useClientTranslation } from '@/i18n';

function LoginForm({ lang }: CommonComponentProps) {
  const { t } = useClientTranslation(lang, AvailableLanguagesNS.LOGIN);

  function submit(ev: FormEvent) {
    ev.preventDefault();
  }
  function forgotPassword() {}

  return (
    <form className="space-y-6" action="" method="POST" onSubmit={(e) => submit(e)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {t('Email address')}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            {t('Password')}
          </label>
          <div className="text-sm">
            <button
              type="button"
              onClick={forgotPassword}
              className="bg-white border-0 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t('Forgot password')}?
            </button>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="border-0 cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t('Sign in')}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
