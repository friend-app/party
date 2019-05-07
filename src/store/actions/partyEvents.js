import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const fetchEventStart = payload => ({
  type: actionTypes.FETCH_EVENTS_START,
  payload
});

export const fetchEventsSuccess = data => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload: {
    data: data
  }
});

export const fetchEventSuccess = data => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload: {
    data: data
  }
});

export const fetchEventFail = error => ({
  type: actionTypes.FETCH_EVENTS_FAIL,
  payload: {
    error: error
  }
});

export const fetchEvents = userId => {
  return dispatch => {
    dispatch(fetchEventStart());
    setTimeout(() => {
      axios
        .get('/events.json')
        .then(response => {
          dispatch(fetchEventsSuccess(response.data));

        })
        .catch(error => {
          dispatch(fetchEventFail(error));
        });
    }, 0);
  };
};

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

