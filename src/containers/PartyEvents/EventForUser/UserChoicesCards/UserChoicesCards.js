import React, { Component } from "react";
import classes from "./UserChoicesCards.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import UserChoiceCards from "../../../../components/EventSwitcher/userChoiceCards/userChoiceCards";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Aux from "../../../../hoc/Auxillary/Auxillary";

class UserChoicesCards extends Component {
  componentDidMount() {
    if (!this.props.event) {
      this.props.onFetchSingleUserEvent(this.props.location.state.eventId);
    }
  }

  onDelete = (locationId, choiceId, type) => {
    const choicesById = this.props.event.users.find(
      user => user._id === locationId
    );
    choicesById[type].map((choice, index) => {
      if (choice._id === choiceId) {
        choicesById[type].splice(index, 1);
      }
    });
    const updatedChoices = choicesById[type];
    this.props.onUpdateUserChoice(
      updatedChoices,
      type,
      locationId,
      this.props.event._id
    );
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
          choiceType="foodChoices"
          onDelete={this.onDelete}
        />
      );
      drinksCards = (
        <UserChoiceCards
          user={user}
          choiceType="drinksChoices"
          onDelete={this.onDelete}
        />
      );
    }

    const allCards = (
      <Aux>
        <h2>Food cards</h2> {foodCards} <h2>Drinks Cards</h2> {drinksCards}
      </Aux>
    );

    return (
      <div className={classes.UserCardsWrapper}>
        {this.props.loading ? <Spinner /> : allCards}
      </div>
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