import { getInfoUserById } from 'services/user/user.service';
import { SESSION_KEY, USER_INFO } from 'static/Constants';

import * as types from './constants';

/**
 * utility function to parse JWT payload
 * @param {object} token JWT token
 */
export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

/**
 * Store received token into local storage
 * @param {object} token jwt token
 * @param {string} key local storage item key
 */
export function setSession(token, key = SESSION_KEY) {
  localStorage.setItem(key, token);
}
/**
 * validate token availability within storage
 * @param {string} key local storage item key
 */
export function isAuthed(key = SESSION_KEY) {
  const token = localStorage.getItem(key);
  if (!token) return false;
  // get expire from token payload
  const { exp } = parseJwt(token);
  // const expiresIn = parseInt(exp) * 1000;
  const expiresIn = parseInt(exp) * 1000000;
  const currentTime = Date.parse(new Date());
  // validate if token is still valid
  return expiresIn > currentTime;
}

/**
 * Get access token from local storage
 */
export function getToken() {
  return localStorage.getItem(SESSION_KEY);
}

export function clearToken() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAndSaveInfoUser(id) {
  getInfoUserById(id).then(res => {
    let info = res.data
    const infoUser = JSON.stringify(info)
    localStorage.setItem(USER_INFO, infoUser);
    // yield put({ type: 'SET_USER_INFO', info });
  })
}
