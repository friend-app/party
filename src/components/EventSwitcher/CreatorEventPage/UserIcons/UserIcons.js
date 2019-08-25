import React from 'react';
import classes from './UserIcons.module.css';

const UserIcons = props => {
  const users = props.users.slice(0, 3).map((user, index) => {
    return (
      <img
        key={index}
        src={'http://localhost:4000/uploads/' + user.user.photo}
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
