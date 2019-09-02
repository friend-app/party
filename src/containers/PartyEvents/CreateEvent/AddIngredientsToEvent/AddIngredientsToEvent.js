import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '../../../../components/UI/Button/Button';
import classes from './AddIngredientsToEvent.module.css';
import { checkValidity } from '../../../../shared/checkValidity';
import foodImg from '../../../../assests/food.png';
import drinkImg from '../../../../assests/alcohol.png';
import AdditionalImg from '../../../../assests/additional.png';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class AddIngredientsToEvent extends Component {
  state = {
    foodControls: [
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
    drinkControls: [
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
    additionalControls: [
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

    componentDidMount() {
      if ( !localStorage.getItem('token')) {
        this.props.history.push({
          pathname: "/login"
        });
      } if(!localStorage.getItem('eventId')){
        this.props.history.push({
          pathname: "/events"
        });
      } 
    }

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

    switch (type) {
      case 'foodControls':
        this.setState(prevState => ({
          foodControls: [...prevState.foodControls, input]
        }));
        break;

      case 'drinkControls':
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
      case 'foodControls':
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
      case 'drinkControls':
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
      case 'foodControls':
        updatedFoodControls = [...this.state.foodControls];
        updatedFoodControls.splice(index, 1);
        break;

      case 'drinkControls':
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
    console.log(this.state.controls);
    if (!this.props.createEvent) {
      return <Redirect to='' />;
    }

    const formFoodIngElements = this.state.foodControls.map((formEl, index) => (
      <div key={formEl.elementType + index} className={classes.InputWrapper}>
        <Input
          className={classes.InputField}
          inputComponent={formEl.elementType}
          inputProps={formEl.elementConfig}
          value={formEl.value}
          onChange={event =>
            this.inputChangedHanlder(event, index, 'foodControls')
          }
          error={!formEl.valid && formEl.touched}
          fullWidth={true}
        />
        <Button
          btnDivStyle={['RemoveDivButton']}
          bType='button'
          clicked={() => this.onDeleteHandler(index, 'foodControls')}
        >
          +
        </Button>
      </div>
    ));

    const formDrinkIngElements = this.state.drinkControls.map(
      (formEl, index) => (
        <div key={formEl.elementType + index} className={classes.InputWrapper}>
          <Input
            className={classes.InputField}
            inputComponent={formEl.elementType}
            inputProps={formEl.elementConfig}
            value={formEl.value}
            onChange={event =>
              this.inputChangedHanlder(event, index, 'drinkControls')
            }
            error={!formEl.valid && formEl.touched}
            fullWidth={true}
          />
          <Button
            btnDivStyle={['RemoveDivButton']}
            bType='button'
            clicked={() => this.onDeleteHandler(index, 'drinkControls')}
          >
            +
          </Button>
        </div>
      )
    );
    const formAddintionalElements = this.state.additionalControls.map(
      (formEl, index) => (
        <div key={formEl.elementType + index} className={classes.InputWrapper}>
          <Input
            className={classes.InputField}
            inputComponent={formEl.elementType}
            inputProps={formEl.elementConfig}
            value={formEl.value}
            onChange={event => this.inputChangedHanlder(event, index)}
            error={!formEl.valid && formEl.touched}
            fullWidth={true}
          />
          <Button
            btnDivStyle={['RemoveDivButton']}
            bType='button'
            clicked={() => this.onDeleteHandler(index)}
          >
            +
          </Button>
        </div>
      )
    );

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.onSubmitHandler}>
          <div className={classes.AddIngsWrapper}>
            <div className={classes.Title}>
              <img src={foodImg} alt='foodIncon' />
              <span className={classes.FoodTitle}>Main Couse</span>
            </div>

            {formFoodIngElements}
            <div
              className={classes.AddIngBox}
              onClick={() => this.onAddInput('foodControls')}
            >
              <span className={classes.AddPlus}>+</span>
              <span>ADD INGREDIENT</span>
            </div>
          </div>
          <div className={classes.AddIngsWrapper}>
            <div className={classes.Title}>
              <img src={drinkImg} alt='foodIncon' />
              <span className={classes.DrinkTitle}>Alcohol & Drinks</span>
            </div>
            {formDrinkIngElements}
            <div
              className={classes.AddIngBox}
              onClick={() => this.onAddInput('drinkControls')}
            >
              <span className={classes.AddPlus}>+</span>
              <span>ADD INGREDIENT</span>
            </div>
          </div>
          <div className={classes.AddIngsWrapper}>
            <div className={classes.Title}>
              <img src={AdditionalImg} alt='foodIncon' />
              <span className={classes.AddTitle}>Additional</span>
            </div>
            {formAddintionalElements}
            <div
              className={classes.AddIngBox}
              onClick={() => this.onAddInput('additionalControls')}
            >
              <span className={classes.AddPlus}>+</span>
              <span>ADD INGREDIENT</span>
            </div>
          </div>
          <Button btnType='AddSubmit' disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
      );
    }

    return <div>{form}</div>;
  }
}

const mapStateToProps = state => ({
  createEvent: state.createEvent.event,
  loading: state.createEvent.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (foodInputs, drinkInputs, additionalInputs, eventId) =>
      dispatch(
        actions.addIngredients(
          foodInputs,
          drinkInputs,
          additionalInputs,
          eventId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIngredientsToEvent);
