import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  event: null,
  singleEvent: null,
  error: null,
  ingredients: null,
  editMode: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_SINGLE_EVENT_START:
      return { ...state, event: null, loading: true };

    case actionTypes.FETCH_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        event: payload.data,
        ingredients: payload.ingredients,
        loading: false
      };

    case actionTypes.FETCH_SINGLE_EVENT_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.ADD_INGREDIENT:
      const updatedAddIngredient = {
        [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1
      };
      const updatedAddIngredients = {
        ...state.ingredients,
        ...updatedAddIngredient
      };
      return { ...state, ingredients: updatedAddIngredients };

    case actionTypes.REMOVE_INGREDIENT:
      const updatedRemoveIngredient = {
        [payload.ingredientName]: state.ingredients[payload.ingredientName] - 1
      };
      const updatedRemoveIngredients = {
        ...state.ingredients,
        ...updatedRemoveIngredient
      };
      return { ...state, ingredients: updatedRemoveIngredients };

    case actionTypes.ADD_USER_CHOICES_START:
      return { ...state, loading: true, error: payload.error };

    case actionTypes.ADD_USER_CHOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        ingredients: payload.ingredients
      };

    case actionTypes.ADD_USER_CHOICES_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_INIT:
      return { ...state, loading: false, ingredients: {...state.ingredients, ...payload.userChoice}};

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_START:
      return { ...state, loading: true, error: payload.error};

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        ingredients: payload.ingredients,
        editMode: false
      };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
