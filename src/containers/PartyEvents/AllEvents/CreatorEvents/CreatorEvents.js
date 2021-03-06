import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import CreatorEventPage from '../../../../components/EventSwitcher/CreatorEventPage/CreatorEventPage';

class CreatorEvents extends Component {
  componentDidMount() {
    this.props.onSingleEventReset();
    this.props.onCreateEventReset();
    if (localStorage.getItem('token')) {
      this.props.onFetchCreatedEvents();
    } else {
      this.props.history.push({
        pathname: '/login'
      });
    }
  }

  eventSelectedHandler = id => {
    return this.props.history.push({
      pathname: '/events/eventForCreator',
      state: { eventId: id }
    });
  };

  render() {

    let createdEvents = <Spinner />;

    if (this.props.createdEvents) {
      createdEvents = this.props.createdEvents.map(event => (
        <CreatorEventPage
          key={event._id}
          eventInfo={event}
          clicked={() => this.eventSelectedHandler(event._id)}
        />
      ));
    }

    return <div>{createdEvents}</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.party.loading,
  createdEvents: state.party.createdEvents,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchCreatedEvents: () => dispatch(actions.fetchCreatedEvents()),
    onFetchUserEvents: () => dispatch(actions.fetchUserEvents()),
    onSingleEventReset: () => dispatch(actions.singleEventReset()),
    onCreateEventReset: () => dispatch(actions.createEventReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorEvents);
