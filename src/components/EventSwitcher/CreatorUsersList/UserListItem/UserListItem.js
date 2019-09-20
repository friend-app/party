import React from 'react';
import classes from './UserListItem.module.css';
import { UPLOADS_BASE_URL } from '../../../../shared/URLS';

const UserListItem = props => {

  return (
    <div className={classes.UserItemWrapper}>
      <span><img src={UPLOADS_BASE_URL + props.userPhoto} alt="main" /></span>
      <span> {props.userName}</span>
    </div>
  );
};

export default UserListItem;
