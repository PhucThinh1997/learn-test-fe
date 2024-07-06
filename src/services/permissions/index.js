import * as api from 'config/axios';
import * as endpoints from './endpoints';

export const getRoles = () => api.sendGet(endpoints.GET_ROLES_ENDPOINT);
export const getPermissionsInRole = (id) => api.sendGet(`${endpoints.GET_LIST_PERMISSIONS_ROLE}?RoleId=${id}`);
export const getPermissionsAvailable = () => api.sendGet(endpoints.GET_PERMISSIONS_AVAILABLE);
export const getUserInRole = (id) => api.sendGet(`${endpoints.GET_USERS_HAVE_ROLE_ENDPOINT}?RoleId=${id}`);
export const getUserNotInRoles = (id) => api.sendGet(`${endpoints.GET_USER_NOT_IN_ROLES_ENDPOINT}?RoleId=${id}`);

export const saveRole = (payload) => api.sendPost(endpoints.SAVE_ROLE, payload);
export const deleteRole = (roleId) => api.sendPost(endpoints.DELETE_ROLE, { id: roleId });
export const saveUserToRole = (payload) => api.sendPost(endpoints.SAVE_USER_TO_ROLE, payload);
export const deleteUserToRole = (payload) => api.sendPost(endpoints.DELETE_USER_TO_ROLE, payload);
export const getPermissionsTreeModel = () => api.sendGet(endpoints.GET_PERMISSIONS_TREE_MODEL);