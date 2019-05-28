import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <nav><NavigationItems isAuth={props.isAuth}/></nav>
    </div>
  )
}

export default Toolbar
