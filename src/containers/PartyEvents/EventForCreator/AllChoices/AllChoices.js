import React, { Component } from "react";
import classes from "./AllChoices.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import InsideCreatorMenu from "../../../../hoc/InsideCreatorMenu/InsideCreatorMenu";
import EveryUserChoiceCards
    from '../../../../components/EventSwitcher/EveryUserChoiceCards/EveryUserChoiceCards';

class AllChoices extends Component {
  componentDidMount() {
    if (!this.props.event && localStorage.getItem("eventId")) {
      this.props.onFetchSingleUserEvent(localStorage.getItem("eventId"));
    }
    if (!localStorage.getItem("eventId")) {
      this.props.history.push({
        pathname: "/events"
      });
    }
  }


  render() {
    let allUserChocies = null;
    if (this.props.event) {
      allUserChocies = this.props.event.users.map((user, index) => (
        <EveryUserChoiceCards
        key={index}
        user={user}
      />
      ))
    }

    return (
      <InsideCreatorMenu>
        <div className={classes.UserCardsWrapper}>
          {this.props.loading ? <Spinner /> : allUserChocies}
        </div>
      </InsideCreatorMenu>
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
)(AllChoices);
