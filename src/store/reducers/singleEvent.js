import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  event: null,
  singleEvent: null,
  error: null,
  foodIngredients: null,
  drinkIngredients: null,
  failLoadEvent: false,
  link: null,
  editMode: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_SINGLE_EVENT_START:
      return { ...state, event: null, loading: true, failLoadEvent: false };

    case actionTypes.FETCH_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        event: payload.data,
        foodIngredients: payload.foodIngredients,
        drinkIngredients: payload.drinkIngredients,
        link: payload.link,
        loading: false,
        failLoadEvent: false
      };

    case actionTypes.FETCH_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        failLoadEvent: true
      };

    case actionTypes.ADD_INGREDIENT:
      const updatedAddIngredient = {
        [payload.ingredientName]:
          state[payload.type][payload.ingredientName] + 1
      };
      const updatedAddfoodIngredient = {
        ...state[payload.type],
        ...updatedAddIngredient
      };
      return { ...state, [payload.type]: updatedAddfoodIngredient };

    case actionTypes.REMOVE_INGREDIENT:
      const updatedRemoveIngredient = {
        [payload.ingredientName]:
          state[payload.type][payload.ingredientName] - 1
      };
      const updatedRemovefoodIngredient = {
        ...state[payload.type],
        ...updatedRemoveIngredient
      };
      return { ...state, [payload.type]: updatedRemovefoodIngredient };

    case actionTypes.ADD_USER_CHOICES_START:
      return { ...state, loading: true, error: payload.error };

    case actionTypes.ADD_USER_CHOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        foodIngredients: payload.foodIngredients,
        drinkIngredients: payload.drinkIngredients
      };

    case actionTypes.ADD_USER_CHOICES_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.UPDATE_CHOICE_RESET:
      return { ...state, foodIngredients: null, drinkIngredients: null };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_INIT:
      return {
        ...state,
        loading: false,
        [payload.type]: { ...state[payload.type], ...payload.userChoice },
        editMode: true
      };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_START:
      return { ...state, loading: true, error: payload.error };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        foodIngredients: payload.foodIngredients,
        drinkIngredients: payload.drinkIngredients,
        editMode: false
      };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
        editMode: false
      };

    case actionTypes.SINGLE_EVENT_RESET:
      return {
        ...state,
        event: null,
        link: null
      };

    case actionTypes.PUBSLISH_EVENT_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PUBSLISH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        link: payload.link
      };

    case actionTypes.PUBSLISH_EVENT_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.EDIT_EVENT_START:
      return { ...state, loading: true };

    case actionTypes.EDIT_EVENT_SUCCESS:
      return { ...state, event: payload.event, loading: false };

    case actionTypes.EDIT_EVENT_FAIL:
      return { ...state, ...payload };

    case actionTypes.REMOVE_USER_FROM_EVENT_START:
      return { ...state, loading: true };

    case actionTypes.REMOVE_USER_FROM_EVENT_SUCCESS:
      return { ...state, event: payload.event, loading: false };

    case actionTypes.REMOVE_USER_FROM_EVENT_FAIL:
      return { ...state, ...payload };

    default:
      return state;
  }
};
