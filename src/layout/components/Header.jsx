/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Alert,
  Button, FormController, IconButton, ksmThemeStyles, Tooltip
} from 'common/components';
import { BASE_PATH, MODULE_PATH, STORAGE_KEYS } from 'common/constants';
import { logout } from 'pages/common/actions';
import { actions as commonSliceActions } from 'pages/common/slice';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useForm } from 'react-hook-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { light } from 'utils/color';
import { getDataFromStorage, setDataToStorage } from 'utils/encryption';
import _ from 'lodash';
import { actions as commonActions } from 'pages/employee/common/slice';
import { getNotification } from 'pages/employee/common/selectors';
import {
  LogoutMobileView, NotificationMobileView, ProfileMobileView
} from 'assets/Svg';
import NotificationPopup from 'pages/employee/notification/components/NotificationPopup';
import BellRing from 'assets/icons/bellRing';
import { Logo, Profile, Logout } from './Icons';

const { colors } = ksmThemeStyles;
const Header = ({ setUserInfo, navigate }) => {
  const { control, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      offices: '',
      postId: ''
    }
  });

  const {
    // userType:
    userName,
    typeOfUser
  } = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || {};
  const webAlert = import.meta.env.VITE_WEB_ALERT;
  const dispatch = useDispatch();
  const { offices } = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || {};
  const location = useLocation();
  const [showAuditToggle, setShowAuditToggle] = useState(false);
  const [officeServices, setOfficeServices] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  const [previlagesInfo, setPrevilagesInfo] = useState([]);
  const handleLogout = () => {
    dispatch(logout());
  };

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const officeId = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID));
  const userRoles = getDataFromStorage(STORAGE_KEYS.USER_ROLES, true) || [];
  const userDetails = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || [];
  const notificationPopShow = useSelector(getNotification);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [webAlertData, setWebAlertData] = useState(null);

  useEffect(() => {
    if (webAlert) {
      fetch(webAlert)
        .then((res) => res.json())
        .then((data) => {
          const alertData = data?.serviceAlert;
          if (alertData?.status === true && alertData?.message) {
            setWebAlertData(alertData);
          }
        })
        .catch(() => {
          // console.error('Failed to load web alert:', err);
        });
    }
  }, [webAlert]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobileOrTablet(true); // Mobile or Tablet screen
      } else {
        setIsMobileOrTablet(false); // Web screen
      }
    };
    // Run the function on load and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOffice = (data) => {
    let isAuditor = false;
    let selectedPostId;
    localStorage.setItem(STORAGE_KEYS.OFFICE_ID, data?.id);
    localStorage.setItem(STORAGE_KEYS.OFFICE_TYPE_ID, data?.lbTypeId);
    if ((_.find(data?.postInfo, { primary: true }))) {
      selectedPostId = _.find(data?.postInfo, { primary: true })?.id;
    } else {
      selectedPostId = data?.postInfo[0]?.id;
    }

    localStorage.setItem(STORAGE_KEYS.POST_ID, selectedPostId);

    const filteredServices = userRoles?.filter(
      (item) => item?.postId === selectedPostId
    );

    // Check for auditor privilege before switching
    if (data?.privileges?.length > 0) {
      data?.privileges?.forEach((item) => {
        if (
          item?.privilege?.includes('AUDITOR')
          && item?.postId === localStorage.getItem(STORAGE_KEYS.POST_ID)
        ) {
          isAuditor = true;
        }
      });
    }

    // Preserve the current auditor state
    const currentIsAuditorActive = location.pathname.includes(
      'home/audit/application'
    );

    // Update storage with preserved state
    setDataToStorage(
      STORAGE_KEYS.USER_DETAILS,
      {
        ...userDetails,
        postId: selectedPostId,
        isAuditor,
        isAuditorActive: currentIsAuditorActive && isAuditor
      },
      true
    );

    // Navigate based on preserved state
    if (filteredServices?.length === 0 && isAuditor) {
      navigate(`${BASE_PATH}/${MODULE_PATH}/audit/application`);
    } else if (currentIsAuditorActive && !isAuditor) {
      navigate(`${BASE_PATH}/${MODULE_PATH}/employee/dashboard`);
    }

    window.location.reload();
  };

  const handlePostId = (data) => {
    let isAuditor = false;
    const filteredServices = userRoles?.filter(
      (item) => item?.postId === data?.id
    );

    const selectedOffice = offices?.find(
      (item) => item?.id === JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))
    );

    // Check for auditor privilege before switching
    if (selectedOffice?.privileges?.length > 0) {
      selectedOffice?.privileges?.forEach((item) => {
        if (item?.privilege?.includes('AUDITOR') && item?.postId === data?.id) {
          isAuditor = true;
        }
      });
    }
    // Preserve the current auditor state
    const currentIsAuditorActive = location.pathname.includes(
      'home/audit/application'
    );

    // Update storage with preserved state
    setDataToStorage(
      STORAGE_KEYS.USER_DETAILS,
      {
        ...userDetails,
        postId: data?.id,
        isAuditor,
        isAuditorActive: currentIsAuditorActive && isAuditor
      },
      true
    );

    setValue('postId', data?.id);
    localStorage.setItem(STORAGE_KEYS.POST_ID, data?.id);

    // Navigate based on preserved state
    if (filteredServices?.length === 0 && isAuditor) {
      navigate(`${BASE_PATH}/${MODULE_PATH}/audit/application`);
    } else if (currentIsAuditorActive && !isAuditor) {
      navigate(`${BASE_PATH}/${MODULE_PATH}/employee/dashboard`);
    }

    window.location.reload();
  };

  const getEmployeeOffices = (officeList) => {
    const employeeOffices = officeList?.map((obj) => ({
      ...obj,
      name: obj?.nameInEng,
      nameInEng: obj?.name
    }));
    return employeeOffices;
  };

  useEffect(() => {
    if (officeId) {
      const info = {
        userRoles,
        userDetails,
        officeId,
        id: officeId,
        assigner: userDetails?.userId,
        postIds: null
      };
      setUserInfo(info);
    }
  }, [officeId, token]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))) {
      setValue('offices', Number(localStorage.getItem(STORAGE_KEYS.OFFICE_ID)));
      const find = offices?.find(
        (item) => item?.id === Number(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))
      );
      const filteredServices = userRoles?.filter(
        (item) => item?.id === Number(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))
      );
      if (filteredServices?.length > 0) {
        setOfficeServices(filteredServices);
      } else {
        setOfficeServices([]);
      }
      if (find) {
        if (find?.privileges?.length > 0) {
          find?.privileges?.forEach((item) => {
            if (item?.privilege?.includes('AUDITOR')) {
              setShowAuditToggle(true);
              setDataToStorage(
                STORAGE_KEYS.USER_DETAILS,
                {
                  ...userDetails,
                  isAuditor: true,
                  isAuditorActive: location?.pathname?.includes(
                    'home/audit/application'
                  )
                    ? true
                    : Number(filteredServices?.length <= 0)
                },
                true
              );
            } else {
              setDataToStorage(
                STORAGE_KEYS.USER_DETAILS,
                {
                  ...userDetails,
                  isAuditor: false,
                  isAuditorActive: false
                },
                true
              );
              setShowAuditToggle(false);
            }
          });
        } else {
          setDataToStorage(
            STORAGE_KEYS.USER_DETAILS,
            {
              ...userDetails,
              isAuditor: false,
              isAuditorActive: false
            },
            true
          );
          setShowAuditToggle(false);
        }
      }
    }
  }, [JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))]);

  const handleNav = (data) => {
    if (data === 'toinbox') {
      setDataToStorage(
        STORAGE_KEYS.USER_DETAILS,
        {
          ...userDetails,
          isAuditorActive: false
        },
        true
      );
      navigate(`${BASE_PATH}/${MODULE_PATH}/employee/dashboard`);
    } else {
      setDataToStorage(
        STORAGE_KEYS.USER_DETAILS,
        {
          ...userDetails,
          isAuditorActive: true
        },
        true
      );
      navigate(`${BASE_PATH}/${MODULE_PATH}/audit/application`);
    }
  };

  useEffect(() => {
    const postInfoDetails = offices
      ?.filter(
        (item) => item?.id === JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))
      )[0]
      ?.postInfo?.map(({
        id, postNameInEng, postNameInLocal, primary
      }) => ({
        id,
        name: postNameInEng,
        postNameInEng,
        postNameInLocal,
        primary
      }));
    setPostInfo(postInfoDetails);
    setValue('postId', localStorage.getItem(STORAGE_KEYS.POST_ID));
  }, [JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))]);

  useEffect(() => {
    const officeIdVal = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID));
    const selectedOffice = offices?.find((item) => item?.id === officeIdVal);

    const postInfoDetails = selectedOffice?.postInfo?.map(({ id }) => {
      const matchedPrivilege = selectedOffice?.privileges?.find(
        (priv) => priv.postId === id
      );

      return {
        id,
        name: matchedPrivilege?.privilege?.[0] || null
      };
    });

    setPrevilagesInfo(postInfoDetails);
    if (postInfoDetails?.length > 0) {
      setValue('privilages', postInfoDetails[0]?.name);
    }
  }, [JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))]);

  useEffect(() => {
    if (
      !localStorage.getItem(STORAGE_KEYS.POST_ID)
      || localStorage.getItem(STORAGE_KEYS.POST_ID) === 'undefined'
      || localStorage.getItem(STORAGE_KEYS.POST_ID) === 'null'
    ) {
      const postInfoDetails = offices?.filter(
        (item) => item?.id === JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))
      )[0]?.postInfo;
      let selectedPostId;
      if (postInfoDetails?.length > 0) {
        if (_.find(postInfoDetails, { primary: true })) {
          selectedPostId = _.find(postInfoDetails, { primary: true })?.id;
        } else {
          selectedPostId = postInfoDetails[0]?.id;
        }
        localStorage.setItem(STORAGE_KEYS.POST_ID, selectedPostId);
        setValue('postId', selectedPostId);
        setDataToStorage(
          STORAGE_KEYS.USER_DETAILS,
          {
            ...userDetails,
            postId: selectedPostId
          },
          true
        );
      }
    }
  }, [localStorage.getItem(STORAGE_KEYS.POST_ID)]);

  return (
    <>
      <div className="flex justify-between items-center h-[76px] lg:px-[80px] px-[13px] bg-white border border-b-[#DFE5F3]">
        <div className="">
          <Logo />
        </div>
        {webAlertData
        && !isMobileOrTablet && (
        <div className="col-span-12">
          <Alert status="info" className="rounded-full" style={{ background: '#d7fff0' }}>
            <BellRing fill={`${colors.blue[500]}`} width="22" height="22" mr={2} />
            {webAlertData?.message}
          </Alert>
        </div>
        )}

        <div className="flex justify-end gap-x-3 officeSelectDropdown items-center">
          {showAuditToggle && officeServices?.length > 0
          && (
            <div className="flex-none">
              {location?.pathname?.includes('home/audit/application')
                ? (userRoles?.length !== 0 && <Button bg={light} onClick={() => handleNav('toinbox')}>Switch to Inbox</Button>)
                : <Button bg={light} onClick={() => handleNav('toaudit')}>Switch to Auditor</Button>}
            </div>
          )}
          {offices?.length > 0 && (
          <div className=" w-auto">
            <FormController
              name="offices"
              type="select"
              control={control}
              options={getEmployeeOffices(offices)}
              handleChange={(data) => {
                handleOffice(data);
              }}
              optionKey="id"
              isClearable={false}
            />
          </div>
          )}
          {postInfo?.length > 0 && (
          <div className="min-w-[125px] max-w-auto">
            <FormController
              name="postId"
              type="select"
              control={control}
              options={postInfo}
              handleChange={(data) => {
                handlePostId(data);
              }}
              optionKey="id"
              isClearable={false}
            />
          </div>
          )}
          {
          previlagesInfo?.length > 0
          && previlagesInfo[0]?.name
          && typeOfUser === 'elected'
          && (
            <div className="min-w-[100px] max-w-auto">
              <FormController
                name="privilages"
                type="select"
                optionKey="name"
                control={control}
                options={previlagesInfo}
                disabled
              />
            </div>
          )
        }
          {!isMobileOrTablet && (
          <>
            <div className="flex items-center justify-center">{userName}</div>
            <Tooltip label="Profile" aria-label="Profile">
              {userDetails?.aadhaarId?.photo?.photo ? (
                <img
                  className="object-fill w-10 h-10 rounded-lg cursor-pointer"
                  src={`data:image/png;base64,${userDetails?.aadhaarId?.photo?.photo}`}
                  alt="profile"
                  aria-hidden
                  onClick={() => navigate(
                    `ui/home/${userDetails.userType.toLowerCase()}/my-profile`
                  )}
                />
              ) : (
                <IconButton
                  bg={light}
                  icon={<Profile />}
                  onClick={() => navigate(
                    `ui/home/${userDetails.userType.toLowerCase()}/my-profile`
                  )}
                />
              )}
            </Tooltip>
            <Tooltip label="Logout" aria-label="Logout">
              <IconButton bg={light} icon={<Logout />} onClick={handleLogout} />
            </Tooltip>
          </>

          )}
          {isMobileOrTablet && (
          <div className="flex ">
            <IconButton bg="" icon={<NotificationMobileView />} onClick={() => dispatch(commonActions.setNotification(!notificationPopShow))} />
            <IconButton
              bg=""
              icon={<ProfileMobileView />}
              onClick={() => navigate(
                `ui/home/${userDetails.userType.toLowerCase()}/my-profile`
              )}
            />
            <IconButton bg="" icon={<LogoutMobileView />} onClick={handleLogout} />
            <div className="">{notificationPopShow ? <NotificationPopup /> : null}</div>
          </div>
          )}
        </div>
      </div>
      {webAlertData && isMobileOrTablet && (
        <div className="col-span-12 mt-[-13px]">
          <Alert status="info" style={{ background: '#d7fff0', padding: '2px 12px 2px 12px' }}>
            <BellRing fill={`${colors.blue[500]}`} width="22" height="22" mr={2} />
            <Marquee pauseOnClick>
              {webAlertData?.message}
            </Marquee>
          </Alert>
        </div>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => dispatch(commonSliceActions.setUserInfo(data)),
  navigate: (data) => dispatch(commonSliceActions.navigateTo({ to: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
