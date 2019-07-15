import React, { Component } from 'react';
import classes from './DrinkUserChoice.module.css';
import { connect } from 'react-redux';
import InsideUserMenu from '../../../../hoc/InsideUserMenu/InsideUserMenu';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import EventControls from '../../../../components/EventSwitcher/EventControls/EventControls';
import Button from '../../../../components/UI/Button/Button';

class DrinkUserChoice extends Component {
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
    const drinkIngs = { ...this.props.drinkIngs };
    for (let key in drinkIngs) {
      if (drinkIngs[key] === 0) {
        delete drinkIngs[key];
      }
    }
    this.props.onUserChoice(drinkIngs, this.props.event._id);
  };

  render() {
    const disabledMin = {
      ...this.props.drinkIngs
    };

    let disableButton = true;

    for (let key in this.props.drinkIngs) {
      if (disabledMin[key] > 0) {
        disableButton = false;
      }
      disabledMin[key] = disabledMin[key] <= 0;
    }

    let event = <Spinner />;

    if (this.props.event) {
      event = (
        <div className={classes.EventWrapper}>
            <EventControls
              chosenIngs={this.props.drinkIngs}
              controls={this.props.event.drinkIngredients}
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
      );
    }

    return (
      <div>
        <InsideUserMenu>{event}</InsideUserMenu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  token: state.auth.token,
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  drinkIngs: state.singleEvent.drinkIngredients,
  editMode: state.singleEvent.editMode
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName, 'drinkIngredients')),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName, 'drinkIngredients')),
    onUserChoice: (userChoice, eventId) =>
      dispatch(actions.addDrinksChoice(userChoice, eventId)),
    onUpdateUserChoice: (choice, choiceLocationId, eventId) =>
      dispatch(actions.updateUserChoice(choice, choiceLocationId, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkUserChoice);
