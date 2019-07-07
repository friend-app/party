import React from 'react';
import classes from './InsideCreatorMenu.module.css';
import CreatorBottomNavigationItems from '../../components/CreatorBottomNavigationItems/CreatorBottomNavigationItems';

const InsideUserMenu = props => {
  return (
    <div>
      <div className={classes.Children}>{props.children}</div>
      <div className={classes.BottomMenu}>
        <CreatorBottomNavigationItems />
      </div>
    </div>
  );
};

export default InsideUserMenu;
