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

export const checkAuthTimeout = authTimeout => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, authTimeout * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');
  localStorage.removeItem('expirationDate');
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expirationDate * 1000
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.userId);
        localStorage.setItem('nickname', response.data.user.nickname);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(loginSuccess(response.data));
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
        localStorage.setItem(
          'expirationDate',
          response.data.user.expirationDate
        );
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

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: { path: path }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        const nickname = localStorage.getItem('nickname');

        const userData = {
          user: {
            expirationDate: expirationDate,
            userId: userId,
            nickname: nickname
          },
          token: token
        };
        dispatch(loginSuccess(userData));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
