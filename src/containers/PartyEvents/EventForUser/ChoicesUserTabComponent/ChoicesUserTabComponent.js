import React, { Component } from 'react';
import classes from './ChoicesUserTabComponent.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import FoodUserChoice from '../FoodUserChoice/FoodUserChoice';
import DrinkUserChoice from '../DrinkUserChoice/DrinkUserChoice';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import drinkImg from '../../../../assests/drink-tab.png';
import foodImg from '../../../../assests/food.png';

class ChoicesUserTabComponent extends Component {
  componentDidMount() {
    this.props.history.push({
      pathname: '/events/eventForUser/userChoices'
    });
  }

  componentDidUpdate() {
    console.log(this.props.match.url);
  }

  render() {
    return (
      <Aux>
        <div className={classes.TopMenu}>
          <NavLink
            exact
            to={'/events/eventForUser/userChoices'}
            activeClassName={classes.active}
          >
            <img src={foodImg} alt='icon'/>
            <span>Main Course</span>
          </NavLink>
          <NavLink
            exact
            to={'/events/eventForUser/userChoices/drinkUserChoice'}
            activeClassName={classes.active}
          >
            <img src={drinkImg} alt='icon'/>
            <span>Alcohol & Drinks</span>
          </NavLink>
        </div>
        <Switch>
          <Route
            exact
            path={this.props.match.url + '/drinkUserChoice'}
            component={DrinkUserChoice}
          />
          <Route exact path={this.props.match.url} component={FoodUserChoice} />
        </Switch>
      </Aux>
    );
  }
}

export default ChoicesUserTabComponent;
