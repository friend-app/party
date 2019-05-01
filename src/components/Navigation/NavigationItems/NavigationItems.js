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
          <NavigationItem link='/logout'>Logout</NavigationItem>
        )}
      </ul>
    </div>
  );
};

export default NavigationItems;
