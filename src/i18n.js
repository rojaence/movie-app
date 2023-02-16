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

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lng') || 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
