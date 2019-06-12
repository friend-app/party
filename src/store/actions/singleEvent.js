import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const fetchEventStart = payload => ({
  type: actionTypes.FETCH_SINGLE_EVENT_START,
  payload
});

export const fetchEventSuccess = (data, foodIngredients, drinkIngredients) => ({
  type: actionTypes.FETCH_SINGLE_EVENT_SUCCESS,
  payload: {
    data: data,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients
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
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          fetchEventSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
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
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          fetchEventSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
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

export const addUserChoicesSuccess = (
  event,
  foodIngredients,
  drinkIngredients
) => ({
  type: actionTypes.ADD_USER_CHOICES_SUCCESS,
  payload: {
    event: event,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients
  }
});

export const addUserChoicesFail = () => ({
  type: actionTypes.ADD_USER_CHOICES_FAIL,
  payload: {}
});

export const addFoodChoice = (userChoice, eventId, userId) => {
  return dispatch => {
    dispatch(addUserChoicesStart());
    const data = {
      foodChoice: { choice: userChoice },
      eventId: eventId,
      userId: userId
    };

    console.log(data);
    axios
      .put('addFoodChoices', data)
      .then(response => {
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(addUserChoicesSuccess(response.data.event, foodIngredients, drinkIngredients));
      })
      .catch(error => {
        dispatch(addUserChoicesFail(error.response.data.message));
      });
  };
};

export const addDrinksChoice = (userChoice, eventId, userId) => {
  return dispatch => {
    dispatch(addUserChoicesStart());
    const data = {
      drinksChoice: { choice: userChoice },
      eventId: eventId,
      userId: userId
    };
    axios
      .put('addDrinkChoices', data)
      .then(response => {
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(addUserChoicesSuccess(response.data.event, foodIngredients, drinkIngredients));
      })
      .catch(error => {
        dispatch(addUserChoicesFail(error.response.data.message));
      });
  };
};

export const addIngredient = (ingredientName, type) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { ingredientName: ingredientName, type: type }
});

export const removeIngredient = (ingredientName, type) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { ingredientName: ingredientName, type: type }
});

export const updateUserChoiceInit = userChoice => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_INIT,
  payload: {
    userChoice: userChoice
  }
});

export const updateUserChoiceStart = () => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_START,
  payload: {}
});

export const updateUserChoiceSuccess = (
  event,
  foodIngredients,
  drinkIngredients
) => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_SUCCESS,
  payload: {
    event: event,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients
  }
});

export const updateUserChoiceFail = choice => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_FAIL,
  payload: {
    userChoice: choice
  }
});

export const updateUserChoice = (updatedChoices, choiceLocationId, eventId) => {
  return dispatch => {
    dispatch(updateUserChoiceStart());
    const data = {
      choices: updatedChoices,
      choiceLocationId: choiceLocationId,
      eventId: eventId
    };
    console.log(data);
    axios
      .put('updateUserChoice', data)
      .then(response => {
        let foodIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        dispatch(updateUserChoiceSuccess(response.data.event, foodIngredients));
      })
      .catch(error => {
        dispatch(updateUserChoiceFail(error.response.data.message));
      });
  };
};
