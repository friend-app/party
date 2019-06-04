import React from 'react';
import UserChoiceCard from './userChoiceCard/userChoiceCard';
import classes from './userChoiceCards.module.css';

const userChoiceCards = (props) => {
  const card = props.user.userChoices.map((singleChoice, index) => (
    <UserChoiceCard key={index} choice={singleChoice.choice} userName={props.user.user.nickname} />
  ));
  return (
    <div className={classes.UserChoiceCardsWrapper}>
      <h3>First Choice card</h3>
      {card}
    </div>
  )
}

export default userChoiceCards
