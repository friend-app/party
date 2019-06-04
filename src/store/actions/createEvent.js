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
  payload
})

export const createEventInit = (payload) => ({
  type: actionTypes.CREATE_EVENT_INIT,
  payload
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

export const addIngredientsStart = () => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_START,
})

export const addIngredientsSuccess = () => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_SUCCESS,
  payload: {}
})

export const addIngredientsFail = (payload) => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_FAIL,
  payload
})

export const addIngredients = (ingredients, additionalItems, eventId) => {
  return dispatch => {
    dispatch(addIngredientsStart());
    const data = {
      ingredients: ingredients,
      additionalItems: additionalItems,
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
