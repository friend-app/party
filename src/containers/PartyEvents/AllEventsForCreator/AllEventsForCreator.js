import React, { Component } from "react";
import { connect } from "react-redux";
import AllEventsPage from "../../components/EventSwitcher/AllEventsPage/AllEventsPage";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class AllEventsForCreator extends Component {
  componentDidMount() {
    this.props.onSingleEventReset();
    if (localStorage.getItem("token")) {
      this.props.onFetchCreatedEvents();
      this.props.onFetchUserEvents();
    }
  }

  eventSelectedHandler = (id, eventType) => {
    this.props.history.push({
      pathname: "/events/eventForCreator",
      state: { eventId: id, eventType: eventType }
    });
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    let createdEvents = <Spinner />;

    if (this.props.createdEvents) {
      createdEvents = this.props.createdEvents.map(event => (
        <AllEventsPage
          key={event._id}
          eventInfo={event}
          clicked={() => this.eventSelectedHandler(event._id, "creator")}
        />
      ));
    }

    return (
      <div>
        <h3>Created Events</h3>
        {createdEvents}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.party.loading,
  createdEvents: state.party.createdEvents,
  userEvents: state.party.userEvents,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchCreatedEvents: () => dispatch(actions.fetchCreatedEvents()),
    onSingleEventReset: () => dispatch(actions.singleEventReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsForCreator);
