import * as types from './constants';

export const setActivedRoleId = (payload) => ({
  type: types.SET_ACTIVE_ROLE_ID,
  payload,
});

export const setActivedRoleDetail = (payload) => ({
  type: types.SET_ACTIVE_ROLE_DETAIL,
  payload,
});

export const setPermissionsAvailbe = (payload) => ({
  type: types.SET_PERMISSIONS_AVAIABLE,
  payload,
});
