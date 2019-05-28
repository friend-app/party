import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  createdEvents: null,
  userEvents: null,
  singleEvent: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_CREATED_EVENTS_START:
      return { ...state, createdEvents: null, event: null, loading: true };

    case actionTypes.FETCH_CREATED_EVENTS_SUCCESS:
      return { ...state, createdEvents: payload.data, loading: false };

    case actionTypes.FETCH_CREATED_EVENTS_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.FETCH_USER_EVENTS_START:
      return { ...state, userEvents: null, event: null, loading: true };

    case actionTypes.FETCH_USER_EVENTS_SUCCESS:
      return { ...state, userEvents: payload.data, loading: false };

    case actionTypes.FETCH_USER_EVENTS_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
