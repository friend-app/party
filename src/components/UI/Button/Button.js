import React from 'react';
import classes from './Button.module.css';

const Button = props => {
  const type = props.bType ? props.bType : 'submit';
  return (
    <div className={[classes[props.btnDivStyle]].join(' ')}>
      <button
        type={type}
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
