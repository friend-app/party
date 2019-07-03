import React, { Component } from 'react';
import classes from './UserChoicesCards.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import UserChoiceCards from '../../../../components/EventSwitcher/userChoiceCards/userChoiceCards';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import InsideUserMenu from '../../../../hoc/InsideUserMenu/InsideUserMenu';

class UserChoicesCards extends Component {
  componentDidMount() {
    if(!this.props.event && localStorage.getItem('eventId')){
      this.props.onFetchSingleUserEvent(localStorage.getItem('eventId'));
    } if ( !localStorage.getItem('eventId') ) {
      this.props.history.push({
        pathname: "/events"
      });
    }
  }

  onUpdate = (userChoice, choiceLocationId, type) => {
    let convertedType = null;
    switch (type) {
      case 'foodChoices':
        convertedType = 'foodIngredients';
        break;
      case 'drinksChoices':
        convertedType = 'drinkIngredients';
        break;
      default:
        return null;
    }
    return this.props.history.push({
      pathname: '/events/eventForUser/updateUserChoice',
      state: {
        choiceType: type,
        type: convertedType,
        userChoice: userChoice,
        choiceLocationId: choiceLocationId,
        eventId: this.props.event._id
      }
    });
    // console.log(userChoice, choiceLocationId, convertedType);
  };

  onDelete = (locationId, choiceId, type) => {
    const choicesById = this.props.event.users.find(
      user => user._id === locationId
    );
    choicesById[type].map((choice, index) => {
      if (choice._id === choiceId) {
        choicesById[type].splice(index, 1);
      }
      return choicesById[type];
    });
    const updatedChoices = choicesById[type];
    this.props.onUpdateUserChoice(
      updatedChoices,
      type,
      locationId,
      this.props.event._id
    );
  };

  onRedirect = () => {
    if (
      !localStorage.getItem('token') || !localStorage.getItem('eventId')
    ) {
      console.log('huy');
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }
    return null;
  };

  render() {
    let foodCards = null;
    let drinksCards = null;
    if (this.props.event) {
      const user = this.props.event.users.find(
        user => user.user._id === this.props.userId
      );

      foodCards = (
        <UserChoiceCards
          user={user}
          choiceType='foodChoices'
          onDelete={this.onDelete}
          clicked={this.onUpdate}
        />
      );
      drinksCards = (
        <UserChoiceCards
          user={user}
          choiceType='drinksChoices'
          onDelete={this.onDelete}
          clicked={this.onUpdate}
        />
      );
    }

    const allCards = (
      <Aux>
        <h2>Food cards</h2> {foodCards} <h2>Drinks Cards</h2> {drinksCards}
      </Aux>
    );

    return (
      <InsideUserMenu>
        <div className={classes.UserCardsWrapper}>
          {this.onRedirect()}
          {this.props.loading ? <Spinner /> : allCards}
        </div>
      </InsideUserMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  userId: state.auth.userId,
  loading: state.singleEvent.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onUpdateUserChoice: (updatedChoices, type, choiceLocationId, eventId) =>
      dispatch(
        actions.updateUserChoice(
          updatedChoices,
          type,
          choiceLocationId,
          eventId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChoicesCards);
