import React from 'react';
import classes from './userChoiceCard.module.css';

const userChoiceCard = props => {
  let choices = [];

  for (let key in props.choiceIngs) {
    choices.push({ name: key, amount: props.choiceIngs[key] });
  }

  const ingredient = choices.map((choice, index) => (
      <h2 key={index}>
        <strong>
          {choice.name}: {choice.amount}
        </strong>
      </h2>
  ));

  return (
    <div className={classes.userChoiceCardWrapper} onClick={() => props.clicked(props.choice)}>
      <h3>User Name: {props.userName}</h3>
      {ingredient}
    </div>
  );
};

export default userChoiceCard;
