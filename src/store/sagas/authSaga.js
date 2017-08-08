import { call, put, takeLatest } from 'redux-saga/effects';
import { showError } from './index';

import { AUTH_LOG_IN, AUTH_USER_SUCCESSFULLY_LOGGED_IN } from '../../store/reducers/user';

const fakeAuthApiSignIn = (user) => {
  const { email, password } = user;
  return new Promise((resolve, reject) => {
    // test log in
    setTimeout(() => {
      if (email === 'test@test.test' && password === 'test') {
        const userData = {
          user: {
            email: 'test@test.test',
            name: 'admin',
            role: 'admin',
          },
        };
        resolve(userData);
      } else {
        const error = new Error('Wrong email or password!');
        reject(error);
      }
      resolve('Success!');
    }, 250);
  });
};

// worker Saga: will be fired on AUTH_LOG_IN actions
function* logInSaga(action) {
  try {
    const user = yield call(fakeAuthApiSignIn, action.payload);
    if (user) {
      yield put({ type: AUTH_USER_SUCCESSFULLY_LOGGED_IN, payload: user });
    } else {
      yield call(showError, user.message);
    }
  } catch (e) {
    yield call(showError, e.message);
  }
}

/**
  Starts fetchToken on each dispatched `GET_STRIPE_TOKEN` action.
* */

export default function* watchFetchToken() {
  yield takeLatest(AUTH_LOG_IN, logInSaga);
}
