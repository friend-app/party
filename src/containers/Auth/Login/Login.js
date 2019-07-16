import React, { Component } from 'react';
// import Input from "../../../components/UI/Forms/Input/Input";
import Input from '@material-ui/core/Input';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Login.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../../shared/checkValidity';
import Button from '../../../components/UI/Button/Button';

import * as actions from '../../../store/actions/index';

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementLabel: 'Your Email',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validators: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: true
      },
      password: {
        elementType: 'input',
        elementLabel: 'Your Password',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validators: {
          required: true,
          minLength: 5,
          maxLength: 12
        },
        touched: false,
        valid: true
      }
    },
    formIsValid: false
  };

  componentDidMount(){

  }

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
    this.props.onLogin(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    let redirect = null;
    console.log(this.state.controls.email);
    if (this.props.isAuth && localStorage.getItem('eventCode')) {
      redirect = (
        <Redirect
          to={
            '/events/addUserToEvent?eventCode=' +
            localStorage.getItem('eventCode')
          }
        />
      );
    }
    if (this.props.isAuth && !localStorage.getItem('eventCode')) {
      redirect = <Redirect to={'/events'} />;
    }

    if (this.props.message) {
      // alert(this.props.message);
    }

    let formElementArr = [];
    for (let el in this.state.controls) {
      formElementArr.push({
        inputName: el,
        properties: this.state.controls[el]
      });
    }

    let formElements = formElementArr.map(formEl => (
      <div key={formEl.inputName}>
        <label>{formEl.properties.elementLabel}</label>
        <Input
          inputComponent={formEl.properties.elementType}
          inputProps={formEl.properties.elementConfig}
          autoFocus={formEl.properties.elementConfig.type === 'email'}
          error={!formEl.properties.valid}
          onChange={event => this.inputChangedHanlder(event, formEl.inputName)}
          fullWidth={true}
          // invalid={!formEl.properties.valid}
          // touched={formEl.properties.touched}
          // shouldValidate={formEl.properties.validators}
        />
      </div>

      // <Input
      //   key={formEl.inputName}
      //   label={formEl.properties.elementLabel}
      // inputType={formEl.properties.elementType}
      // elementConfig={formEl.properties.elementConfig}
      // value={formEl.properties.value}
      // error={true}
      // onChange={event => this.inputChangedHanlder(event, formEl.inputName)}
      // invalid={!formEl.properties.valid}
      // touched={formEl.properties.touched}
      // shouldValidate={formEl.properties.validators}
      // />
    ));

    return (
      <div className={classes.LoginWrapper}>
        {redirect}
        <h1>Login</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmitHandler}>
            {formElements}
            <Button btnType='Success' disabled={!this.state.formIsValid}>
              SUBMIT
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  message: state.auth.message,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
