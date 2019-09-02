import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <nav><NavigationItems isAuth={props.isAuth}/></nav>
    </div>
  )
}

export default Toolbar
