import produce from 'immer';
import * as types from './constants';

// initial state
export const initialState = {
  idSelections: [],
  detailSelections: [],
};

const gridViewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ITEM_ID_SELECTIONS:
        draft.idSelections = action.payload;
        break;
      case types.SET_ITEM_DETAIL_SELECTIONS:
        draft.detailSelections = action.payload;
        break;
    }
  });

export default gridViewReducer;
