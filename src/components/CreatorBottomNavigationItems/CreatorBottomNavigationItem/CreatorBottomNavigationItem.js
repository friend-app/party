import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CreatorBottomNavigationItem.module.css';

const CreatorBottomNavigationItem = props => {
  return (
    <div className={classes.NavigationItem}>
       {props.choicesAmount ?
      <div className={classes.ChoicesAmount}>
        {props.choicesAmount}
        </div>
         : null}
       <NavLink exact={props.isExact} to={props.link} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </div>
  );
};

export default CreatorBottomNavigationItem;
