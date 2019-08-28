import React from 'react';
import classes from './EveryUserChoiceItem.module.css';

const EveryUserChoiceItem = props => {
  return (
    <div className={classes.EveryUserChoiceItemWrapper}>
      <span>{props.ing}</span>
      <span> {props.amount}</span>
    </div>
  );
};

export default EveryUserChoiceItem;
