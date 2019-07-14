import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const addUserToEventStart = () => ({
  type: actionTypes.ADD_USER_TO_EVENT_START,
  payload: {}
});

export const addUserToEventSuccess = eventId => ({
  type: actionTypes.ADD_USER_TO_EVENT_SUCCESS,
  payload: {
    eventId: eventId
  }
});

export const addUserToEventFail = errMessage => ({
  type: actionTypes.ADD_USER_TO_EVENT_FAIL,
  payload: {
    error: errMessage
  }
});

export const addUserToEvent = (eventCode) => {
  return dispatch => {
    dispatch(addUserToEventStart());
    const data = {
      eventCode: eventCode
    }
    console.log(data);
    axios
      .post("addUserToEvent", data)
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('eventCode');
        localStorage.setItem('eventId', response.data.eventId);
        dispatch(
          addUserToEventSuccess(
            response.data.eventId
          )
        );
      })
      .catch(error => {
        dispatch(addUserToEventFail(error.response.data.message));
      });
  };
};
