import history from 'utils/common/history';
import { DEFAULT_WAIT } from 'static/Constants';
/**
 * forward user to location
 * @param {string} path route location
 */
export const fowardTo = (path) => {
  history.push(path);
};

export const currentHistory = history;

export const getParameterFromQuery = (name, location) => {
  if (!location) location = history.location;
  name = name.replace(/[[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(location.search);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const postFlowRedirect = (type, returnUrl, dispatch) => {
  // handle when flowIndex is last
  setTimeout(fowardTo(`${returnUrl}`), DEFAULT_WAIT);
};
