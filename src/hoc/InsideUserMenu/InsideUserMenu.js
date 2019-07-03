import React from 'react';
import classes from './InsideUserMenu.module.css';
import UserBottomNavigationItems
    from '../../components/UserBottomNavigationItems/UserBottomNavigationItems';


const InsideUserMenu = props => {
  return (
    <div>
      <div className={classes.Children}>{props.children}</div>
      <div className={classes.BottomMenu}>
      <UserBottomNavigationItems />
      </div>
    </div>
  );
};

export default InsideUserMenu;
