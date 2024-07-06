import produce from 'immer';
import * as types from './constants';

// initial state
export const initialState = {
  loading: false,
  error: null,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN:
        draft.loading = true;
        draft.error = null;
        break;
    }
  });

export default loginReducer;
