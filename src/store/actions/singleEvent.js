import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const fetchEventStart = payload => ({
  type: actionTypes.FETCH_SINGLE_EVENT_START,
  payload
});

export const fetchEventSuccess = (data, ingredients) => ({
  type: actionTypes.FETCH_SINGLE_EVENT_SUCCESS,
  payload: {
    data: data,
    ingredients: ingredients
  }
});

export const fetchEventFail = error => ({
  type: actionTypes.FETCH_SINGLE_EVENT_FAIL,
  payload: {
    error: error
  }
});

export const fetchSingleCreatedEvent = eventId => {
  return dispatch => {
    dispatch(fetchEventStart());
    axios
      .get('fetchSingleCreatedEvent/' + eventId)
      .then(response => {
        let ingredients = {};
        response.data.event.ingredients.map(ingredient => {
          return (ingredients[ingredient] = 0);
        });
        dispatch(fetchEventSuccess(response.data.event, ingredients));
      })
      .catch(error => {
        dispatch(fetchEventFail(error));
      });
  };
};

export const fetchSingleUserEvent = eventId => {
  return dispatch => {
    dispatch(fetchEventStart());
    axios
      .get('fetchSingleUserEvent/' + eventId)
      .then(response => {
        let ingredients = {};
        response.data.event.ingredients.map(ingredient => {
          return (ingredients[ingredient] = 0);
        });
        dispatch(fetchEventSuccess(response.data.event, ingredients));
      })
      .catch(error => {
        dispatch(fetchEventFail(error.response.data.message));
      });
  };
};

export const addUserChoicesStart = () => ({
  type: actionTypes.ADD_USER_CHOICES_START,
  payload: {}
});

export const addUserChoicesSuccess = (event, ingredients) => ({
  type: actionTypes.ADD_USER_CHOICES_SUCCESS,
  payload: {
    event: event,
    ingredients: ingredients
  }
});

export const addUserChoicesFail = () => ({
  type: actionTypes.ADD_USER_CHOICES_FAIL,
  payload: {}
});

export const addUserChoice = (userChoice, eventId, userId) => {
  return dispatch => {
    dispatch(addUserChoicesStart());
    const data = {
      userChoice: { choice: userChoice },
      eventId: eventId,
      userId: userId
    };
    axios
      .put('addUserChoices', data)
      .then(response => {
        let ingredients = {};
        response.data.event.ingredients.map(ingredient => {
          return (ingredients[ingredient] = 0);
        });
        dispatch(addUserChoicesSuccess(response.data.event, ingredients));
      })
      .catch(error => {
        dispatch(addUserChoicesFail(error.response.data.message));
      });
  };
};

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { ingredientName: ingredientName }
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { ingredientName: ingredientName }
});
