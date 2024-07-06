import { createSelector } from 'reselect';
import { initialState } from './reducer';

const rolePermissionSelectors = (state) => state.rolePermission || initialState;

const selectActiveRoleId = () => createSelector(rolePermissionSelectors, (groupState) => groupState?.activeRoleId);

const selectActiveRoleDetail = () =>
  createSelector(rolePermissionSelectors, (groupState) => groupState.activeRoleDetail);

const setPermissionsAvaiable = () =>
  createSelector(rolePermissionSelectors, (groupState) => groupState.permissionsAvaiable);

export { selectActiveRoleId, selectActiveRoleDetail, setPermissionsAvaiable };
