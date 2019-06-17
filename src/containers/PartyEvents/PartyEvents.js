import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllEventsPage from '../../components/EventSwitcher/AllEventsPage/AllEventsPage';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class PartyEvents extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.onFetchCreatedEvents();
      this.props.onFetchUserEvents();
    }
  }

  eventSelectedHandler = (id, eventType) => {
    switch (eventType) {
      case 'creator': 
      return this.props.history.push({
        pathname: '/events/eventForCreator',
        state: { eventId: id, eventType: eventType }
      });
      case 'user': 
      return this.props.history.push({
        pathname: '/events/eventForUser',
        state: { eventId: id, eventType: eventType }
      });
      default: return alert('Refresh the page please');
    }
    
  };

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/login' />;
    }
    let createdEvents = <Spinner />;
    let userEvents = <Spinner />;

    if (this.props.createdEvents) {
      createdEvents = this.props.createdEvents.map(event => (
        <AllEventsPage
          key={event._id}
          eventInfo={event}
          clicked={() => this.eventSelectedHandler(event._id, 'creator')}
        />
      ));
    }

    if (this.props.userEvents) {
      userEvents = this.props.userEvents.map(event => (
        <AllEventsPage
          key={event._id}
          eventInfo={event}
          clicked={() => this.eventSelectedHandler(event._id, 'user')}
        />
      ));
    }

    return (
      <div>
        <h3>Created Events</h3>
        {createdEvents}
        <h3>user Events</h3>
        {userEvents}
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
    onFetchUserEvents: () => dispatch(actions.fetchUserEvents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyEvents);
