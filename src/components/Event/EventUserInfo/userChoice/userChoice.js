import React from 'react';
import classes from './userChoice.module.css';

const userChoices = props => {

  console.log(props.choice);

  const userChoices = [];
  for (let key in props.choice) {
    userChoices.push({
      name: key,
      amount: props.choice[key]
    });
  }

  const userChoice = userChoices.map(userChoice => (
    <li key={userChoice.name}>
      <strong>{userChoice.name}</strong>: {userChoice.amount}
    </li>
  ));

  return (
    <div className={classes.UserChoice}>
      <ul>{userChoice}</ul>
    </div>
  );
};

export default userChoices;
