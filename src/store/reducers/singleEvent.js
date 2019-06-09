import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  event: null,
  singleEvent: null,
  error: null,
  foodIngredients: null,
  drinkIngredients: null,
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
        foodIngredients: payload.foodIngredients,
        drinkIngredients: payload.drinkIngredients,
        loading: false
      };

    case actionTypes.FETCH_SINGLE_EVENT_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.ADD_INGREDIENT:
      const updatedAddIngredient = {
        [payload.ingredientName]: state.foodIngredients[payload.ingredientName] + 1
      };
      const updatedAddfoodIngredient = {
        ...state.foodIngredients,
        ...updatedAddIngredient
      };
      return { ...state, foodIngredients: updatedAddfoodIngredient };

    case actionTypes.REMOVE_INGREDIENT:
      const updatedRemoveIngredient = {
        [payload.ingredientName]: state.foodIngredients[payload.ingredientName] - 1
      };
      const updatedRemovefoodIngredient = {
        ...state.foodIngredients,
        ...updatedRemoveIngredient
      };
      return { ...state, foodIngredients: updatedRemovefoodIngredient };

    case actionTypes.ADD_USER_CHOICES_START:
      return { ...state, loading: true, error: payload.error };

    case actionTypes.ADD_USER_CHOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        foodIngredients: payload.foodIngredients
      };

    case actionTypes.ADD_USER_CHOICES_FAIL:
      return { ...state, loading: false, error: payload.error };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_INIT:
      return { ...state, loading: false, foodIngredients: {...state.foodIngredients, ...payload.userChoice}};

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_START:
      return { ...state, loading: true, error: payload.error};

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: payload.event,
        foodIngredients: payload.foodIngredients,
        editMode: false
      };

    case actionTypes.UPDATE_USER_CHOICE_IN_EVENT_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
