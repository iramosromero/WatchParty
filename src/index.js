/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
// import rootReducer from './frontend/Redux/reducers/rootReducer';
import makeStore from './frontend/Redux/Store';

const store = makeStore();
// createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
    ,
  </Provider>,
  document.getElementById('root'),
);
