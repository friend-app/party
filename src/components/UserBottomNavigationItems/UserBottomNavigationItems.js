import React from 'react';
import UserBottomNavigationItem from './UserBottomNavigationItem/UserBottomNavigationItem';

import classes from './UserBottomNavigationItems.module.css';
import Aux from '../../hoc/Auxillary/Auxillary';

const UserBottomNavigationItems = props => {
  return (
    <div>
      <nav className={classes.UserBottomNavigationItems}>
        <UserBottomNavigationItem link='/events/eventForUser'>
          Event
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/foodUserChoice'>
          Food Choice
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/drinkUserChoice'>
          Drink Choice
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/userChoicesCards'>
          Food Cards
        </UserBottomNavigationItem>
      </nav>
    </div>
  );
};

export default UserBottomNavigationItems;
