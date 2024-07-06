import * as api from 'config/axios';
import * as endpoints from './endpoints';

/**
 * User login service
 * @param {object} data user login information
 */
export const loginService = (params) => api.sendPost(`${endpoints.USER_LOGIN_ENDPOINT}/send-otp`, params);

export const verifyOTP = (params) => api.sendPost(`${endpoints.USER_LOGIN_ENDPOINT}/verify-otp`, params);

export const logoutAPI = () => api.sendPost(`${endpoints.USER_LOGIN_ENDPOINT}/logout`, {});
