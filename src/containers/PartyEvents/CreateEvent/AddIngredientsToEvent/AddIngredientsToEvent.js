import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    additionalItems: [
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

  componentDidMount() {}

  onAddInput = type => {
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

    if (type === 'ingredients') {
      this.setState(prevState => ({
        controls: [...prevState.controls, input]
      }));
    } else {
      this.setState(prevState => ({
        additionalItems: [...prevState.additionalItems, input]
      }));
    }
  };

  inputChangedHanlder = (event, index, type) => {
    let updatedControls = [...this.state.controls];
    let updatedAdditionsItems = [...this.state.additionalItems];
    if (type === 'ingredients') {
      updatedControls = Object.assign([...this.state.controls], {
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
    } else {
      updatedAdditionsItems = Object.assign([...this.state.additionalItems], {
        [index]: {
          ...this.state.additionalItems[index],
          value: event.target.value,
          valid: checkValidity(
            event.target.value,
            this.state.additionalItems[index].validators
          ),
          touched: true
        }
      });
    }

    let formIsValid = true;

    for (let inputIdentifire in updatedControls) {
      formIsValid = updatedControls[inputIdentifire].valid && formIsValid;
    }
    for (let inputIdentifire in updatedAdditionsItems) {
      formIsValid = updatedAdditionsItems[inputIdentifire].valid && formIsValid;
    }

    this.setState({
      controls: updatedControls,
      additionalItems: updatedAdditionsItems,
      formIsValid: formIsValid
    });
  };

  onDeleteHandler = (index, type) => {
    let updatedControls = [...this.state.controls];
    let updatedAdditionsItems = [...this.state.additionalItems];
    if (type === 'ingredients') {
      updatedControls = [...this.state.controls];
      updatedControls.splice(index, 1);
    } else {
      updatedAdditionsItems = [...this.state.additionalItems];
      updatedAdditionsItems.splice(index, 1);
    }

    this.setState({ controls: updatedControls, additionalItems: updatedAdditionsItems });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const controlInputs = [];
    this.state.controls.forEach(input => {
      controlInputs.push(input.value.toLowerCase());
    });
    const additionalInputs = [];
    this.state.additionalItems.forEach(input => {
      additionalInputs.push(input.value.toLowerCase());
    });

    this.props.onAddIngredients(controlInputs, additionalInputs, this.props.createEvent._id);
  };

  render() {
    if (!this.props.createEvent) {
      return <Redirect to='' />;
    }
    const formIngElements = this.state.controls.map((formEl, index) => (
      <div key={formEl.elementType + index} className={classes.InputWrapper}>
        <Input
          divStyle={['InputFieldWidth']}
          className={classes.InputFieldWidth}
          inputType={formEl.elementType}
          elementConfig={formEl.elementConfig}
          value={formEl.value}
          changed={event => this.inputChangedHanlder(event, index, 'ingredients')}
          invalid={!formEl.valid}
          touched={formEl.touched}
          shouldValidate={formEl.validators}
        />
        <Button
          btnDivStyle={['RemoveDivButton']}
          btnType='Remove'
          bType='button'
          clicked={() => this.onDeleteHandler(index, 'ingredients')}
        >
          X
        </Button>
      </div>
    ));

    const formAddintionsElements = this.state.additionalItems.map((formEl, index) => (
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
        <h2>Add ingredients</h2>
        <form onSubmit={this.onSubmitHandler}>
          {formIngElements}
          <Button btnType='Success' bType='button' clicked={() => this.onAddInput('ingredients')}>
            Add Ingredient
          </Button>
          <h2>Add additional items</h2>
          {formAddintionsElements}
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
  createEvent: state.createEvent.event
});

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ingredients, additionalInputs, eventId) =>
      dispatch(actions.addIngredients(ingredients, additionalInputs, eventId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientsToEvent);
