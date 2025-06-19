import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_URL } from 'common/routeUrls';
import { logoList } from 'utils/constants/logos';
import {
  Menu, MenuButton, MenuItem, MenuList, t
} from 'common/components';
import { routeRedirect } from 'utils/common';
import {
  CITIZEN_BASE_PATH, EMPLOYEE_BASE_PATH, ORGANISATION_BASE_PATH, WEB_PORTAL_PATH
} from 'common/constants';
import Close from '../../assets/close.svg';
import HamBurger from '../../assets/hamburger.svg';
import arrowDown from '../../assets/arrowDown.svg';
import ksmartLogo from '../../assets/ksmartLogo.svg';

const QuickSearchHeader = () => {
  // const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const language = localStorage.getItem('lang');
  const [currentLanguage, setCurrentLanguage] = useState(language || 'en');
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);
  const logos = logoList;
  return (
    <div className="bg-white py-[17px] z-50  sticky  md:flex justify-between top-0 shadow-lg">
      <div className="md:w-[30%] lg:w-[60%] flex justify-between md:justify-start gap-4 items-center  ml-4 mr-4 sm:ml-14">
        <Link to={ROUTE_URL?.ROOT}>
          <img
            src={ksmartLogo}
            alt={ksmartLogo}
            loading="lazy"
            className="w-[100px] sm:w-[120px]"
          />
        </Link>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <img src={isOpen ? Close : HamBurger} alt={Close} />
        </button>
        <div className="h-[44px] hidden lg:block bg-[#D6E1F3] w-[1px]" />
        <img
          src={logos?.govtKerala}
          alt={logos?.govtKerala}
          loading="lazy"
          className="w-[78px] hidden lg:block"
        />
        <img
          src={logos?.lsgd}
          alt={logos?.lsgd}
          loading="lazy"
          className="w-[76px] hidden lg:block"
        />
        <div className="hidden lg:block">
          <p className="text-xs text-[#5C6E93] font-light">
            {t('governmentofKerala')}
          </p>
          <p className="text-sm text-[#232F50] font-SEMIBOLD">
            {t('localSelfGovernmentDepartment')}
          </p>
        </div>
      </div>

      <div
        className={` flex ${
          isOpen
            ? 'max-md:h-[60px] max-md:opacity-100 max-sm:mt-[17px] max-md:mt-[32px] '
            : 'max-md:h-0 max-md:opacity-0'
        } md:flex  w-full md:w-[70%] lg:w-[40%]  items-center justify-end gap-4 transition-all delay-100 mr-4 sm:mr-14`}
      >
        <button className="text-[#09327B] text-xs xl:text-sm font-medium hidden">
          <p className="mr-[2px]">
            {currentLanguage === 'en' ? 'മലയാളം' : 'English'}
          </p>
          <img src={arrowDown} alt={arrowDown} className="mt-[2px]" />
        </button>
        <Menu>
          <MenuButton className="text-[#09327B] text-xs xl:text-sm font-medium cursor-pointer flex items-center">
            <div className="flex items-center mr-[10px]">
              <p className="mr-[2px]">
                {currentLanguage === 'en' ? 'മലയാളം' : 'English'}
              </p>
              <img src={arrowDown} alt={arrowDown} className="mt-[2px]" />
            </div>
          </MenuButton>
          <MenuList className=" text-xs xl:text-sm font-medium cursor-pointer">
            <MenuItem
              onClick={() => {
                i18n.changeLanguage('ml');
                setCurrentLanguage('ml');
                localStorage.setItem('lang', 'ml');
              }}
            >
              <button className="text-[#09327B] text-start h-full w-full">
                മലയാളം
              </button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                i18n.changeLanguage('en');
                setCurrentLanguage('en');
                localStorage.setItem('lang', 'en');
              }}
            >
              <button className="text-[#09327B] text-start h-full w-full">
                English
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
        <button
          onClick={() => routeRedirect(`${WEB_PORTAL_PATH}${ROUTE_URL.CITIZEN.ABOUT_US}`)}
          className="  text-xs xl:text-sm text-[#2a4d8d] font-semibold  mr-[10px]"
        >
          {t('aboutKsmart')}
        </button>
        <button
          onClick={() => routeRedirect(`${CITIZEN_BASE_PATH}${ROUTE_URL.COMMON.REGISTER}`)}
          className="w-[70px] sm:w-[90px] xl:w-[120px] h-[33px] sm:h-[40px] bg-transparent border-[1px] border-[#e83a7a] rounded-full text-[#e83a7a] text-xs  sm:text-sm xl:text-[16px] font-SEMIBOLD"
        >
          {t('register')}
        </button>
        <Menu>
          <MenuButton className="text-[#09327B] text-xs xl:text-sm font-medium cursor-pointer flex items-center">
            <div
              className=" grid place-content-center w-[70px]   sm:w-[90px] xl:w-[120px] h-[33px] sm:h-[40px]  border-[1px] bg-[#e83a7a] border-[#e83a7a] rounded-full text-white text-xs sm:text-sm xl:text-[16px]  font-SEMIBOLD"
            >
              {t('login')}
            </div>
          </MenuButton>
          <MenuList className=" text-xs xl:text-sm font-medium cursor-pointer">
            <MenuItem
              onClick={() => {
                routeRedirect(`${CITIZEN_BASE_PATH}${ROUTE_URL.COMMON.LOGIN}`);
              }}
            >
              <button className="text-[#09327B] text-start h-full w-full">
                {t('Citizenlogin')}
              </button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                routeRedirect(`/${EMPLOYEE_BASE_PATH}${ROUTE_URL.COMMON.LOGIN}`);
              }}
            >
              <button className="text-[#09327B] text-start h-full w-full">
                {t('employeelogin')}
              </button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                routeRedirect(`${ORGANISATION_BASE_PATH}${ROUTE_URL.COMMON.LOGIN}`);
              }}
            >
              <button className="text-[#09327B] text-start h-full w-full">
                {t('organizationlogin')}
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

    </div>
  );
};

export default QuickSearchHeader;
