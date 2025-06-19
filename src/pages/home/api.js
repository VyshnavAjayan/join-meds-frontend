 
import { REQUEST_METHOD } from 'common';
import { ACTION_TYPES } from './actions';


export const fetchCountryApi = () => {
  return {
    url: 'country',
    method: REQUEST_METHOD.GET,
    payload: {
      types: [
        ACTION_TYPES.FETCH_COUNTRY_REQUEST,
        ACTION_TYPES.FETCH_COUNTRY_SUCCESS,
        ACTION_TYPES.FETCH_COUNTRY_FAILURE
      ]
    }
  };
};
