import React from 'react';
import UserBottomNavigationItem from './UserBottomNavigationItem/UserBottomNavigationItem';

import classes from './UserBottomNavigationItems.module.css';

const UserBottomNavigationItems = props => {
  return (
      <nav className={classes.UserBottomNavigationItems}>
        <UserBottomNavigationItem link='/events/eventForUser' isExact={true}>
          Event
        </UserBottomNavigationItem>
        {/* <UserBottomNavigationItem link='/events/eventForUser/foodUserChoice'>
          Food Choice
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/drinkUserChoice'>
          Drink Choice
        </UserBottomNavigationItem> */}
        <UserBottomNavigationItem link='/events/eventForUser/userChoices' isExact={false}>
          Choices
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/userChoicesCards' isExact={true}>
          Food Cards
        </UserBottomNavigationItem>
      </nav>
  );
};

export default UserBottomNavigationItems;
