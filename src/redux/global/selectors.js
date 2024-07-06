/**
 * The global state selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

// import login selector
import {
  selectUser,
  selectUserLoading,
  selectUserError,
  selectAcceptedEula,
} from "../../pages/login/controllers/selectors";

const selectGlobal = (state) => (state && state.global) || initialState;

const selectGlobalLoading = () => createSelector(selectGlobal, (globalState) => globalState.loading);
const selectEula = () => createSelector(selectGlobal, (globalState) => globalState.eula);
const selectPersonalization = () => createSelector(selectGlobal, (globalState) => globalState.personalization);
const selectCriticalMessage = () => createSelector(selectGlobal, (globalState) => globalState.criticalMessage);
const selectLandingPage = () => createSelector(selectGlobal, (globalState) => globalState.landingPage);
const selectValidateComplete = () =>
  createSelector(
    selectGlobal,
    (globalState) =>
      globalState.eula && globalState.personalization && globalState.criticalMessage && globalState.landingPage,
  );
const selectControlOptions = () => createSelector(selectGlobal, (globalState) => globalState.controlOptions);
const selectSearchCriteria = () => createSelector(selectGlobal, (globalState) => globalState.searchCriteria);

const selectFavorites = () => createSelector(selectGlobal, (globalState) => globalState.favorites);
const selectSelectedKey = () => createSelector(selectGlobal, (globalState) => globalState.selectedKey);
const selectDetail = () => createSelector(selectGlobal, (globalState) => globalState.detail);
const selectInContainer = () => createSelector(selectGlobal, (globalState) => globalState.inContainerDetail);
const selectQuickView = () => createSelector(selectGlobal, (globalState) => globalState.quickView);
const selectLogging = () => createSelector(selectGlobal, (globalState) => globalState.logging);
const selectSearchText = () => {
  createSelector(selectGlobal, (globalState) => globalState.searchText);
};

export {
  selectGlobalLoading,
  selectCriticalMessage,
  selectLandingPage,
  selectValidateComplete,
  selectControlOptions,
  selectSearchCriteria,
  selectFavorites,
  selectSelectedKey,
  selectDetail,
  selectInContainer,
  selectQuickView,
  selectLogging,
  selectSearchText,
  selectUser,
  selectUserLoading,
  selectUserError,
  selectAcceptedEula,
};
