import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Input from '../../../../components/UI/Forms/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import classes from './AddIngredientsToEvent.module.css';
import { checkValidity } from '../../../../shared/checkValidity';

class AddIngredientsToEvent extends Component {
  state = {
    controls: [
      {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Add an ingredient'
        },
        value: '',
        validators: {
          required: true
        },
        touched: false,
        valid: false
      }
    ],
    formIsValid: false
  };

  onAddInput = () => {
    const input = {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Add an ingredient'
      },
      value: '',
      validators: {
        required: true
      },
      touched: false,
      valid: false
    };

    this.setState(prevState => ({
      controls: [...prevState.controls, input]
    }));
  };

  inputChangedHanlder = (event, index) => {
    // const updatedControls = Object.assign([...this.state.controls], {
    //   [index]: {
    //     ...this.state.controls[index],
    //     value: event.target.value,
    //     valid: checkValidity(
    //       event.target.value,
    //       this.state.controls[index].validators
    //     ),
    //     touched: true
    //   }
    // });
    const updatedControls = Object.assign([...this.state.controls], {
      [index]: {
        ...this.state.controls[index],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[index].validators
        ),
        touched: true
      }
    });

    console.log(updatedControls);

    console.log(this.state.controls);


    let formIsValid = true;

    for (let inputIdentifire in updatedControls) {
      formIsValid = updatedControls[inputIdentifire].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  onDeleteHandler = index => {
    const updatedControls = [...this.state.controls];
    updatedControls.splice(index, 1);
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const inputs = [];
    this.state.controls.forEach(input => {
      inputs.push(input.value);
    });
    this.props.onAddIngredients(inputs);
  };

  render() {
    const formElements = this.state.controls.map((formEl, index) => (
      <div key={formEl.elementType + index} className={classes.InputWrapper}>
        <Input
          divStyle={['InputFieldWidth']}
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
          btnDivStyle={['RemoveDivButton']}
          btnType='Remove'
          bType='button'
          clicked={() => this.onDeleteHandler(index)}
        >
          X
        </Button>
      </div>
    ));
    return (
      <div className={classes.AddIngsWrapper}>
        <h2>I'm Add Ingredients Page</h2>
        <form onSubmit={this.onSubmitHandler}>
          {formElements}
          <Button btnType='Success' bType='button' clicked={this.onAddInput}>
            Add Ingredient
          </Button>
          <Button btnType='Success' disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.createEvent.event
});

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingredients =>
      dispatch(actions.addIngredients(ingredients))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientsToEvent);
