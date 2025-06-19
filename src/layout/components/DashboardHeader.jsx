/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { STORAGE_KEYS } from 'common/constants';
import { actions as commonSliceActions } from 'pages/common/slice';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { getDataFromStorage } from 'utils/encryption';
import { Logo } from 'assets/Svg';

const HeaderDashboard = () => {
  // { setUserInfo }

  // const dispatch = useDispatch();
  // const { offices } = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || {};

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  // const handleOffice = (data) => {
  //   localStorage.setItem(STORAGE_KEYS.OFFICE_ID, data?.id);
  //   window.location.reload();
  // };

  // const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  // const officeId = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID));
  // const userRoles = getDataFromStorage(STORAGE_KEYS.USER_ROLES, true) || [];
  // const userDetails = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || [];
  // useEffect(() => {
  //   if (officeId) {
  //     const info = {
  //       userRoles,
  //       userDetails,
  //       officeId,
  //       id: officeId,
  //       assigner: userDetails?.userId,
  //       postIds: null
  //     };
  //     setUserInfo(info);
  //   }
  // }, [officeId, token]);

  return (
    <div className="flex justify-between items-center h-[50px] mt-[30px]  px-[80px] bg-white ">
      <div className="">
        <Logo />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => dispatch(commonSliceActions.setUserInfo(data)),
  navigate: (data) => dispatch(commonSliceActions.navigateTo({ to: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDashboard);
