import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  events: [],
  singleEvent: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_EVENTS_START:
      return { ...state, events: [], event: null, loading: true };

    case actionTypes.FETCH_EVENTS_SUCCESS:
      return { ...state, events: payload.data, loading: false };

    // case actionTypes.FETCH_EVENTS_SUCCESS:
    //   return { ...state, event: payload.data, loading: false };

    case actionTypes.FETCH_EVENTS_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
