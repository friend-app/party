import React, { Component } from "react";
// import Input from "../../../components/UI/Forms/Input/Input";
import Input from "@material-ui/core/Input";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Signup.module.css";
import { checkValidity } from "../../../shared/checkValidity";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import * as actions from "../../../store/actions/index";

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementLabel: "Your Email",
        elementConfig: {
          type: "email",
          placeholder: "Please enter your email"
        },
        value: "",
        validators: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        elementType: "input",
        elementLabel: "Your Password",
        elementConfig: {
          type: "password",
          placeholder: "Please enter your password"
        },
        value: "",
        validators: {
          required: true,
          minLength: 5,
          maxLength: 12
        },
        touched: false,
        valid: false
      },
      name: {
        elementType: "input",
        elementLabel: "Your Name",
        elementConfig: {
          type: "text",
          placeholder: "Please enter your name"
        },
        value: "",
        validators: {
          required: true,
          minLength: 3,
          maxLength: 45
        },
        touched: false,
        valid: false
      },
      file: {
        elementType: "input",
        elementLabel: "upload Image",
        elementConfig: {
          type: "File",
          placeholder: ""
        },
        value: "",
        tempUrl: null,
        validators: {
          required: true,
          fileSize: 1500000
        },
        touched: false,
        valid: false
      }
    },
    formIsValid: false
  };

  inputChangedHanlder = (event, inputName) => {
    let updatedControls;
    if (event.target.files) {
      updatedControls = {
        ...this.state.controls,
        [inputName]: {
          ...this.state.controls[inputName],
          value: event.target.files[0],
          tempUrl: URL.createObjectURL(event.target.files[0]),
          valid: checkValidity(
            event.target.files[0],
            this.state.controls[inputName].validators
          ),
          touched: true
        }
      };
    } else {
      updatedControls = {
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
    }

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
      this.state.controls.file.value
    );
  };

  render() {
    console.log(this.state.controls.file);
    let redirect = null;

    if (this.props.isAuth && localStorage.getItem("eventCode")) {
      redirect = (
        <Redirect
          to={
            "/events/addUserToEvent?eventCode=" +
            localStorage.getItem("eventCode")
          }
        />
      );
    }
    if (this.props.isAuth && !localStorage.getItem("eventCode")) {
      redirect = <Redirect to="/events" />;
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
          autoFocus={formEl.properties.elementConfig.type === "email"}
          error={!formEl.properties.valid && formEl.properties.touched}
          onChange={event => this.inputChangedHanlder(event, formEl.inputName)}
          fullWidth={true}
          accept={
            formEl.properties.elementConfig.type === "File" ? "image/*" : null
          }
          multipart={
            formEl.properties.elementConfig.type === "File" ? "true" : null
          }
          style={
            formEl.properties.elementConfig.type === "File"
              ? { display: "none" }
              : null
          }
          inputRef={
            formEl.properties.elementConfig.type === "File"
              ? input => (this.fileInput = input)
              : null
          }
          // invalid={!formEl.properties.valid}
          // touched={formEl.properties.touched}
          // shouldValidate={formEl.properties.validators}
        />
        {formEl.properties.elementConfig.type === "File" ? (
          <p onClick={() => this.fileInput.click()}>Upload File</p>
        ) : (
          ""
        )}
      </div>

      // <Input
      //   key={formEl.inputName}
      //   label={formEl.properties.elementLabel}
      //   inputType={formEl.properties.elementType}
      //   elementConfig={formEl.properties.elementConfig}
      //   value={formEl.properties.value}
      //   changed={event => this.inputChangedHanlder(event, formEl.inputName)}
      //   invalid={!formEl.properties.valid}
      //   touched={formEl.properties.touched}
      //   shouldValidate={formEl.properties.validators}
      // />
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
            <img src={this.state.controls.file.tempUrl} />
            <Button btnType="AuthSubmit" disabled={!this.state.formIsValid}>
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
    onSignup: (email, password, name, image) =>
      dispatch(actions.signup(email, password, name, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
