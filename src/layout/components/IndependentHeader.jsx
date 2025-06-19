/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { STORAGE_KEYS } from 'common/constants';
import { actions as commonSliceActions } from 'pages/common/slice';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDataFromStorage } from 'utils/encryption';
import { Logo, Home } from './Icons';

const IndependentHeader = ({ setUserInfo }) => {
  const { setValue } = useForm({
    mode: 'all',
    defaultValues: {
      offices: ''
    }
  });
  const { VITE_PROJECT_URL } = import.meta.env;
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const officeId = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID));
  const userRoles = getDataFromStorage(STORAGE_KEYS.USER_ROLES, true) || [];
  const userDetails = getDataFromStorage(STORAGE_KEYS.USER_DETAILS, true) || [];

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
    }
  }, [JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICE_ID))]);

  return (
    <div className="flex justify-between items-center h-[76px] px-[80px] bg-white border-b border-[#DFE5F3]">
      <div>
        <Logo />
      </div>

      <div>
        <Home onClick={() => window.open(`${VITE_PROJECT_URL}/ui/web-portal`, '_blank')} />
      </div>
    </div>

  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => dispatch(commonSliceActions.setUserInfo(data)),
  navigate: (data) => dispatch(commonSliceActions.navigateTo({ to: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndependentHeader);
