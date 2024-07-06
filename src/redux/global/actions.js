import * as types from './constants';

/**
 * Post login process: validate user eula agreements or new revised eula acceptance
 */
export const validateEula = () => {
  return {
    type: types.VALIDATE_EULA,
  };
};

/**
 * Post login process: validate critical message for current logged in user
 */
export const validateCriticalMessage = () => {
  return {
    type: types.VALIDATE_CRITICAL_MESSAGE,
  };
};

/**
 * Post login process: validate landing page setup for current logged in user
 */
export const validateLandingPage = () => {
  return {
    type: types.VALIDATE_LANDING_PAGE,
  };
};

/**
 * Update ribbon bar action items
 * @param {object} option
 */
export function changeRibbonActions(option) {
  return {
    type: types.CHANGE_RIBBON_ACTIONS,
    option: option,
  };
}

/**
 * Update search criteria
 * @param {string} filters
 */
export function filters(filters) {
  return {
    type: types.FILTER,
    filters: filters,
  };
}

export function updateSearchCriteria(searchCriteria) {
  return {
    type: types.SEARCH_CRITERIA,
    searchCriteria: searchCriteria,
  };
}

/**
 * Update queries number
 * @param {number} queries
 */
export function favoriteQueries(queries) {
  return {
    type: types.FAVORITE_QUERIES,
    queries: queries,
  };
}

/**
 * Update shared queries number
 * @param {number} sharedQueries
 */
export function favoriteSharedQueries(sharedQueries) {
  return {
    type: types.FAVORITE_SHARED_QUERIES,
    sharedQueries: sharedQueries,
  };
}

/**
 * Update product favorite number
 * @param {number} products
 */
export function favoriteProducts(products) {
  return {
    type: types.FAVORITE_PRODUCTS,
    products: products,
  };
}

/**
 * Update assets favorite number
 * @param {number} assets
 */
export function favoriteAssets(assets) {
  return {
    type: types.FAVORITE_ASSETS,
    assets: assets,
  };
}

/**
 * Update members favorite number
 * @param {number} members
 */
export function favoriteMembers(members) {
  return {
    type: types.FAVORITE_MEMBERS,
    members: members,
  };
}

/**
 * Update members favorite number
 * @param {number} members
 */
export function selectedKey(key) {
  return {
    type: types.SELECTED_KEY,
    key: key,
  };
}

/**
 * toggle detail visibility
 */
export function toggleDetail() {
  return {
    type: types.TOGGLE_DETAIL,
  };
}

/**
 * display detail content in application pane
 */
export function inContainerDetail() {
  return {
    type: types.INCONTAINER_DETAIL,
  };
}

/**
 * toggle quickview visibility
 */
export function toggleQuickView() {
  return {
    type: types.TOGGLE_QUICKVIEW,
  };
}

/**
 * handle search
 * @param {string} text
 */

export function updateSearch(searchText) {
  return {
    type: types.SEARCH,
    searchText: searchText,
  };
}

/**
 * handle search
 * @param {boolean}
 */

export function refreshGrid(isRefresh) {
  return {
    type: types.REFRESH_GRID,
    refreshGrid: isRefresh,
  };
}

export function resetState() {
  return {
    type: types.REFRESH_GRID,
  };
}
