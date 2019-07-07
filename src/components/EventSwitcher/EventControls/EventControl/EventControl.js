import React from 'react';
import classes from './EventControl.module.css';

const EventControl = props => {
  return (
    <div className={classes.EventControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        -
      </button>
      <p>{props.chosenIngs}</p>
      <button className={classes.More} onClick={props.added}>
        +
      </button>
    </div>
  );
};

export default EventControl;
