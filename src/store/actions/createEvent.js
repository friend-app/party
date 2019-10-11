import * as actionTypes from './actionTypes';
import axios from '../../axios-events';


export const createEventStart = () => ({
  type: actionTypes.CREATE_EVENT_START,
})

export const createEventReset = () => ({
  type: actionTypes.CREATE_EVENT_RESET,
})

export const createEventSuccess = (event) => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  payload: {
    event: event
  }
})

export const createEventFail = (payload) => ({
  type: actionTypes.CREATE_EVENT_FAIL,
  payload: {
    error: payload
  }
})

export const createEventInit = () => ({
  type: actionTypes.CREATE_EVENT_INIT
})

export const createEvent = (eventDetails, image) => {
  return dispatch => {
    dispatch(createEventStart());
    const eventInfo = new FormData();
    eventInfo.append('jsonKeys', JSON.stringify(eventDetails));
    eventInfo.append('eventPhoto', image);
    axios.post('/createEvent', eventInfo)
    .then(response => {
      localStorage.setItem("eventId", response.data.event._id);
      dispatch(createEventSuccess(response.data.event))
    }).catch(error => {
      dispatch(createEventFail(error.response.data.message))
    })


  }
};

export const updateEventStart = () => ({
  type: actionTypes.UPDATE_EVENT_START,
})

export const updateEventSuccess = (event) => ({
  type: actionTypes.UPDATE_EVENT_SUCCESS,
  payload: {
    event: event
  }
})

export const updateEventFail = (error) => ({
  type: actionTypes.UPDATE_EVENT_FAIL,
  payload: {
    error: error
  }
})

export const updateCreatedEvent = (eventId, eventDetails, image) => {
  return dispatch => {
    dispatch(updateEventStart());
    const eventInfo = new FormData();
    eventInfo.append('jsonKeys', JSON.stringify(eventDetails));
    eventInfo.append('eventId', JSON.stringify(eventId));
    eventInfo.append('eventPhoto', image);
    axios.post('/updateCreatedEvent', eventInfo)
    .then(response => {
      localStorage.setItem("eventId", response.data.event._id);
      dispatch(updateEventSuccess(response.data.event))
    }).catch(error => {
      dispatch(updateEventFail(error.response.data.message))
    })
  }
}

export const addIngredientsStart = () => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_START,
})

export const addIngredientsSuccess = () => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_SUCCESS,
  payload: {}
})

export const addIngredientsFail = (payload) => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_FAIL,
  payload: {
    error: payload
  }
})

export const addIngredients = (foodIngredients, drinkIngredients, additionalIngredients, eventId) => {
  return dispatch => {
    dispatch(addIngredientsStart());
    const data = {
      foodIngredients: foodIngredients,
      drinkIngredients: drinkIngredients,
      additionalItems: additionalIngredients,
      eventId: eventId
    }
    axios.put('/addIngredientsToEvent', data)
    .then(response => {
      dispatch(addIngredientsSuccess());
    })
    .catch(error => {
      dispatch(addIngredientsFail(error.response.data.message));
    })
  }
};
