/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable spaced-comment */
/* eslint-disable func-names */
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from './action-types';

const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});
const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    user,
  },
});
const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signUp = (user, history) => function (dispatch) {
  //const history = useHistory();
  dispatch(signUpRequest());
  axios({
    method: 'post',
    url: 'http://localhost:4000/users/add',
    data: user,
  })
    .then((response) => {
      const { data } = response.data;
      dispatch(signUpSuccess(data));
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      dispatch(signUpFailure(error));
    });
};

const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});
/*
const signInSuccess = (token) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    token,
  },
});
const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});
*/
export const signIn = (payload) => {
  return async function (dispatch) {
    dispatch(signInRequest);
    axios.post('http://localhost:4000/auth/signin', { username: payload.username, password: payload.password }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(`response:  ${JSON.stringify(response)}`);
        const token = response.data;
        console.log(`setting local storage token to: ${token}`);
        localStorage.setItem('USER-TOKEN', token);
        dispatch({ type: SIGN_IN_SUCCESS });
        payload.history.push('/');
      })
      .catch((error) => {
        dispatch({ type: SIGN_IN_FAILURE, payload: error });
      });
  };
};

export const signOutRequest = function () {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function () {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function () {
  return {
    type: SIGN_OUT_FAILURE,
  };
};

export const signOut = function (history) {
  console.log('in Signout');
  return function (dispatch) {
    dispatch(signOutRequest());
    localStorage.clear();
    history.push('/Sign-in');
    if (localStorage.getItem('USER_TOKEN')) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};
