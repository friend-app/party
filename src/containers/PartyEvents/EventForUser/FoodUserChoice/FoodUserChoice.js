import React, { Component } from "react";
import classes from "./FoodUserChoice.module.css";
import { connect } from "react-redux";
import InsideUserMenu from '../../../../hoc/InsideUserMenu/InsideUserMenu';
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { makeChosenIngs } from "../../../../shared/makeChosenIngs";
import EventControls from "../../../../components/EventSwitcher/EventControls/EventControls";
import Button from "../../../../components/UI/Button/Button";

class FoodUserChoice extends Component {
  componentDidMount() {
    if(!this.props.event && localStorage.getItem('eventId')){
      this.props.onFetchSingleUserEvent(localStorage.getItem('eventId'));
    } if ( !localStorage.getItem('eventId') ) {
      this.props.history.push({
        pathname: "/events"
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

  // deleteUserChoiceHandler = (locationId, choiceId) => {
  //   // console.log(choiceId);
  //   const choiceByUser = this.props.event.users.find(choice => choice._id === locationId);
  //   choiceByUser.userChoices.map((userChoice, index) => {
  //     if(userChoice._id === choiceId){
  //       return choiceByUser.userChoices.splice(index, 1);
  //     }
  //     return userChoice;
  //   })
  //   // console.log(choiceByUser.userChoices);
  //   this.props.onUpdateUserChoice(choiceByUser.userChoices, locationId, this.props.event._id);
  // };

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

    const chosenFoodIngs = makeChosenIngs(this.props.foodIngs);

    let event = <Spinner />;

    if (this.props.event) {
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
            {this.props.loading ? <Spinner /> : chosenFoodIngs}
          </div>
          <div className={classes.EventInside}>
            <EventControls
              chosenIngs={this.props.foodIngs}
              controls={this.props.event.foodIngredients}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledMin}
            />
            <Button
              btnType="SubmitUserChoice"
              disabled={disableButton}
              clicked={this.onSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }

    return <div><InsideUserMenu>{event}</InsideUserMenu></div>;
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
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName, 'foodIngredients')),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName, 'foodIngredients')),
    onUserChoice: (userChoice, eventId) =>
      dispatch(actions.addFoodChoice(userChoice, eventId)),
    onUpdateUserChoice: (choice, choiceLocationId, eventId) =>
      dispatch(actions.updateUserChoice(choice, choiceLocationId, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodUserChoice);
