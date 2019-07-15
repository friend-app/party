import React from './node_modules/react';
import classes from './InsideUerChoicesMenu.module.css';
import UserBottomNavigationItems
    from '../../components/UserBottomNavigationItems/UserBottomNavigationItems';


const InsideUerChoicesMenu = props => {
  return (
    <div>
      <div className={classes.Children}>{props.children}</div>
      <div className={classes.TopMenu}>
      <UserBottomNavigationItems />
      </div>
    </div>
  );
};

export default InsideUerChoicesMenu;
