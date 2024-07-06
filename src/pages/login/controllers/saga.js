import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import { takeLatest } from 'redux-saga/effects';

import * as services from 'services/login';
import { fowardTo } from 'utils/common/route';
import { setSession, parseJwt, getAndSaveInfoUser } from 'utils/common/session';
import { setData } from 'utils/storage';
import { USER_KEY, USER_ID, USER_INFO } from 'static/Constants';
import { getInfoUserById } from 'services/user/user.service';

export function* loginSaga(payload) {
  yield put({ type: 'SET_GLOBAL_LOADING', loading: true });
  try {
    const response = yield call(services.loginService, payload.user);
    const token = response?.data?.token

    if (token) {
      const { token } = response.data;
      // set token into local store
      yield call(setSession, token);

      const userInfo = parseJwt(token)

      if (userInfo && userInfo.UserId) {
        const res = yield call(getInfoUserById, userInfo.UserId);
        if (res) {
          let info = res.data
          info.permissions = res.data.permissions.map(x => x.code)
          const infoUser = JSON.stringify(info)
          localStorage.setItem(USER_INFO, infoUser);
          yield put({ type: 'SET_USER_INFO', info });
          yield put({ type: types.LOGIN_SUCCESS, username: info.userName });
          yield call(fowardTo, '/dashboard');
        }
      }
    }

    if (!response.isSuccess) {
      yield put({ type: types.LOGIN_ERROR, error: response.errors[0] });
    } else {
      const loginSuccess = true
      yield put({ type: types.SET_LOGIN_SUCCESS, loginSuccess });
      yield put({ type: 'SET_GLOBAL_LOADING', loading: false });
    }
  } catch (error) {
    let message = error;
    if (typeof error === 'object') message = error.message;
    yield put({ type: types.LOGIN_ERROR, message });
  }
  finally {
    yield put({ type: 'SET_GLOBAL_LOADING', loading: false });
  }
}

export function* verifyOtpSaga(payload) {
  yield put({ type: 'SET_GLOBAL_LOADING', loading: false });
  try {
    const response = yield call(services.verifyOTP, payload.code);
    if (!response.isSuccess) {
      yield put({ type: types.LOGIN_ERROR, error: response.errors[0] });
    } else {
      const { token } = response.data;
      // set token into local store
      yield call(setSession, token);

      const userInfo = parseJwt(token)

      if (userInfo && userInfo.UserId) {
        const res = yield call(getInfoUserById, userInfo.UserId);
        if (res) {
          let info = res.data
          info.permissions = res.data.permissions.map(x => x.code)
          const infoUser = JSON.stringify(info)
          localStorage.setItem(USER_INFO, infoUser);
          yield put({ type: 'SET_USER_INFO', info });
          yield put({ type: types.LOGIN_SUCCESS, username: info.userName });
          yield call(fowardTo, '/dashboard');
        }
      }

    }
  } catch (error) {
    // let message = error;
    // if (typeof error === 'object') message = error.message;
    // yield put({ type: types.LOGIN_ERROR, message });
  }
  finally {
    yield put({ type: 'SET_GLOBAL_LOADING', loading: false });
  }
}


export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN, loginSaga);
  yield takeLatest(types.VERIFY_OTP, verifyOtpSaga);
}
