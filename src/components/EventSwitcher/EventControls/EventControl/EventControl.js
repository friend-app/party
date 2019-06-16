import React from 'react';
import classes from './EventControl.module.css';

const EventControl = props => {
  return (
    <div className={classes.EventControl}>

      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        -
      </button>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.More} onClick={props.added}>
        +
      </button>
    </div>
  );
};

export default EventControl;
