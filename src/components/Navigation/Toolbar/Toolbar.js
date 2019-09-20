import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import logoImg from '../../../assests/logo.png';
import { NavLink } from 'react-router-dom';

const Toolbar = (props) => {
  let toolbarClasses = [classes.Toolbar, classes[props.drawerStatus]];
  return (
    <div className={[toolbarClasses.join(" ")]}>
      <DrawerToggle clicked={props.drawerToggleClick} />
      <NavLink to="/allEvents"><img src={logoImg} alt="logo" /></NavLink>
    </div>
  )
}

export default Toolbar
