import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllEventsPage from '../../components/EventSwitcher/AllEventsPage/AllEventsPage';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class PartyEvents extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.onFetchCreatedEvents();
      this.props.onFetchUserEvents();
    }
  }

  eventSelectedHandler = (id, creatorId) => {
    this.props.history.push({
      pathname: '/events/singleEvent',
      state: { eventId: id, creatorId: creatorId }
    });
  };

  render() {
    console.log(this.props.userEvents);
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    let createdEvents = <Spinner />;

    if (this.props.createdEvents) {
      createdEvents = this.props.createdEvents.map(event => (
        <AllEventsPage
          key={event._id}
          eventInfo={event}
          clicked={() => this.eventSelectedHandler(event._id, event.creatorId)}
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
  token: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchCreatedEvents: () => dispatch(actions.fetchCreatedEvents()),
    onFetchUserEvents: () => dispatch(actions.fetchUserEvents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyEvents);
