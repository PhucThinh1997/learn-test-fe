import produce from 'immer';
import * as types from './constants';

export const initialState = {
  activeRoleId: null,
  activeRoleDetail: null,
  permissionsAvaiable: [],
};

const rolePermissionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ACTIVE_ROLE_ID:
        draft.activeRoleId = action.payload;
        break;
      case types.SET_ACTIVE_ROLE_DETAIL:
        draft.activeRoleDetail = action.payload;
        break;
      case types.SET_PERMISSIONS_AVAIABLE:
        draft.permissionsAvaiable = action.payload;
        break;
      default:
        draft = draft;
        break
    }
  });

export default rolePermissionReducer;
