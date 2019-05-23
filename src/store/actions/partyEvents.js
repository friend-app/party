import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const fetchCreatedEventsStart = payload => ({
  type: actionTypes.FETCH_CREATED_EVENTS_START,
  payload
});

export const fetchCreatedEventsSuccess = data => ({
  type: actionTypes.FETCH_CREATED_EVENTS_SUCCESS,
  payload: {
    data: data
  }
});

export const fetchCreatedEventFail = error => ({
  type: actionTypes.FETCH_CREATED_EVENTS_FAIL,
  payload: {
    error: error
  }
});

export const fetchUserEventsStart = payload => ({
  type: actionTypes.FETCH_USER_EVENTS_START,
  payload
});

export const fetchUserEventsSuccess = data => ({
  type: actionTypes.FETCH_USER_EVENTS_SUCCESS,
  payload: {
    data: data
  }
});

export const fetchUserEventFail = error => ({
  type: actionTypes.FETCH_USER_EVENTS_FAIL,
  payload: {
    error: error
  }
});

export const fetchCreatedEvents = () => {
  return dispatch => {
    dispatch(fetchCreatedEventsStart());
    setTimeout(() => {
      axios
        .get('/fetchCreatedEvents')
        .then(response => {
          dispatch(fetchCreatedEventsSuccess(response.data.events));
        })
        .catch(error => {
          dispatch(fetchCreatedEventFail(error));
        });
    }, 0);
  };
};

export const fetchUserEvents = () => {
  return dispatch => {
    dispatch(fetchUserEventsStart());
    setTimeout(() => {
      axios
        .get('/fetchUserEvents')
        .then(response => {
          dispatch(fetchUserEventsSuccess(response.data.events));
        })
        .catch(error => {
          dispatch(fetchUserEventFail(error));
        });
    }, 0);
  };
};

export const fetchSignleEvent = eventId => {
  return dispatch => {
    dispatch(fetchCreatedEventsStart());
    setTimeout(() => {
      axios
        .get('/events/' + eventId)
        .then(response => {
          console.log(response.data.event);
          dispatch(fetchCreatedEventsSuccess(response.data.event));
        })
        .catch(error => {
          dispatch(fetchCreatedEventFail(error));
        });
    }, 0);
  };
};

