import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
  return (
    <div>
      <ul className={classes.NavigationItems}>
        <NavigationItem link='/login'>Login</NavigationItem>
        <NavigationItem link='/signup'>Signup</NavigationItem>
      </ul>
    </div>
  )
}

export default NavigationItems
