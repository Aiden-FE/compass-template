import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App.tsx';
import './assets/styles/global.scss';
import AppProviders from '@/stores/store';
import EnglishJSON from '@/assets/locales/en.json';
import ZhCNJSON from '@/assets/locales/zh-CN.json';

i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': {
      translation: ZhCNJSON,
    },
    en: {
      translation: EnglishJSON,
    },
  },
  lng: 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
