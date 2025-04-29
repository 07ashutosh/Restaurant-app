import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language files
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationGU from './locales/gu/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationJA from './locales/ja/translation.json';
import translationCN from './locales/cn/translation.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  gu: { translation: translationGU },
  fr: { translation: translationFR },
  es: { translation: translationES },
  ja: { translation: translationJA },
  zh: { translation: translationCN }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
