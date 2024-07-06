import { takeLatest } from 'redux-saga/effects';
import * as types from './constants';

export function* eulaSaga() {}
export function* personalizationSaga() {}
export function* criticalMessageSaga() {}
export function* landingPageSaga() {}

export function* logoutSaga() {}

export default function* watchGlobal() {
  yield takeLatest(types.VALIDATE_EULA, eulaSaga);
  yield takeLatest(types.VALIDATE_CRITICAL_MESSAGE, criticalMessageSaga);
  yield takeLatest(types.VALIDATE_LANDING_PAGE, landingPageSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
}
