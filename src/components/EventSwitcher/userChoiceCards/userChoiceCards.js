import React from 'react';
import UserChoiceCard from './userChoiceCard/userChoiceCard';
import classes from './userChoiceCards.module.css';

const userChoiceCards = props => {
  // console.log(props.user);
  const card = props.user[props.choiceType].map((singleChoice, index) => {
    // console.log(singleChoice)
    return (
    <UserChoiceCard
      key={index}
      choiceIngs={singleChoice.choice}
      userName={props.user.user.nickname}
      onUpdate={props.clicked}
      choice={singleChoice}
      choiceLocationId={props.user._id}
      onDelete={props.onDelete}
      type={props.choiceType}
    />)
});
  return (
    <div className={classes.UserChoiceCardsWrapper}>
      {card}
    </div>
  );
};

export default userChoiceCards;
