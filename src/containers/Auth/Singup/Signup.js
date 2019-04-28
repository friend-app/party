import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import classes from './Signup.module.css';

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementLabel: 'Your Email',
        elementConfig: {
          type: 'email',
          placeholder: 'Please enter your email'
        },
        value: '',
        validators: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        elementType: 'input',
        elementLabel: 'Your Password',
        elementConfig: {
          type: 'password',
          placeholder: 'Please enter your password'
        },
        value: '',
        validators: {
          required: true,
          minLength: 5,
          maxLength: 12
        },
        touched: false,
        valid: false
      },
      name: {
        elementType: 'input',
        elementLabel: 'Your Name',
        elementConfig: {
          type: 'password',
          placeholder: 'Please enter your name'
        },
        value: '',
        validators: {
          required: true,
          minLength: 2,
          maxLength: 45
        },
        touched: false,
        valid: false
      }
    },
    formValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }


    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHanlder = (event, inputName) => {
    const updatedControls = {
      ...this.state.controls,
      [inputName]: {
        ...this.state.controls[inputName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputName].validators
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    console.log(this.state.controls)
    let formElementArr = [];
    for (let el in this.state.controls) {
      formElementArr.push({
        inputName: el,
        properties: this.state.controls[el]
      });
    }

    let formElements = formElementArr.map(formEl => (
      <Input
        key={formEl.inputName}
        label={formEl.properties.elementLabel}
        inputType={formEl.properties.elementType}
        elementConfig={formEl.properties.elementConfig}
        value={formEl.properties.value}
        changed={event => this.inputChangedHanlder(event, formEl.inputName)}
        invalid={!formEl.properties.valid}
        touched={formEl.properties.touched}
        shouldValidate={formEl.properties.validators}
      />
    ));

    return (
      <div className={classes.SignupWrapper}>
        <h1>Login</h1>
        <form>{formElements}</form>
      </div>
    );
  }
}

export default Signup;
