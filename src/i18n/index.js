import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locale';

i18next
  .use(initReactI18next)
  .init(
    {
      resources,
      lng: 'en',
      fallbackLng: 'en',
      debug: true,
      defaultNS: ['template', 'common', 'home', 'validate'],
      interpolation: {
        escapeValue: false
      }
    }
  );

export default i18next;
