import * as actionTypes from '../actions/actionTypes';

const initialState = {
  eventId: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actionTypes.ADD_USER_TO_EVENT_START:
    return { ...state, ...payload }

  case actionTypes.ADD_USER_TO_EVENT_SUCCESS:
    return { ...state, eventId: payload.eventId }

  case actionTypes.ADD_USER_TO_EVENT_FAIL:
    return { ...state, ...payload }

  default:
    return state
  }
}
