import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;

  let inputClasses = [classes.InputElement];

  // console.log(props.invalid, typeof(props.shouldValidate), props.touched);

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.inputType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;

    default: {
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
    }
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
