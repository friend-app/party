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

export const createEvent = (eventDetails) => {
  return dispatch => {
    dispatch(createEventStart());
    axios.post('/createEvent', eventDetails)
    .then(response => {
      console.log(response);
      dispatch(createEventSuccess(response.data))
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

export const addIngredients = (eventDetails) => {
  return dispatch => {
    dispatch(addIngredientsStart());
    setTimeout(() => {
      dispatch(addIngredientsSuccess(eventDetails))
    }, 500)
  }
};
