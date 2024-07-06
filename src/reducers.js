/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/common/history';
import globalReducer from './redux/global/reducer';
import quyTrinhReducer from './redux/quyTrinh/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    quyTrinh: quyTrinhReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
