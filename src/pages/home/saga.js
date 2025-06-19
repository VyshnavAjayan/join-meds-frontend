import {
  all, takeLatest, put,
} from 'redux-saga/effects';
import { ACTION_TYPES } from './actions';
import { actions as sliceActions } from './slice';


export function* fetchCountry() {
  yield put(sliceActions.setCountry());
}



export default function* commonSaga() {
  yield all([
    takeLatest(ACTION_TYPES.FETCH_COUNTRY, fetchCountry),
  ]);
}
