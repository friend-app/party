import React from 'react';
import classes from './EveryUserChoiceItem.module.css';

const EveryUserChoiceItem = props => {
  return (
    <div className={classes.EveryUserChoiceItemWrapper}>
      <span className={classes.Title}>{props.ing}</span>
      <span> {props.amount}</span>
    </div>
  );
};

export default EveryUserChoiceItem;
