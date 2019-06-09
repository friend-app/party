import React, { Component } from "react";
import classes from "./DrinkUserChoice.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { makeChosenIngs } from "../../../../shared/makeChosenIngs";
import EventControls from "../../../../components/EventSwitcher/EventControls/EventControls";
import Button from "../../../../components/UI/Button/Button";

class DrinkUserChoice extends Component {
  componentDidMount() {
    if(!this.props.event){
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
    }
  }

  onSubmitHandler = () => {
    const drinkIngs = { ...this.props.drinkIngs };
    for (let key in drinkIngs) {
      if (drinkIngs[key] === 0) {
        delete drinkIngs[key];
      }
    }
    this.props.onUserChoice(drinkIngs, this.props.event._id, this.props.userId);
  };

  chooseUserChoiceHanlder = (userChoice, choiceLocationId) => {
    return this.props.history.push({
      pathname: "/events/eventForUser/updateUserChoice",
      state: {
        userChoice: userChoice,
        choiceLocationId: choiceLocationId,
        eventId: this.props.event._id
      }
    });
  };

  deleteUserChoiceHandler = (locationId, choiceId) => {
    // console.log(choiceId);
    const choiceByUser = this.props.event.users.find(choice => choice._id === locationId);
    choiceByUser.userChoices.map((userChoice, index) => {
      if(userChoice._id === choiceId){
        return choiceByUser.userChoices.splice(index, 1);
      }
      return userChoice;
    })
    // console.log(choiceByUser.userChoices);
    this.props.onUpdateUserChoice(choiceByUser.userChoices, locationId, this.props.event._id);
  };

  render() {
    const disabledMin = {
      ...this.props.drinkIngs
    };

    for (let key in this.props.drinkIngs) {
      disabledMin[key] = disabledMin[key] <= 0;
    }

    const chosenDrinkIngs = makeChosenIngs(this.props.drinkIngs);

    let event = <Spinner />;

    if (this.props.event) {
      const currentUser = this.props.event.users.find(
        user => user.user._id === this.props.userId
      );

      event = (
        <div className={classes.EventWrapper} onClick={this.props.clicked}>
          <h2>{this.props.event.title}</h2>
          <h3>
            {new Date(this.props.event.date).toLocaleDateString("he-He")} -{" "}
            {new Date(this.props.event.date).toLocaleTimeString("he-He")}
          </h3>
          <h3>Creator: {this.props.event.nickname}</h3>

          <div className={classes.ChoosesBox}>
            <h2>Chosen Ingredient - Can be scrolled</h2>
            {this.props.loading ? <Spinner /> : chosenDrinkIngs}
          </div>
          <div className={classes.EventInside}>
            <EventControls
              controls={this.props.event.drinkIngredients}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledMin}
            />
            <Button
              btnType="SubmitUserChoice"
              disabled=""
              clicked={this.onSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }

    return <div>{event}</div>;
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
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onUserChoice: (userChoice, eventId, userId) =>
      dispatch(actions.addUserChoice(userChoice, eventId, userId)),
    onUpdateUserChoice: (choice, choiceLocationId, eventId) =>
      dispatch(actions.updateUserChoice(choice, choiceLocationId, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkUserChoice);