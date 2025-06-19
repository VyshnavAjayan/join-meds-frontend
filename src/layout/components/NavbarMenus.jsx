import {
  AlliedInstitutionManagement,
  Analytics,
  AnalyticsIcon,
  CitizenNotification,
  Dashboard,
  MyApplication,
  MyBuilding,
  MyDocuments,
  MyProfile,
  MyService,
  NewService,
  Notification,
  Payments,
  Personal,
  Profile,
  Statistics,
  TrackApplicationIcon
} from 'assets/Svg';
import { ROUTE_URL } from 'common';
import { hasRole, hasRoles } from 'utils/user';
import { CESS_ROLES } from 'pages/citizen/newServices/constants';
import { t } from 'common/components';

import {
  MODULE_CIT,
  MODULE_EMP,
  MODULE_ORG,
  // ROLE,
  USER_TYPE,
  MODULE_FILE,
  STORAGE_KEYS
} from 'common/constants';
import { useSelector } from 'react-redux';
import { getUserDetailsData } from 'pages/loginRegister/citizen/selectors';
import { getDataFromStorage } from 'utils/encryption';
import Inbox from 'assets/icons/Inbox';

const NavbarMenus = (role) => {
  const userDetailsSelector = useSelector(getUserDetailsData);
  const userDetails = getDataFromStorage(
    STORAGE_KEYS.ORGANIZATION_DETAIL,
    true
  );

  const dashBoardurl = 'ui/lbc/statistics';

  switch (role) {
    case USER_TYPE.CITIZEN: {
      return [
        {
          label: t('myApplications'),
          icon: <MyApplication />,
          route: `${MODULE_CIT}${ROUTE_URL.COMMON.DASHBOARD}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('newApplication'),
          icon: <NewService />,
          route: `${MODULE_CIT}${ROUTE_URL.COMMON.NEW_SERVICE}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('payments'),
          icon: <Payments />,
          route: `${MODULE_CIT}${ROUTE_URL.CITIZEN.PAYMENT}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('myDocuments'),
          icon: <MyDocuments />,
          route: `${MODULE_CIT}${ROUTE_URL.CITIZEN.DOCUMENTS}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('myInstitution'),
          icon: <AlliedInstitutionManagement />,
          route: `${MODULE_CIT}${ROUTE_URL.CITIZEN.INSTITUTION}`
        },
        {
          label: t('myBuilding'),
          icon: <MyBuilding />,
          route: `${MODULE_CIT}${ROUTE_URL.CITIZEN.MY_BUILDING}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('notification'),
          icon: <CitizenNotification />,
          route: `${MODULE_CIT}${ROUTE_URL.COMMON.NOTIFICATION}`,
          disabled: userDetailsSelector.isFirstLogin
        },
        {
          label: t('myProfile'),
          icon: <MyProfile />,
          route: `${MODULE_CIT}${ROUTE_URL.COMMON.PROFILE}`
        }
      ];
    }

    case USER_TYPE.ORGANIZATION: {
      return [
        {
          label: t('inbox'),
          icon: <Dashboard />,
          route: `${MODULE_ORG}${ROUTE_URL.COMMON.DASHBOARD}`
        },
        (!userDetails?.stage || userDetails?.stage === 'APPROVED') && {
          label: t('services'),
          icon: <NewService />,
          route: `${MODULE_ORG}${ROUTE_URL.COMMON.NEW_SERVICE}`
        },
        {
          label: t('myInstitution'),
          icon: <AlliedInstitutionManagement />,
          route: `${MODULE_ORG}${ROUTE_URL.ORGANISATION.INSTITUTION}`
        },
        hasRoles(CESS_ROLES) && {
          label: t('dashboard'),
          icon: <AnalyticsIcon />,
          route: dashBoardurl
        },
        {
          label: t('myProfile'),
          icon: <MyProfile />,
          route: `${MODULE_ORG}${ROUTE_URL.ORGANISATION.ORGANISATION_SUMMARY}`
        },
        userDetails?.stage
        && userDetails?.stage !== 'APPROVED' && {
          label: t('trackApplication'),
          icon: <TrackApplicationIcon />,
          route: `${MODULE_FILE}${ROUTE_URL.COMMON.TRACK_FILE}`
        },
        hasRole('SUPER_USER') || hasRole('TL_OPERATOR')
          ? {
            label: t('feedback'),
            icon: <NewService />,
            route: 'ui/pgr/organization/feedback-list'
          }
          : {}
      ];
    }

    case USER_TYPE.EMPLOYEE: {
      return [
        {
          label: t('home'),
          icon: <Dashboard />,
          route: `${MODULE_EMP}${ROUTE_URL.COMMON.DASHBOARD}/home`
        },
        {
          label: t('inbox'),
          icon: <Inbox />,
          route: `${MODULE_EMP}${ROUTE_URL.COMMON.DASHBOARD}/files`
        },

        {
          label: t('services'),
          icon: <NewService />,
          route: `${MODULE_EMP}${ROUTE_URL.EMPLOYEE.EMPLOYE_SERVICE}`
        },
        {
          label: t('myServices'),
          icon: <MyService />,
          route: `${MODULE_EMP}${ROUTE_URL.EMPLOYEE.EMPLOYEE_MY_SERVICE}`
        },
        {
          label: t('statistics'),
          icon: <Statistics />,
          route: `${MODULE_EMP}${ROUTE_URL.EMPLOYEE.EMPLOYEE_STATISTICS}`
        },
        {
          label: t('dashboard'),
          icon: <AnalyticsIcon />,
          route: `${MODULE_EMP}${ROUTE_URL.EMPLOYEE.EMPLOYEE_NEW_STATISTICS}`
        },
        {
          label: t('analytics'),
          icon: <Analytics />,
          route: `${MODULE_EMP}${ROUTE_URL.COMMON.CITIZEN_ANALYTICS}`
        },
        {
          label: t('personal'),
          icon: <Personal />,
          route: `${MODULE_EMP}${ROUTE_URL.EMPLOYEE.EMPLOYEE_PERSONAL}`
        },
        {
          label: t('notification'),
          icon: <Notification />,
          route: `${MODULE_EMP}${ROUTE_URL.COMMON.NOTIFICATION}`
        },
        {
          label: t('profile'),
          icon: <Profile />,
          route: `${MODULE_EMP}${ROUTE_URL.COMMON.PROFILE}`
        }
      ];
    }

    default: {
      return [];
    }
  }
};

export default NavbarMenus;
