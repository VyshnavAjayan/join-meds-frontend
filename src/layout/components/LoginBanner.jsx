import React from 'react';
import { useLocation } from 'react-router-dom';
import { t } from 'common/components';

const LoginBanner = () => {
  const { pathname } = useLocation();

  if (['register', 'login', 'signIn'].includes(pathname.split('/').at(-1))) {
    return null;
  }

  return (
    <div className="hidden sm:flex justify-between px-20 py-4 bg-white border border-t-2 fixed bottom-0 w-full z-10">
      <div>
        <p className="text-sm">{t('copyRight')}{new Date().getFullYear()}{t('govtOfKerala')}</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-sm">{t('termsAndConditions')}</p>
        <p className="text-sm">{t('privacyPolicy')}</p>
      </div>
    </div>
  );
};

export default LoginBanner;
