import _ from 'lodash';
import * as modules from '../pages';

const reducers = {};

// Include all the reducer to combine and provide to configure store.

_.values(modules).forEach((module) => {
  _.values(module).forEach((submodule) => {
    if (_.has(submodule, 'STATE_REDUCER_KEY') && _.has(submodule, 'reducer')) {
      _.set(reducers, `${submodule.STATE_REDUCER_KEY}`, submodule.reducer);
    }
  });
});

const rootReducer = {
  ...reducers
};

export default rootReducer;
