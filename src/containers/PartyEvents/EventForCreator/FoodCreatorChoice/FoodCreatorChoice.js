import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './FoodCreatorChoice.module.css';
import InsideCreatorMenu from '../../../../hoc/InsideCreatorMenu/InsideCreatorMenu';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import EventControls from '../../../../components/EventSwitcher/EventControls/EventControls';
import Button from '../../../../components/UI/Button/Button';

class FoodCreatorChoice extends Component {
  componentDidMount() {
    if (!this.props.event && localStorage.getItem('eventId')) {
      this.props.onFetchSingleUserEvent(localStorage.getItem('eventId'));
    }
    if (!localStorage.getItem('eventId')) {
      this.props.history.push({
        pathname: '/events'
      });
    }
  }

  onSubmitHandler = () => {
    const foodIngs = { ...this.props.foodIngs };
    for (let key in foodIngs) {
      if (foodIngs[key] === 0) {
        delete foodIngs[key];
      }
    }
    this.props.onUserChoice(foodIngs, this.props.event._id);
  };

  deleteUserChoiceHandler = (locationId, choiceId) => {
    const choiceByUser = this.props.event.users.find(
      choice => choice._id === locationId
    );
    choiceByUser.userChoices.map((userChoice, index) => {
      if (userChoice._id === choiceId) {
        return choiceByUser.userChoices.splice(index, 1);
      }
      return userChoice;
    });
    this.props.onUpdateUserChoice(
      choiceByUser.userChoices,
      locationId,
      this.props.event._id
    );
  };

  render() {
    const disabledMin = {
      ...this.props.foodIngs
    };

    let disableButton = true;

    for (let key in this.props.foodIngs) {
      if (disabledMin[key] > 0) {
        disableButton = false;
      }
      disabledMin[key] = disabledMin[key] <= 0;
    }
    let event = <Spinner />;

    if (this.props.event) {
      event = (
        <div className={classes.EventWrapper} onClick={this.props.clicked}>
          <div className={classes.EventInside}>
            <EventControls
              chosenIngs={this.props.foodIngs}
              controls={this.props.event.foodIngredients}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledMin}
            />
            <Button
              btnType='SubmitUserChoice'
              disabled={disableButton}
              clicked={this.onSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <InsideCreatorMenu>{event}</InsideCreatorMenu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  token: state.auth.token,
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  foodIngs: state.singleEvent.foodIngredients
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName, 'foodIngredients')),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName, 'foodIngredients')),
    onUserChoice: (userChoice, eventId) =>
      dispatch(actions.addFoodChoice(userChoice, eventId)),
    onUpdateUserChoice: (choice, choiceLocationId, eventId) =>
      dispatch(actions.updateUserChoice(choice, choiceLocationId, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodCreatorChoice);
