import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { ACTION_TYPES } from './actions';
import { STATE_REDUCER_KEY } from './constants';

const initialState = {
  country: {},
};

const slice = createSlice({
  initialState,
  name: STATE_REDUCER_KEY,
  reducers: {
    setCountry: (state, { payload }) => {
      _.set(state, 'country', payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ACTION_TYPES.FETCH_COUNTRY_SUCCESS, (state, { payload }) => {
        _.set(state, 'country', payload);
      })
  }
});
export const { actions, reducer } = slice;
