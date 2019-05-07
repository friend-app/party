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
    setTimeout(() => {
      axios
        .get('/events/' + eventId + '.json')
        .then(response => {
          dispatch(fetchEventSuccess(response.data));

        })
        .catch(error => {
          dispatch(fetchEventFail(error));
        });
    }, 0);
  };
};

