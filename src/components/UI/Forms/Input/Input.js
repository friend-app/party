import React from 'react';
import classes from './Input.module.css';
import DateTimePicker from 'react-datetime-picker';

const Input = props => {
  let inputElement = null;

  let inputClasses = [classes.InputElement];

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

    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;

    case 'date-picker':
      inputElement = (
        <DateTimePicker
          onChange={props.changed}
          value={props.value}
          clearIcon={null}
          minDate={new Date()}
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
    <div className={[classes[props.divStyle]].join(' ')}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
