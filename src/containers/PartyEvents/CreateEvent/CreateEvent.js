import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../../components/UI/Forms/Input/Input';
import classes from './CreateEvent.module.css';
import { checkValidity } from '../../../shared/checkValidity';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Aux from '../../../hoc/Auxillary/Auxillary';

export class CreateEvent extends Component {
  state = {
    controls: {
      title: {
        elementType: 'input',
        elementLabel: 'Event title',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter event title'
        },
        value: '',
        validators: {
          required: true
        },
        touched: false,
        valid: false
      },
      address: {
        elementType: 'input',
        elementLabel: 'Event address',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter address of the event'
        },
        value: '',
        validators: {
          required: true
        },
        touched: false,
        valid: false
      },
      date: {
        elementType: 'date-picker',
        elementLabel: 'Choose event date & time',
        elementConfig: {
          type: '',
          placeholder: 'Choose event date & time'
        },
        value: new Date(),
        startDate: new Date(),
        validators: {
          // required: true
        },
        touched: false,
        valid: false
      },
      description: {
        elementType: 'textarea',
        elementLabel: 'Event description',
        elementConfig: {
          type: 'textarea',
          placeholder: 'Enter address of the event',
          rows: 6,
          cols: 10
        },
        value: '',
        validators: {
          required: true
        },
        touched: false,
        valid: false
      }
    },
    formIsValid: false
  };

  componentDidMount() {
    if (!this.props.event) {
      this.props.onCreateEventInit();
    } else {
      this.parseEventAndAddToState();
    }
  }

  parseEventAndAddToState() {
    let updateControls = { ...this.state.controls };
    for (let key in this.state.controls) {
      if (key === 'date') {
        updateControls[key].value = new Date(this.props.event[key]);
        updateControls[key].valid = true;
      } else {
        updateControls[key].value = this.props.event[key];
        updateControls[key].valid = true;
      }
    }
    this.setState({ controls: updateControls, formIsValid: true});
  }

  inputChangedHanlder = (event, inputName) => {
    if (event === null) {
      return;
    }
    let updatedControls = {};
    if (event instanceof Date) {
      updatedControls = {
        ...this.state.controls,
        [inputName]: {
          ...this.state.controls[inputName],
          value: event,
          valid: checkValidity(
            event,
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
    if (!this.props.event) {
      const createEventDetails = {
        title: this.state.controls.title.value,
        address: this.state.controls.address.value,
        date: this.state.controls.date.value,
        description: this.state.controls.description.value,
        creatorId: localStorage.getItem('userId'),
        nickname: localStorage.getItem('nickname'),
        users: [
          {
            user: localStorage.getItem('userId'),
            foodChoices: [],
            drinkChoices: []
          }
        ]
      };
      this.props.onCreateEvent(createEventDetails);
    } else {
      const updateEventDetails = {
        title: this.state.controls.title.value,
        address: this.state.controls.address.value,
        date: this.state.controls.date.value,
        description: this.state.controls.description.value,
      }
      this.props.onUpdateEvent(this.props.event._id, updateEventDetails);
    }
    
  };

  OnAddIngsRedirect = eventId => {
    this.props.history.push('/events/create-event/add-ingredients', {
      eventId: eventId
    });
  };

  render() {
    let formElementArr = [];
    for (let el in this.state.controls) {
      formElementArr.push({
        inputName: el,
        properties: this.state.controls[el]
      });
    }

    let formElements = formElementArr.map(formEl => (
      <Input
        selected={this.state.controls.date.value}
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
      <div className={classes.CreateEventWrapper}>
        {this.props.event ? <h2>Update Event</h2> : <h2>Create Event</h2>}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Aux>
            <form onSubmit={this.onSubmitHandler}>
              {formElements}
              <Button btnType='Success' disabled={!this.state.formIsValid}>
                SUBMIT
              </Button>
            </form>
            {this.props.event ? (
              <Button
                btnType='Success'
                clicked={() => this.OnAddIngsRedirect(this.props.event)}
              >
                Add Ingredients
              </Button>
            ) : null}
          </Aux>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.createEvent.loading,
  event: state.createEvent.event,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateEvent: eventDetails => {
      dispatch(actions.createEvent(eventDetails));
    },
    onCreateEventInit: () => {
      dispatch(actions.createEventInit());
    },
    onUpdateEvent: (eventId, eventDetails) => {
      dispatch(actions.updateCreatedEvent(eventId, eventDetails));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent);
