import React, { Component } from 'react';
import classes from './ChoicesTabComponent.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import FoodUserChoice from '../FoodUserChoice/FoodUserChoice';
import DrinkUserChoice from '../DrinkUserChoice/DrinkUserChoice';
import Aux from '../../../../hoc/Auxillary/Auxillary';

class ChoicesTabComponent extends Component {
  componentDidMount() {
    console.log('huy');
    this.props.history.push({
      pathname: '/events/eventForUser/userChoices'
    });
  }

  componentDidUpdate() {
    console.log(this.props.match.url);
  }

  render() {
    console.log('huy');
    return (
      <Aux>
        <div className={classes.TopMenu}>
          {' '}
          <NavLink
            exact
            to={'/events/eventForUser/userChoices'}
            activeClassName={classes.active}
          >
            Main Course
          </NavLink>
          <NavLink
            exact
            to={'/events/eventForUser/userChoices/drinkUserChoice'}
            activeClassName={classes.active}
          >
            Alcohol & Drinks
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

export default ChoicesTabComponent;
