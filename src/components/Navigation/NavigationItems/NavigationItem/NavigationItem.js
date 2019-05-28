import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  return (
    <div>
      <li className={classes.NavigationItem}>
        <NavLink exact to={props.link}
        activeClassName={classes.active}>{props.children}</NavLink>
      </li>
    </div>
  )
}

export default NavigationItem
