export const urlApiAuthen = 'api/authorization';

// - GET -
export const GET_ROLES_ENDPOINT = `${urlApiAuthen}/get-available-roles`;
export const GET_USERS_HAVE_ROLE_ENDPOINT = `${urlApiAuthen}/get-users-in-role`;
export const GET_LIST_PERMISSIONS_ROLE = `${urlApiAuthen}/get-permissions-in-role`;
export const GET_PERMISSIONS_AVAILABLE = `${urlApiAuthen}/get-available-permissions`;
export const GET_USER_NOT_IN_ROLES_ENDPOINT = `${urlApiAuthen}/get-users-not-in-role`;
// - POST -
export const SAVE_ROLE = `${urlApiAuthen}/save-role`;
export const DELETE_ROLE = `${urlApiAuthen}/delete-role`;
export const SAVE_USER_TO_ROLE = `${urlApiAuthen}/add-users-to-role`;
export const DELETE_USER_TO_ROLE = `${urlApiAuthen}/remove-users-from-role`;

export const GET_PERMISSIONS_TREE_MODEL = `${urlApiAuthen}/get-permissions-tree-model`;
