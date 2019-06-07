import React from 'react';
import classes from './userChoiceCard.module.css';
import Button from '../../../UI/Button/Button';

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
    <div className={classes.userChoiceCardWrapper}>
      <h3>User Name: {props.userName}</h3>
      <Button btnType="Success" clicked={() => props.clicked(props.choice, props.choiceLocationId)}>Edit Me</Button>
      {ingredient}
      <Button btnType="Danger" clicked={() => props.onDelete(props.choiceLocationId, props.choice._id)}>Delete Me</Button>
    </div>
  );
};

export default userChoiceCard;
