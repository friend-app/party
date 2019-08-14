import React from 'react';
import classes from './UserUsersList.module.css';
import UserListItem from './UserListItem/UserListItem';

const UserUsersList = (props) => {

  const users = props.usersInfo.map((userInfo, index) => (
    <UserListItem key={index} userPhoto={userInfo.user.photo}  userName={userInfo.user.nickname} />
  ))

  return (
    <div className={classes.UserUsersList}>
      {users}
    </div>
  )
}

export default UserUsersList
