import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const fetchEventStart = payload => ({
  type: actionTypes.FETCH_SINGLE_EVENT_START,
  payload
});

export const fetchEventSuccess = data => ({
  type: actionTypes.FETCH_SINGLE_EVENT_SUCCESS,
  payload: {
    data: data
  }
});

export const fetchEventFail = error => ({
  type: actionTypes.FETCH_SINGLE_EVENT_FAIL,
  payload: {
    error: error
  }
});

export const fetchSignleEvent = eventId => {
  return dispatch => {
    dispatch(fetchEventStart());
    axios
      .get('fetchSingleEvent/' + eventId)
      .then(response => {
        console.log(response.data);
        dispatch(fetchEventSuccess(response.data.event));
      })
      .catch(error => {
        dispatch(fetchEventFail(error));
      });
  };
};
