import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';

const NavigationItems = props => {
  return (
    <div>
        <nav className={classes.NavigationItems}>
          <NavigationItem link='/'>Home</NavigationItem>
          {!props.isAuth ? (
            <Aux>
              <NavigationItem link='/login'>Login</NavigationItem>
              <NavigationItem link='/signup'>Signup</NavigationItem>
            </Aux>
          ) : (
            <Aux>
              <NavigationItem link='/events/create-event'>
                Create Event
              </NavigationItem>
              <NavigationItem link='/logout'>Logout</NavigationItem>
            </Aux>
          )}
        </nav>
    </div>
  );
};

export default NavigationItems;
