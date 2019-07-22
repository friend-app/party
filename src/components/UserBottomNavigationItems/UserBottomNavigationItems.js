import React from 'react';
import UserBottomNavigationItem from './UserBottomNavigationItem/UserBottomNavigationItem';
import choicesImg from '../../assests/my order orange.svg';
import eventImg from '../../assests/party orange.svg';
import foodCardsImg from '../../assests/cards orange.svg';

import classes from './UserBottomNavigationItems.module.css';

const UserBottomNavigationItems = props => {
  return (
      <nav className={classes.UserBottomNavigationItems}>
        <UserBottomNavigationItem link='/events/eventForUser' isExact={true}>
        <img src={eventImg} alt="icon"></img><span>Event</span>
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/userChoices' isExact={false}>
         <img src={choicesImg} alt="icon"></img><span>Choices</span>
        </UserBottomNavigationItem>
        <UserBottomNavigationItem link='/events/eventForUser/userChoicesCards' isExact={true}>
        <img src={foodCardsImg} alt="icon"></img><span>Food Cards</span>
        </UserBottomNavigationItem>
      </nav>
  );
};

export default UserBottomNavigationItems;
