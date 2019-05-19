import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';

const NavigationItems = props => {
  return (
    <div>
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Home</NavigationItem>
        {!props.isAuth ? (
          <Aux>
            <NavigationItem link='/login'>Login</NavigationItem>
            <NavigationItem link='/signup'>Signup</NavigationItem>
          </Aux>
        ) : (
          <Aux>
          <NavigationItem link='/logout'>Logout</NavigationItem>
          <NavigationItem link='/events/create-event'>Create Event</NavigationItem>
          </Aux>
        )}
      </ul>
    </div>
  );
};

export default NavigationItems;
