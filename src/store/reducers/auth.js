import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: true,
  email: null,
  password: null,
  nickname: null,
  token: null,
  loading: false,
  message: null,
  userId: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: payload.userId,
        email: payload.email,
        nickname: payload.nickname,
        token: payload.token,
        message: 'Login was Successfull',
        isAuthenticated: true
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        message: 'Email or password are wrong'
      };

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: payload.id,
        email: payload.email,
        nickname: payload.nickname,
        token: payload.token,
        message: 'Login was Successfull',
        isAuthenticated: true
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        message: 'Somethis went wrong'
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        email: null,
        password: null,
        token: null,
        message: null
      };



    default:
      return state;
  }
};
