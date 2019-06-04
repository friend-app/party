import React from 'react';
import classes from './userChoiceCard.module.css';

const userChoiceCard = props => {
  let choices = [];

  for (let key in props.choice) {
    choices.push({ name: key, amount: props.choice[key] });
  }

  const ingredient = choices.map((choice, index) => (
      <h2 key={index}>
        <strong>
          {choice.name}: {choice.amount}
        </strong>
      </h2>
  ));

  return (
    <div className={classes.userChoiceCardWrapper}>
      <h3>User Name: {props.userName}</h3>
      {ingredient}
    </div>
  );
};

export default userChoiceCard;
