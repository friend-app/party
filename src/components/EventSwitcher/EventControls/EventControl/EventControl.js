
import React from 'react';
import classes from './EventControl.module.css';

const EventControl = props => (
    <div className={classes.EventControlWrapper}>

      <div className={classes.Label}>{props.label}</div>
      <span className={classes.Spacer}></span>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        <span> - </span>
      </button>
      <div className={classes.Count}>{props.chosenIngs}</div>
      <button className={classes.More} onClick={props.added}>
        <span> + </span>
      </button>

    </div>
  );

export default EventControl;
