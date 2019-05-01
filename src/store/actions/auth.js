import * as actionTypes from './actionTypes';

export const authStart = (payload) => ({
  type: actionTypes.AUTH_START,
  payload
})

export const loginSuccess = (email, password) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    email: email,
    password: password,
  }
})

export const loginFail = (message) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: {
    message: message
  }
})

export const signupSuccess = (email, password, name) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    email: email,
    password: password,
    name: name
  }
})

export const signupFail = (message) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    message: message
  }
})

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
  payload: {}
})


export const login = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    setTimeout(() => {
      if(email === 'alex@gmail.com' && password === '12345'){
        dispatch(loginSuccess(email, password));
      } else {
        dispatch(loginFail());
      }
    }, 2000)
  }
}

export const signup = (email, password, name) => {
  return dispatch => {
    dispatch(authStart());
    setTimeout(() => {
      if(email !== '' && password !== '' && name !== ''){
        dispatch(signupSuccess(email, password, name));
      } else {
        dispatch(signupFail());
      }
    }, 2000)
  }
}


