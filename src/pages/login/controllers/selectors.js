import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the language domain
 */

const user = (state) => state.user || initialState;

/**
 * Select the language locale
 */

const selectUser = () => createSelector(user, (loginState) => loginState.user);

const selectUserError = () => createSelector(user, (loginState) => loginState.error);
const selectUserLoading = () => createSelector(user, (loginState) => loginState.loading);
const selectAcceptedEula = () => createSelector(user, (loginState) => loginState.user.accepted_eula);
export { selectUser, selectUserLoading, selectUserError, selectAcceptedEula };
