import * as types from './constants';

export function setItemIdSelections(items) {
  return {
    type: types.SET_ITEM_ID_SELECTIONS,
    payload: items,
  };
}
export function setItemDetailSelections(items) {
  return {
    type: types.SET_ITEM_DETAIL_SELECTIONS,
    payload: items,
  };
}
