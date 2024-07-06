import produce from 'immer';
import * as types from './constants';
import _ from 'lodash';

export const DEFAULT_CONTROL = [
  { label: 'Home', value: 'Home' },
  { label: 'Shared', value: 'Shared' },
];

// TODO: REMOVE UNUSE

// initial state
export const initialState = {
  loading: false,
  eula: false,
  criticalMessage: false,
  landingPage: false,
  controlOptions: DEFAULT_CONTROL,
  searchCriteria: 'all',
  searchText: '',
  filters: null,
  selectedKey: null,
  favorites: {
    queries: 0,
    sharedQueries: 0,
    products: 0,
    assets: 0,
    members: 0,
  },
  refreshGrid: false,
  detail: false,
  inContainerDetail: false,
  quickView: false,
  error: '',
  modeVerify: false,
  user: '',
  userInfo: null
};

const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_GLOBAL_LOADING:
        draft.loading = action.loading;
        break;
      case types.VALIDATE_EULA:
        draft.eula = true;
        break;

      case types.VALIDATE_CRITICAL_MESSAGE:
        draft.criticalMessage = true;
        break;
      case types.VALIDATE_LANDING_PAGE:
        draft.landingPage = true;
        break;
      case types.CHANGE_RIBBON_ACTIONS:
        if (!_.isEmpty(action.option)) {
          draft.controlOptions = [...DEFAULT_CONTROL, action.option];
        } else draft.controlOptions = DEFAULT_CONTROL;
        break;
      case types.SEARCH:
        draft.searchText = action.searchText;
        break;
      case types.FILTER:
        draft.filters = action.filters;
        break;
      case types.SEARCH_CRITERIA:
        draft.searchCriteria = action.searchCriteria;
        break;

      case types.FAVORITE_QUERIES:
        draft.favorites.queries = action.queries;
        break;
      case types.FAVORITE_SHARED_QUERIES:
        draft.favorites.sharedQueries = action.sharedQueries;
        break;
      case types.FAVORITE_PRODUCTS:
        draft.favorites.products = action.products;
        break;
      case types.FAVORITE_ASSETS:
        draft.favorites.assets = action.assets;
        break;
      case types.FAVORITE_MEMBERS:
        draft.favorites.members = action.members;
        break;
      case types.SELECTED_KEY:
        draft.selectedKey = action.key;
        break;
      case types.TOGGLE_DETAIL:
        draft.detail = !state.detail;
        if (!draft.detail) {
          draft.inContainerDetail = false;
        }
        break;
      case types.INCONTAINER_DETAIL:
        draft.inContainerDetail = !state.inContainerDetail;
        break;
      case types.TOGGLE_QUICKVIEW:
        draft.quickView = !state.quickView;
        break;
      case types.LOGOUT:
        draft = initialState;
        break;
      case types.REFRESH_GRID:
        draft.refreshGrid = action.refreshGrid;
        break;
      case types.RESET_STATE:
        draft.refreshGrid = false;
        break;
      case types.LOGIN:
        draft.user = action.username;
        break;
      case types.LOGIN_SUCCESS:
        draft.user = action.username;
        break;
      case types.SET_LOGIN_SUCCESS:
        draft.modeVerify = true
        draft.error = ''
        break;
      case types.LOGIN_ERROR:
        draft.error = action.error;
        break;
      case types.SET_USER_INFO:
        draft.userInfo = action.userInfo;
        draft.modeVerify = false
        break;
    }
  });

export default globalReducer;
