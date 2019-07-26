import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CreatorBottomNavigationItem.module.css';

const CreatorBottomNavigationItem = props => {
  return (
    <div className={classes.NavigationItem}>
       <NavLink exact={props.isExact} to={props.link} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </div>
  );
};

export default CreatorBottomNavigationItem;
