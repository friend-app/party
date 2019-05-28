import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  event: null,
  singleEvent: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_SINGLE_EVENT_START:
      return { ...state, event: null, loading: true };

    case actionTypes.FETCH_SINGLE_EVENT_SUCCESS:
      return { ...state, event: payload.data, loading: false };

    case actionTypes.FETCH_SINGLE_EVENT_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
}