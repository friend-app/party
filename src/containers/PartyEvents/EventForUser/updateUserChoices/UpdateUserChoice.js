import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './UpdateUserChoice.module.css';
import * as actions from '../../../../store/actions/index';
import InsideUserMenu from '../../../../hoc/InsideUserMenu/InsideUserMenu';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import EventControls from '../../../../components/EventSwitcher/EventControls/EventControls';
import Button from '../../../../components/UI/Button/Button';

class UpdateUserChoice extends Component {
  state = {
    editMode: false,
    event: null
  };

  componentDidMount() {
    if (!this.props.location.state && this.state.editMode === false) {
      this.props.history.push({
        pathname: '/events/eventForUser/userChoicesCards'
      });
    }
    if (this.state.event !== null && this.props.location.state && this.state.editMode === true) {
      this.props.onUpdateUserChoiceInit(
        this.props.location.state.type,
        this.props.location.state.userChoice.choice,
        this.props.event
      );
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.event !== state.event) {
      return {
        event: props.event,
        editMode: true
      };
    }
    return null;
  }

  onSubmitHandler = () => {
    const ings = { ...this.props[this.props.location.state.type] };
    for (let key in ings) {
      if (ings[key] === 0) {
        delete ings[key];
      }
    }

    const userWithChoices = this.props.event.users.find(
      user => user._id === this.props.location.state.choiceLocationId
    );
    const userChoices = JSON.parse(
      JSON.stringify(userWithChoices[this.props.location.state.choiceType])
    );
    userChoices.map(singleChoice => {
      if (singleChoice._id === this.props.location.state.userChoice._id) {
        singleChoice.choice = ings;
      }
      return singleChoice;
    });

    const updatedUserChoices = userChoices.filter(
      singleChoice => Object.keys(singleChoice.choice).length !== 0
    );

    this.props.onUpdateUserChoice(
      updatedUserChoices,
      this.props.location.state.choiceType,
      this.props.location.state.choiceLocationId,
      this.props.event._id
    );

    this.setState({ editMode: false });
  };

  render() {
    const redirect = !this.state.editMode ? (
      <Redirect to='/events/eventForUser/userChoicesCards' />
    ) : null;
    let disabledMin = null;
    if (typeof this.props.location.state !== 'undefined') {
      disabledMin = {
        ...this.props[this.props.location.state.type]
      };

      for (let key in this.props[this.props.location.state.type]) {
        disabledMin[key] = disabledMin[key] <= 0;
      }
    }
    let event = <Spinner />;
    if (this.state.event) {
      event = (
        <div className={classes.EventWrapper} onClick={this.props.clicked}>
          <EventControls
            chosenIngs={this.props[this.props.location.state.type]}
            controls={this.props.event[this.props.location.state.type]}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledMin}
          />
          <Button
            btnType='SubmitUserChoice'
            disabled=''
            clicked={this.onSubmitHandler}
          >
            Submit
          </Button>
        </div>
      );
    }

    return (
      <div>
        {redirect}
        <InsideUserMenu>{event}</InsideUserMenu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  token: state.auth.token !== null,
  loading: state.singleEvent.loading,
  userId: state.auth.userId,
  foodIngredients: state.singleEvent.foodIngredients,
  drinkIngredients: state.singleEvent.drinkIngredients,
  editMode: state.singleEvent.editMode
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onUpdateUserChoiceInit: (type, choice, event) =>
      dispatch(actions.updateUserChoiceInit(type, choice, event)),
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName, props.location.state.type)),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName, props.location.state.type)),
    onUpdateUserChoice: (updatedChoices, type, choiceLocationId, eventId) =>
      dispatch(
        actions.updateUserChoice(
          updatedChoices,
          type,
          choiceLocationId,
          eventId
        )
      ),
    onUpdateChoiceReset: () => dispatch(actions.updateChoiceReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserChoice);
