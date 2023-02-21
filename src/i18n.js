import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import globalEN from '@/translations/en/global.json';
import globalES from '@/translations/es/global.json';

const resources = {
  en: {
    translation: globalEN
  },
  es: {
    translation: globalES
  }
};

const storeLanguage = localStorage.getItem('lng');
if (!storeLanguage) {
  const systemLanguage = navigator.language;
  if (/^en\b/.test(systemLanguage)) {
    localStorage.setItem('lng', 'en');
  } else if (/^es\b/.test(systemLanguage)) {
    localStorage.setItem('lng', 'es');
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lng'),
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
