import { fork, all, put } from 'redux-saga/effects';

import authSaga from './authSaga';

import { MESSAGE_SHOW } from '../../store/reducers/message';

// fork all sagas to rootSaga
function* rootSaga() {
  yield all([fork(authSaga)]);
}

export const showError = function* showError(message) {
  yield put({
    type: MESSAGE_SHOW,
    payload: {
      message: message || 'Error',
      type: 'error',
    },
  });
};

export default rootSaga;
