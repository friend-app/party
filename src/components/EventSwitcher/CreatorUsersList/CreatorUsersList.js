import React from "react";
import classes from "./CreatorUsersList.module.css";
import UserListItem from "./UserListItem/CreatorListItem";

const UserUsersList = props => {
  const users = props.usersInfo.map((userInfo, index) => (
    <UserListItem
      key={index}
      userId={userInfo.user._id}
      creatorId={props.creatorId}
      eventId={props.eventId}
      userPhoto={userInfo.user.photo}
      userName={userInfo.user.nickname}
      clicked={props.clicked}
    />
  ));

  return <div className={classes.UserUsersList}>{users}</div>;
};

export default UserUsersList;
