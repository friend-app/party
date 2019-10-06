import React from 'react';
import classes from './UserIcons.module.css';
import { UPLOADS_BASE_URL } from '../../../../shared/URLS';

const UserIcons = props => {
  const users = props.users.slice(0, 3).map((user, index) => {
    return (
      <img
        key={index}
        src={UPLOADS_BASE_URL + user.user.photo}
        alt='user-icon'
      />
    );
  });
  return (
    <div className={classes.UserIcons}>
      <div className={classes.Icons}>{users} </div>
      <div className={classes.MembersCount}>{props.users.length} members</div>
    </div>
  );
};

export default UserIcons;
