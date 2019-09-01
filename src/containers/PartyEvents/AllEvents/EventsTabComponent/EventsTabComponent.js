import React, { Component } from 'react';
import classes from './EventsTabComponent.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import AllEvents from '../UserEvents/UserEvents';
import CreatorEvents from '../CreatorEvents/CreatorEvents';
import allImg from '../../../../assests/all parties orange.svg';
import createdImg from '../../../../assests/created by me orange.svg';

class EventsTabComponent extends Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.history.push({
        pathname: '/allEvents'
      });
    } else {
      this.props.history.push({
        pathname: '/login'
      });
    }
  }
  

  render() {
    return (
      <div>
        <Aux>
          <div className={classes.TopMenu}>
            <NavLink exact to={'/allEvents'} activeClassName={classes.active}>
              <img src={allImg} alt='icon' />
              <span>All Parties</span>
            </NavLink>
            <NavLink
              exact
              to={'/allEvents/createdEvents'}
              activeClassName={classes.active}
            >
              <img src={createdImg} alt='icon' />
              <span>Created Parties</span>
            </NavLink>
          </div>
          <Switch>
            <Route
              exact
              path={this.props.match.url + '/createdEvents'}
              component={CreatorEvents}
            />
            <Route exact path={this.props.match.url} component={AllEvents} />
          </Switch>
        </Aux>
      </div>
    );
  }
}

export default EventsTabComponent;
