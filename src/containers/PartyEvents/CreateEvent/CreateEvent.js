import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Input from "../../../components/UI/Forms/Input/Input";
import InputUI from "@material-ui/core/Input";
import classes from "./CreateEvent.module.css";
import { checkValidity } from "../../../shared/checkValidity";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Auxillary/Auxillary";
import addPhotoImg from "../../../assests/addPhoto.png";

export class CreateEvent extends Component {
  state = {
    controls: {
      title: {
        elementType: "input",
        elementLabel: "Event title",
        elementConfig: {
          type: "text",
          placeholder: "Enter event title"
        },
        value: "",
        validators: {
          required: true
        },
        touched: false,
        valid: false
      },
      address: {
        elementType: "input",
        elementLabel: "Event address",
        elementConfig: {
          type: "text",
          placeholder: "Enter address of the event"
        },
        value: "",
        validators: {
          required: true
        },
        touched: false,
        valid: false
      },
      date: {
        elementType: "date-picker",
        elementLabel: "Choose event date & time",
        elementConfig: {
          type: "",
          placeholder: "Choose event date & time"
        },
        value: new Date(),
        startDate: new Date(),
        validators: {
          // required: true
        },
        touched: false,
        valid: false
      },
      file: {
        elementType: "input",
        elementLabel: "",
        elementConfig: {
          type: "File",
          placeholder: ""
        },
        value: "",
        tempUrl: null,
        validators: {
          fileSize: 1500000
        },
        touched: false,
        valid: true
      },
      description: {
        elementType: "textarea",
        elementLabel: "Event description",
        elementConfig: {
          type: "textarea",
          placeholder: "Enter address of the event",
          rows: 6,
          cols: 10
        },
        value: "",
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
    this.props.onSingleEventReset();
    if (!this.props.event) {
      this.props.onCreateEventInit();
    } else {
      this.parseEventAndAddToState();
    }
    document.body.style = { backgroundColor: "blue !important" };
  }

  parseEventAndAddToState() {
    let updateControls = { ...this.state.controls };
    for (let key in this.state.controls) {
      if (key === "date") {
        updateControls[key].value = new Date(this.props.event[key]);
        updateControls[key].valid = true;
      } else {
        updateControls[key].value = this.props.event[key];
        updateControls[key].valid = true;
      }
    }
    this.setState({ controls: updateControls, formIsValid: true });
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
    } else if (event.target.files) {
      updatedControls = {
        ...this.state.controls,
        [inputName]: {
          ...this.state.controls[inputName],
          value: event.target.files[0],
          tempUrl: event.target.files[0]
            ? URL.createObjectURL(event.target.files[0])
            : null,
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
    if (!this.props.event) {
      const image = this.state.controls.file.value;
      const createEventDetails = {
        title: this.state.controls.title.value,
        address: this.state.controls.address.value,
        date: this.state.controls.date.value,
        description: this.state.controls.description.value,
        creatorId: localStorage.getItem("userId"),
        nickname: localStorage.getItem("nickname"),
        users: [
          {
            user: localStorage.getItem("userId"),
            foodChoices: [],
            drinksChoices: []
          }
        ]
      };
      this.props.onCreateEvent(createEventDetails, image);
    } else {
      const updateEventDetails = {
        title: this.state.controls.title.value,
        address: this.state.controls.address.value,
        date: this.state.controls.date.value,
        description: this.state.controls.description.value,
        image: this.state.controls.file.value
      };
      this.props.onUpdateEvent(this.props.event._id, updateEventDetails);
    }
  };

  OnAddIngsRedirect = eventId => {
    this.props.history.push("/events/create-event/add-ingredients", {
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

    let formElements = formElementArr.map(formEl => {
      if (formEl.inputName === "date") {
        return (
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
        );
      } else {
        return (
          <div key={formEl.inputName}>
            <label>{formEl.properties.elementLabel}</label>
            <InputUI
              inputComponent={formEl.properties.elementType}
              inputProps={formEl.properties.elementConfig}
              autoFocus={formEl.properties.elementLavel === "input"}
              error={!formEl.properties.valid && formEl.properties.touched}
              onChange={event =>
                this.inputChangedHanlder(event, formEl.inputName)
              }
              fullWidth={true}
              accept={
                formEl.properties.elementConfig.type === "File"
                  ? "image/*"
                  : null
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
            />
            {formEl.properties.elementConfig.type === "File" ? (
              <div
                className={classes.AddFileBox}
                onClick={() => this.fileInput.click()}
              >
                <img src={addPhotoImg} alt="addIcon" />
                {!this.state.controls.file.value ? (
                  <p>No Photo Chosen</p>
                ) : (
                  <p>Choose Another Photo</p>
                )}
              </div>
            ) : null}
          </div>
        );
      }
    });
    return (
      <div className={classes.CreateEventWrapper}>
        {this.props.event ? <h3>Update Event</h3> : <h3>Create Event</h3>}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Aux>
            <form onSubmit={this.onSubmitHandler}>
              {formElements}
              <div className={classes.Image}>
                {this.state.controls.file.tempUrl ? (
                  <img src={this.state.controls.file.tempUrl} alt="icon" />
                ) : null}
              </div>
              <Button btnType="CreateSubmit" disabled={!this.state.formIsValid}>
                SUBMIT
              </Button>
            </form>
            {this.props.event ? (
              <Button
                btnType="AddIngredient"
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
    onCreateEvent: (eventDetails, image) => {
      dispatch(actions.createEvent(eventDetails, image));
    },
    onCreateEventInit: () => {
      dispatch(actions.createEventInit());
    },
    onUpdateEvent: (eventId, eventDetails, image) => {
      dispatch(actions.updateCreatedEvent(eventId, eventDetails, image));
    },
    onSingleEventReset: () => dispatch(actions.singleEventReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent);
