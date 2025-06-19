/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_KEYS } from 'common/constants';
import { getDataFromStorage } from 'utils/encryption';
import { routeRedirect } from 'utils/common';
import { actions as commonSliceActions } from 'pages/common/slice';
import _ from 'lodash';
import { t } from 'common/components';
import { fetchPublicFileLogList } from 'pages/common/actions';
import NotificationPopup from 'pages/employee/notification/components/NotificationPopup';
import { getNotification } from 'pages/employee/common/selectors';
import { actions as commonActions } from 'pages/employee/common/slice';
import { getMinimalNotification } from 'pages/employee/notification/selectors';
import { fetchMinimalNotification } from 'pages/employee/notification/actions';
import MenuIcon from 'assets/MenuIcon';
import NavbarMenus from './NavbarMenus';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const {
    userType: roleGet, name, designation, fileNo
  } = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || {};

  const notificationPopShow = useSelector(getNotification);
  const NotificationCount = useSelector(getMinimalNotification);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
        setIsMdScreen(true);
      } else {
        setIsOpen(false);
        setIsMdScreen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (fileNo) {
      dispatch(fetchPublicFileLogList({ fileNo }));
    }
  }, [fileNo]);

  useEffect(() => {
    const { offices = [] } = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || [];
    const roles = getDataFromStorage(STORAGE_KEYS.USER_ROLES, true);

    const jsonData = [];

    offices.forEach((office) => {
      const serviceCode = [];

      roles.forEach((role) => {
        if (office.id === role.id) {
          serviceCode.push(role.code);
        }
      });

      jsonData.push({
        officeId: office.id,
        officeName: office.nameInEng,
        serviceCode
      });
    });

    dispatch(fetchMinimalNotification(jsonData));
  }, []);

  const dashBoardURL = 'ui/lbc/statistics';

  const navBarMenus = NavbarMenus(roleGet);

  const formattedNavBarMenus = navBarMenus?.filter((item) => ![null, false, undefined, {}].includes(item));

  return (
    <div className="flex justify-between flex-wrap md:flex-nowrap lg:h-[76px] h-[auto] p-[2px] items-center md:px-[80px] px-[0px] bg-[white] relative">
      {!isMdScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-[110px] right-2 transform -translate-y-1/2 transition-all w-10 h-10 justify-center items-center rounded-r-md z-[10] md:left-20"
        >
          <span className="text-lg font-bold"><MenuIcon /></span>
        </button>
      )}
      <div className="font-[700] text-[16px] leading-6 text-[rgba(9,_50,_123,_0.3)]  w-[600px]">
        <span>{name}</span>
        <br />
        <span>{designation}</span>
      </div>
      {!location?.pathname?.includes('home/audit/application') && isOpen && (
        <div
          onClick={() => {
            if (!isMdScreen) setIsOpen(false);
          }}
          className="flex flex-wrap md:flex-nowrap items-center justify-around h-full gap-6 sm:gap-8 md:gap-4 lg:gap-12 p-6 md:p-4 relative whitespace-nowrap"
        >
          {formattedNavBarMenus.map(({
            label, icon, route, disabled = false
          }) => {
            if (label) {
              return (
                <button
                  disabled={disabled}
                  className={`NavBtn relative bg-white ${location.pathname.includes(route) ? 'active' : ''}`}
                  onClick={() => {
                    if (label === 'Feedback' || (label === t('dashboard') && route === dashBoardURL)) {
                      routeRedirect(route);
                      return;
                    }

                    if (label === t('trackApplication')) {
                      dispatch(commonSliceActions.setTrackFileShow(true));
                      return;
                    }

                    if (label === t('notification')) {
                      dispatch(commonActions.setNotification(!notificationPopShow));
                      return;
                    }

                    navigate(route, { replace: true });
                  }}
                  key={label}
                >
                  {label === t('notification') ? (
                    <div className="flex justify-center items-center h-6 w-6 text-white  absolute -top-1 right-0 rounded-full bg-[rgb(232,58,122)]">
                      {_.get(NotificationCount, 'count', 0)}
                    </div>
                  ) : null}
                  {icon}
                  <span>{label}</span>
                </button>
              );
            }
          })}
          {notificationPopShow ? <NotificationPopup /> : null}
        </div>
      )}
      <div className="w-80" />
    </div>
  );
};

export default Navbar;
