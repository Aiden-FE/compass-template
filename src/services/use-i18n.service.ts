import i18next from 'i18next';
import { Languages } from '@/config';
import zhCN from '@/assets/locales/zh-CN.json';
import EN from '@/assets/locales/en.json';

export async function initI18n() {
  const i18n = await i18next.init({
    lng: Languages.zhCN,
    resources: {
      [Languages.zhCN]: {
        translation: zhCN,
      },
      [Languages.EN]: {
        translation: EN,
      },
    },
    fallbackLng: Languages.zhCN,
  });
}

export default function useI18nService() {
  return {
    initI18n,
  };
}
