'use client';

import { AvailableLanguages } from "@/config";
import { useClientTranslation } from "@/i18n/client";

export default function ServerToggleBtns() {
  const { changeLanguage } = useClientTranslation();

  function onClickChangeLanguage(lang: AvailableLanguages) {
    changeLanguage(lang);
  }

  return (
    <>
      <button
        className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
        onClick={() => onClickChangeLanguage(AvailableLanguages.ZH)}
        type="button"
      >
        编程方式切换中文
      </button>
      <button
        className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
        onClick={() => onClickChangeLanguage(AvailableLanguages.EN)}
        type="button"
      >
        Use javascript to toggle English
      </button>
    </>
  )
}
