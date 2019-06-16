import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./UpdateUserChoice.module.css";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { makeChosenIngs } from "../../../../shared/makeChosenIngs";
import EventControls from "../../../../components/EventSwitcher/EventControls/EventControls";
import Button from "../../../../components/UI/Button/Button";

class UpdateUserChoice extends Component {
  componentDidMount() {
    this.props.onUpdateUserChoiceInit(
      this.props.location.state.userChoice.foodChoice
    );
  }

  onSubmitHandler = () => {
    const ings = { ...this.props.ings };
    for (let key in ings) {
      if (ings[key] === 0) {
        delete ings[key];
      }
    }

    const userWithChoices = this.props.event.users.find(
      user => user._id === this.props.location.state.choiceLocationId
    );
    const userChoices = [...userWithChoices.userChoices];
    userChoices.map(singleChoice => {
      if (singleChoice._id === this.props.location.state.userChoice._id) {
        singleChoice.foodChoice = ings;
      }
      return singleChoice;
    });

    const updatedUserChoices = userChoices.filter(
      singleChoice => Object.keys(singleChoice.foodChoice).length !== 0
    );

    const type = '';
    this.props.onUpdateUserChoice(
      updatedUserChoices,
      type,
      this.props.location.state.choiceLocationId,
      this.props.event._id
    );
  };

  render() {
    if (!this.props.event || !this.props.ings || !this.props.editMode) {
      return <Redirect
        to={{
          pathname: "/events/eventForUser",
          state: { eventId: this.props.location.state.eventId }
        }}
      />;
    }

    const disabledMin = {
      ...this.props.ings
    };

    for (let key in this.props.ings) {
      disabledMin[key] = disabledMin[key] <= 0;
    }

    const chosenIngs = makeChosenIngs(this.props.ings);

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
              controls={this.props.event.ingredients}
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
  ings: state.singleEvent.ingredients,
  editMode: state.singleEvent.editMode
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUserChoiceInit: choice =>
      dispatch(actions.updateUserChoiceInit(choice)),
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
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
