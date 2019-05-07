import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: true,
  email: 'alex@gmail.com',
  password: 12345,
  name: 'Alex',
  fakeToken: 12345678,
  loading: false,
  message: null,
  userId: '1'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        email: payload.email,
        password: payload.password,
        fakeToken: Math.random()
          .toString(36)
          .substr(2),
        message: 'Login was Successfull',
        isAuthenticated: true,
        userId: 'UserId1'
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
        email: payload.email,
        password: payload.password,
        name: payload.name,
        fakeToken: Math.random()
          .toString(36)
          .substr(2),
        message: 'Login was Successfull',
        isAuthenticated: true,
        userId: '1'
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
        fakeToken: null,
        message: null
      };



    default:
      return state;
  }
};
