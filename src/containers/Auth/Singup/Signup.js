import React, { Component } from 'react';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Signup.module.css';
import { checkValidity } from '../../../shared/checkValidity';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';

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
          type: 'text',
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
    formIsValid: false
  };

  inputChangedHanlder = (event, inputName) => {
    const updatedControls = {
      ...this.state.controls,
      [inputName]: {
        ...this.state.controls[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputName].validators
        ),
        touched: true
      }
    };

    let formIsValid = true;

    for (let inputIdentifire in updatedControls) {
      formIsValid = updatedControls[inputIdentifire].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSignup(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.name.value,
    );
  };

  render() {

    const redirect = this.props.isAuth ? <Redirect to="/" /> : null;

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
      {redirect}
        <h1>Signup</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmitHandler}>
            {formElements}
            <Button btnType='Success' disabled={!this.state.formIsValid}>SUBMIT</Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.fakeToken !== null
})

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password, name) => dispatch(actions.signup(email, password, name))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
