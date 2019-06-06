import * as actionTypes from '../actions/actionTypes';

const initialState = {
  event: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CREATE_EVENT_INIT:
      return { ...state, event: null };

    case actionTypes.CREATE_EVENT_START:
      return { ...state, event: null, loading: true };

    case actionTypes.CREATE_EVENT_SUCCESS:
      return { ...state, event: payload.event, loading: false };

    case actionTypes.CREATE_EVENT_FAIL:
      return { ...state, ...payload };

    case actionTypes.UPDATE_EVENT_START:
      return { ...state, loading: true };

    case actionTypes.UPDATE_EVENT_SUCCESS:
      return { ...state, event: payload.event, loading: false };

    case actionTypes.UPDATE_EVENT_FAIL:
      return { ...state, ...payload };

    case actionTypes.ADD_INGREDEINTS_TO_EVENT_START:
      return { ...state, loading: true };

    case actionTypes.ADD_INGREDEINTS_TO_EVENT_SUCCESS:
      return { ...state, event: null, loading: false };

    case actionTypes.ADD_INGREDEINTS_TO_EVENT_FAIL:
      return { ...state, ...payload };

    default:
      return state;
  }
};
