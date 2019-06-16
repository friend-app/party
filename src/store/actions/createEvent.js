import * as actionTypes from './actionTypes';
import axios from '../../axios-events';


export const createEventStart = () => ({
  type: actionTypes.CREATE_EVENT_START,
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

export const createEvent = (eventDetails) => {
  return dispatch => {
    dispatch(createEventStart());
    axios.post('/createEvent', eventDetails)
    .then(response => {
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

export const updateCreatedEvent = (eventId, eventDetails) => {
  return dispatch => {
    dispatch(updateEventStart());
    const eventData = {
      eventId: eventId,
      eventDetails: eventDetails
    }
    axios.post('/updateCreatedEvent', eventData)
    .then(response => {
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
