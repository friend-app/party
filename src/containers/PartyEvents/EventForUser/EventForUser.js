import React, { Component } from "react";
import classes from "./EventForUser.module.css";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import * as actions from "../../../store/actions/index";
// import Spinner from "../../../components/UI/Spinner/Spinner";
import FoodUserChoice from './FoodUserChoice/FoodUserChoice';
import DrinkUserChoice from './DrinkUserChoice/DrinkUserChoice';
import UserChoiceCards from "../../../components/EventSwitcher/userChoiceCards/userChoiceCards";
import Button from "../../../components/UI/Button/Button";

class EventForUser extends Component {
  componentDidMount() {
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
  }

  onUserFoodChoice = () => {
    return this.props.history.push({
      pathname: "/events/eventForUser/foodUserChoice",
      state: {
        eventId: this.props.event._id
      }
    });
  }

  onUserDrinkChoice = () => {
    return this.props.history.push({
      pathname: "/events/eventForUser/drinkUserChoice",
      state: {
        eventId: this.props.event._id
      }
    });
  }
  
  render() {
    return <div>
      <Button btnType="Success" clicked={this.onUserFoodChoice}>FoodChoice</Button>
      <div><Route path={'/events/eventForUser/foodUserChoice'} component={FoodUserChoice} /></div>
      <Button btnType="Success" clicked={this.onUserDrinkChoice}>DrinkChoice</Button>
      <div><Route path={'/events/eventForUser/drinkUserChoice'} component={DrinkUserChoice} /></div>
      {/* <div>{UserChoiceCards}</div> */}
    </div>;
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
)(EventForUser);
