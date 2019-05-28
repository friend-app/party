import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = payload => ({
  type: actionTypes.AUTH_START,
  payload
});

export const loginSuccess = userData => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    userId: userData.user.userId,
    email: userData.user.email,
    nickname: userData.user.nickname,
    token: userData.token
  }
});

export const loginFail = message => ({
  type: actionTypes.LOGIN_FAIL,
  payload: {
    message: message
  }
});

export const signupSuccess = userData => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    userId: userData.user.userId,
    email: userData.user.email,
    nickname: userData.user.nickname,
    token: userData.token
  }
});

export const signupFail = message => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    message: message
  }
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');
  return {
    type: actionTypes.AUTH_LOGOUT,
    payload: {}
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const loginInfo = {
      email: email,
      password: password
    };
    axios
      .post('http://localhost:4000/api/auth/login/', loginInfo)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.userId);
        localStorage.setItem('nickname', response.data.user.nickname);
        dispatch(loginSuccess(response.data));
        console.log(response.data.user);
      })
      .catch(error => {
        if (typeof error.response !== 'undefined') {
          dispatch(signupFail(error.response.data.message));
        } else {
          dispatch(signupFail('Cannot connect to server'));
        }
      });
  };
};

export const signup = (email, password, name) => {
  return dispatch => {
    dispatch(authStart());
    const signupInfo = {
      email: email,
      password: password,
      nickname: name
    };
    axios
      .post('http://localhost:4000/api/auth/register/', signupInfo)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.userId);
        localStorage.setItem('nickname', response.data.user.nickname);
        dispatch(signupSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        if (typeof error.response !== 'undefined') {
          dispatch(signupFail(error.response.data.message));
        } else {
          dispatch(signupFail('Cannot connect to server'));
        }
      });
  };
};
