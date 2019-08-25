import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import InsideCreatorMenu from '../../../../hoc/InsideCreatorMenu/InsideCreatorMenu';
import IngredientItems from '../../../../components/EventSwitcher/IngredientItems/IngredientItems';
import AdditionsItems from '../../../../components/EventSwitcher/AdditionsItems/AdditionsItems';

class IngredientList extends Component {
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

  countFoodChoice = () => {
    let foodChoices = {};
    this.props.event.foodIngredients.forEach(element => {
      foodChoices = {
        ...foodChoices,
        [element]: 0
      };
    });
    for (let user of this.props.event.users) {
      for (let foodChoice of user.foodChoices) {
        for (let key of this.props.event.foodIngredients) {
          const food = foodChoice.choice[key] ? foodChoice.choice[key] : 0;
          foodChoices = {
            ...foodChoices,
            [key]: foodChoices[key] + food
          };
        }
      }
    }
    return foodChoices;
  };

  countDrinkChoice = () => {
    let drinkChoices = {};
    this.props.event.drinkIngredients.forEach(element => {
      drinkChoices = {
        ...drinkChoices,
        [element]: 0
      };
    });
    for (let user of this.props.event.users) {
      for (let drinkChoice of user.drinksChoices) {
        for (let key of this.props.event.drinkIngredients) {
          const drink = drinkChoice.choice[key] ? drinkChoice.choice[key] : 0;
          drinkChoices = {
            ...drinkChoices,
            [key]: drinkChoices[key] + drink
          };
        }
      }
    }
    return drinkChoices;
  };

  render() {
    let foodChoices = [];
    let drinkChoices = [];
    let food = null;
    let drink = null;
    let additionalItems = null;
    if (this.props.event) {
      foodChoices = this.countFoodChoice();
      drinkChoices = this.countDrinkChoice();
      food = <IngredientItems title='Food Ingredients' ings={foodChoices} type="food" />;
      drink = <IngredientItems title='Drink Ingredients' ings={drinkChoices} type="drink"/>;
      additionalItems = (
        <AdditionsItems
          title='Additional Ingredients'
          add={this.props.event.additionalItems}
          usersAmount={this.props.event.users.length}
        />
      );
    }

    return (
      <InsideCreatorMenu>
        {food}
        {drink}
        {additionalItems}
      </InsideCreatorMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  loading: state.singleEvent.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientList);
