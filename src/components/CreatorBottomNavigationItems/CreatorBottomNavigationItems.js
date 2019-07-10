import React from 'react';
import CreatorBottomNavigationItem from './CreatorBottomNavigationItem/CreatorBottomNavigationItem';

import classes from './CreatorBottomNavigationItems.module.css';

const UserBottomNavigationItems = props => {
  return (
      <nav className={classes.UserBottomNavigationItems}>
        <CreatorBottomNavigationItem link='/events/eventForCreator'>
          Event
        </CreatorBottomNavigationItem>
        <CreatorBottomNavigationItem link='/events/eventForCreator/foodCreatorChoice'>
          Food Choice
        </CreatorBottomNavigationItem>
        <CreatorBottomNavigationItem link='/events/eventForCreator/drinkCreatorChoice'>
          Drink Choice
        </CreatorBottomNavigationItem>
        <CreatorBottomNavigationItem link='/events/eventForCreator/CreatorChoicesCards'>
          Food Cards
        </CreatorBottomNavigationItem>
      </nav>
  );
};

export default UserBottomNavigationItems;
