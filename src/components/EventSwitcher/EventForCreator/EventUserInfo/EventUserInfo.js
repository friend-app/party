import React from 'react';
import UserChoice from './userChoice/userChoice';

const EventUserInfo = (props) => {
  const userChoices = props.usersInfo.userChoices.map((uChoice, index) => (
    <UserChoice key={index} choice={uChoice.choiceOptions} />
  ));

  return (
    <div>
      <h3>{props.usersInfo.userData.name}</h3>
      {userChoices}
    </div>
  )
}

export default EventUserInfo
