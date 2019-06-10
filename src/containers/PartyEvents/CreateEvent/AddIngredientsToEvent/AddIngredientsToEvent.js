import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Input from "../../../../components/UI/Forms/Input/Input";
import Button from "../../../../components/UI/Button/Button";
import classes from "./AddIngredientsToEvent.module.css";
import { checkValidity } from "../../../../shared/checkValidity";

class AddIngredientsToEvent extends Component {
  state = {
    foodControls: [
      {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Add an ingredient"
        },
        value: "",
        validators: {
          required: true
        },
        touched: false,
        valid: false
      }
    ],
    drinkControls: [
      {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Add an ingredient"
        },
        value: "",
        validators: {
          required: true
        },
        touched: false,
        valid: false
      }
    ],
    additionalControls: [
      {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Add an ingredient"
        },
        value: "",
        validators: {
          required: true
        },
        touched: false,
        valid: false
      }
    ],
    formIsValid: false
  };

  componentDidMount() {}

  onAddInput = type => {
    const input = {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Add an ingredient"
      },
      value: "",
      validators: {
        required: true
      },
      touched: false,
      valid: false
    };

    switch (type) {
      case "foodControls":
        this.setState(prevState => ({
          foodControls: [...prevState.foodControls, input]
        }));
        break;

      case "drinkControls":
        this.setState(prevState => ({
          drinkControls: [...prevState.drinkControls, input]
        }));
        break;

      default:
        this.setState(prevState => ({
          additionalControls: [...prevState.additionalControls, input]
        }));
        break;
    }
  };

  inputChangedHanlder = (event, index, type) => {
    let updatedFoodControls = [...this.state.foodControls];
    let updatedDrinkControls = [...this.state.drinkControls];
    let updatedAdditionalControls = [...this.state.additionalControls];

    switch (type) {
      case "foodControls":
        updatedFoodControls = Object.assign([...this.state.foodControls], {
          [index]: {
            ...this.state.foodControls[index],
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              this.state.foodControls[index].validators
            ),
            touched: true
          }
        });
        break;
      case "drinkControls":
        updatedDrinkControls = Object.assign([...this.state.drinkControls], {
          [index]: {
            ...this.state.drinkControls[index],
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              this.state.drinkControls[index].validators
            ),
            touched: true
          }
        });
        break;
      default:
        updatedAdditionalControls = Object.assign(
          [...this.state.additionalControls],
          {
            [index]: {
              ...this.state.additionalControls[index],
              value: event.target.value,
              valid: checkValidity(
                event.target.value,
                this.state.additionalControls[index].validators
              ),
              touched: true
            }
          }
        );
        break;
    }

    let formIsValid = true;

    for (let inputIdentifire in updatedFoodControls) {
      formIsValid = updatedFoodControls[inputIdentifire].valid && formIsValid;
    }
    for (let inputIdentifire in updatedDrinkControls) {
      formIsValid = updatedDrinkControls[inputIdentifire].valid && formIsValid;
    }
    for (let inputIdentifire in updatedAdditionalControls) {
      formIsValid =
        updatedAdditionalControls[inputIdentifire].valid && formIsValid;
    }

    this.setState({
      foodControls: updatedFoodControls,
      drinkControls: updatedDrinkControls,
      additionalControls: updatedAdditionalControls,
      formIsValid: formIsValid
    });
  };

  onDeleteHandler = (index, type) => {
    let updatedFoodControls = [...this.state.foodControls];
    let updatedDrinkControls = [...this.state.drinkControls];
    let updatedAdditionalControls = [...this.state.additionalControls];
    switch (type) {
      case "foodControls":
        updatedFoodControls = [...this.state.foodControls];
        updatedFoodControls.splice(index, 1);
        break;

      case "drinkControls":
        updatedDrinkControls = [...this.state.drinkControls];
        updatedDrinkControls.splice(index, 1);
        break;

      default:
        updatedAdditionalControls = [...this.state.additionalControls];
        updatedAdditionalControls.splice(index, 1);
        break;
    }

    this.setState({
      foodControls: updatedFoodControls,
      drinkControls: updatedDrinkControls,
      additionalControls: updatedAdditionalControls
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const foodControlsInputs = [];
    this.state.foodControls.forEach(input => {
      foodControlsInputs.push(input.value.toLowerCase());
    });
    const drinkControlsInputs = [];
    this.state.drinkControls.forEach(input => {
      drinkControlsInputs.push(input.value.toLowerCase());
    });
    const additionalControlsInputs = [];
    this.state.additionalControls.forEach(input => {
      additionalControlsInputs.push(input.value.toLowerCase());
    });

    this.props.onAddIngredients(
      foodControlsInputs,
      drinkControlsInputs,
      additionalControlsInputs,
      this.props.createEvent._id
    );
  };

  render() {
    if (!this.props.createEvent) {
      return <Redirect to="" />;
    }
    const formFoodIngElements = this.state.foodControls.map((formEl, index) => (
      <div key={formEl.elementType + index} className={classes.InputWrapper}>
        <Input
          divStyle={["InputFieldWidth"]}
          className={classes.InputFieldWidth}
          inputType={formEl.elementType}
          elementConfig={formEl.elementConfig}
          value={formEl.value}
          changed={event =>
            this.inputChangedHanlder(event, index, "foodControls")
          }
          invalid={!formEl.valid}
          touched={formEl.touched}
          shouldValidate={formEl.validators}
        />
        <Button
          btnDivStyle={["RemoveDivButton"]}
          btnType="Remove"
          bType="button"
          clicked={() => this.onDeleteHandler(index, "foodControls")}
        >
          X
        </Button>
      </div>
    ));

    const formDrinkIngElements = this.state.drinkControls.map(
      (formEl, index) => (
        <div key={formEl.elementType + index} className={classes.InputWrapper}>
          <Input
            divStyle={["InputFieldWidth"]}
            className={classes.InputFieldWidth}
            inputType={formEl.elementType}
            elementConfig={formEl.elementConfig}
            value={formEl.value}
            changed={event =>
              this.inputChangedHanlder(event, index, "drinkControls")
            }
            invalid={!formEl.valid}
            touched={formEl.touched}
            shouldValidate={formEl.validators}
          />
          <Button
            btnDivStyle={["RemoveDivButton"]}
            btnType="Remove"
            bType="button"
            clicked={() => this.onDeleteHandler(index, "dringControls")}
          >
            X
          </Button>
        </div>
      )
    );

    const formAddintionalElements = this.state.additionalControls.map(
      (formEl, index) => (
        <div key={formEl.elementType + index} className={classes.InputWrapper}>
          <Input
            divStyle={["InputFieldWidth"]}
            className={classes.InputFieldWidth}
            inputType={formEl.elementType}
            elementConfig={formEl.elementConfig}
            value={formEl.value}
            changed={event => this.inputChangedHanlder(event, index)}
            invalid={!formEl.valid}
            touched={formEl.touched}
            shouldValidate={formEl.validators}
          />
          <Button
            btnDivStyle={["RemoveDivButton"]}
            btnType="Remove"
            bType="button"
            clicked={() => this.onDeleteHandler(index)}
          >
            X
          </Button>
        </div>
      )
    );
    return (
      <div className={classes.AddIngsWrapper}>
        <h2>Add foodingredients</h2>
        <form onSubmit={this.onSubmitHandler}>
          {formFoodIngElements}
          <Button
            btnType="Success"
            bType="button"
            clicked={() => this.onAddInput("foodControls")}
          >
            Add Ingredient
          </Button>
          <h2>Add drink items</h2>
          {formDrinkIngElements}
          <Button
            btnType="Success"
            bType="button"
            clicked={() => this.onAddInput("drinkControls")}
          >
            Add Ingredient
          </Button>
          <h2>Add additional items</h2>
          {formAddintionalElements}
          <Button btnType="Success" bType="button" clicked={this.onAddInput}>
            Add Ingredient
          </Button>
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createEvent: state.createEvent.event
});

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (foodInputs, drinkInputs, additionalInputs, eventId) =>
      dispatch(actions.addIngredients(foodInputs, drinkInputs, additionalInputs, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientsToEvent);
