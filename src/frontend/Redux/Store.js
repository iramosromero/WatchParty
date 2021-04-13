/* eslint-disable spaced-comment */
/* eslint-disable import/no-duplicates */
/* eslint-disable global-require */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import userReducer from './reducers/user_reducer';

const createRootReducer = () => combineReducers({ userReducer });

const initState = {
  // authentication: {
// currentUser: null,
// token: "",
// error: "",
// loading: false,
// isAuthenticated: false,
// },
};

function makeStore(initialState = initState) {
  //let composeEnhancers = compose;
  //const middlewares = [thunk];
/*
  if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  */
  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(thunk),
  );

  return store;
}

export default makeStore;
