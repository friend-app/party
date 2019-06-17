import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './UpdateUserChoice.module.css';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { makeChosenIngs } from '../../../../shared/makeChosenIngs';
import EventControls from '../../../../components/EventSwitcher/EventControls/EventControls';
import Button from '../../../../components/UI/Button/Button';

class UpdateUserChoice extends Component {
  componentDidMount() {
      this.props.onUpdateUserChoiceInit(
        this.props.location.state.type,
        this.props.location.state.userChoice.choice
      );
  }

  onSubmitHandler = () => {
    const ings = { ...this.props[this.props.location.state.type] };
    for (let key in ings) {
      if (ings[key] === 0) {
        delete ings[key];
      }
    }

    const userWithChoices = this.props.event.users.find(
      user => user._id === this.props.location.state.choiceLocationId
    );
    console.log(userWithChoices, this.props.location.state.type);
    const userChoices = JSON.parse(
      JSON.stringify(userWithChoices[this.props.location.state.choiceType])
    );
    userChoices.map(singleChoice => {
      if (singleChoice._id === this.props.location.state.userChoice._id) {
        singleChoice.choice = ings;
      }
      return singleChoice;
    });

    const updatedUserChoices = userChoices.filter(
      singleChoice => Object.keys(singleChoice.choice).length !== 0
    );

    // console.log(updatedUserChoices);

    this.props.onUpdateUserChoice(
      updatedUserChoices,
      this.props.location.state.choiceType,
      this.props.location.state.choiceLocationId,
      this.props.event._id
    );
  };

  onRedirect = () => {
    if (
      !localStorage.getItem('token') ||
      typeof this.props.location.state === 'undefined'
    ) {
      console.log('huy');
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }
    return null;
  };

  render() {
    const disabledMin = {
      ...this.props[this.props.location.state.type]
    };

    for (let key in this.props[this.props.location.state.type]) {
      disabledMin[key] = disabledMin[key] <= 0;
    }

    const chosenIngs = makeChosenIngs(
      this.props[this.props.location.state.type]
    );
    let event = <Spinner />;

    if (this.props.event) {
      event = (
        <div className={classes.EventWrapper} onClick={this.props.clicked}>
          <h3>Change you ingredients</h3>
          <div className={classes.ChoosesBox}>
            <h2>Chosen Ingredient - Can be scrolled</h2>
            {this.props.loading ? <Spinner /> : chosenIngs}
          </div>
          <div className={classes.EventInside}>
            <EventControls
              controls={this.props.event[this.props.location.state.type]}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledMin}
            />
            <Button
              btnType='SubmitUserChoice'
              disabled=''
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
        {this.onRedirect()}
        {event}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  token: state.auth.token !== null,
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  foodIngredients: state.singleEvent.foodIngredients,
  drinkIngredients: state.singleEvent.drinkIngredients
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onUpdateUserChoiceInit: (type, choice) =>
      dispatch(actions.updateUserChoiceInit(type, choice)),
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName, props.location.state.type)),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName, props.location.state.type)),
    onUpdateUserChoice: (updatedChoices, type, choiceLocationId, eventId) =>
      dispatch(
        actions.updateUserChoice(
          updatedChoices,
          type,
          choiceLocationId,
          eventId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserChoice);
