import React from 'react';
import { useLocation } from 'react-router-dom';
import { t } from 'common/components';

const Footer = () => {
  const { pathname } = useLocation();

  if (['register', 'login', 'signIn'].includes(pathname.split('/').at(-1))) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between px-4 sm:px-10 md:px-20 py-3 sm:py-4 bg-white border border-t-2 absolute bottom-0 w-full z-10  sm:z-10">
      <div>
        <p className="text-xs sm:text-sm">{t('copyRight')}{new Date().getFullYear()}{t('govtOfKerala')}</p>
      </div>
      <div className="flex  gap-3 sm:gap-0 items-center">
        <p className="text-xs sm:text-sm">{t('termsAndConditions')}</p>
        <p className="text-xs sm:text-sm">{t('privacyPolicy')}</p>
      </div>
    </div>
  );
};

export default Footer;
