import React from 'react';
import classes from './InsideCreatorMenu.module.css';
import CreatorBottomNavigationItems from '../../components/CreatorBottomNavigationItems/CreatorBottomNavigationItems';

const InsideCreatorMenu = props => {
  return (
    <div>
      <div className={classes.Children}>{props.children}</div>
      <div className={classes.BottomMenu}>
        <CreatorBottomNavigationItems choicesAmount={props.choicesAmount}/>
      </div>
    </div>
  );
};

export default InsideCreatorMenu;
