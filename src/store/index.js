import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';

import rootReducer from './reducers';
import rootSaga from './sagas/index';

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-underscore-dangle */
  // redux dev tools
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  /* eslint-enable */
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

// Define what store part should be save in localStorage
function localSorageSlicer() {
  return (state) => {
    const { userState } = state;
    const subset = {
      userState,
    };
    return subset;
  };
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  persistState('store', {
    key: 'quipps',
    slicer: localSorageSlicer,
  }),
);

// create main reducer
const store = createStore(
  combineReducers({
    ...rootReducer,
  }),
  enhancer,
);

sagaMiddleware.run(rootSaga);

export default store;
