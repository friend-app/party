import React from 'react';
import classes from './UserListItem.module.css';

const UserListItem = props => {

  return (
    <div className={classes.UserItemWrapper}>
      <span><img src={'http://localhost:4000/uploads/' + props.userPhoto} alt="main" /></span>
      <span> {props.userName}</span>
    </div>
  );
};

export default UserListItem;
