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
      console.log(error);
    })


  }
};

export const addIngredientsStart = () => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_START,
})

export const addIngredientsSuccess = (ingredients) => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_SUCCESS,
  payload: {
    ingredients: ingredients
  }
})

export const addIngredientsFail = (payload) => ({
  type: actionTypes.ADD_INGREDEINTS_TO_EVENT_FAIL,
  payload
})

export const addIngredients = (ingredients, eventId) => {
  return dispatch => {
    dispatch(addIngredientsStart());
    const data = {
      ingredients: ingredients,
      eventId: eventId
    }
    axios.post('/addIngredientsToEvent', data)
    .then(response => {
      console.log(response.data);
      dispatch(addIngredientsSuccess(response.data))
    })
    .catch(error => {
      console.log(error)
    })
  }
};
