import React, { Component } from 'react';
import classes from './ChoicesCreatorTabComponent.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import FoodCreatorChoice from '../FoodCreatorChoice/FoodCreatorChoice';
import DrinkCreatorChoice from '../DrinkCreatorChoice/DrinkCreatorChoice';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import drinkImg from '../../../../assests/drink-tab.png';
import foodImg from '../../../../assests/food.png';

class ChoicesCreatorTabComponent extends Component {
  componentDidMount() {
    this.props.history.push({
      pathname: '/events/eventForCreator/creatorChoices'
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
            to={'/events/eventForCreator/creatorChoices'}
            activeClassName={classes.active}
          >
            <img src={foodImg} alt='icon'/>
            <span>Main Course</span>
          </NavLink>
          <NavLink
            exact
            to={'/events/eventForCreator/creatorChoices/drinkCreatorChoice'}
            activeClassName={classes.active}
          >
            <img src={drinkImg} alt='icon'/>
            <span>Alcohol & Drinks</span>
          </NavLink>
        </div>
        <Switch>
          <Route
            exact
            path={this.props.match.url + '/drinkCreatorChoice'}
            component={DrinkCreatorChoice}
          />
          <Route exact path={this.props.match.url} component={FoodCreatorChoice} />
        </Switch>
      </Aux>
    );
  }
}

export default ChoicesCreatorTabComponent;
